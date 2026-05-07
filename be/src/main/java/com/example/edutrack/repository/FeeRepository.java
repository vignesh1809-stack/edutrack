package com.example.edutrack.repository;

import com.example.edutrack.entity.Fee;
import com.example.edutrack.entity.enums.FeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FeeRepository extends JpaRepository<Fee, UUID> {
    
    @Query("SELECT f FROM Fee f WHERE f.student.id = :studentId AND f.student.institution.id = :institutionId")
    List<Fee> findByStudentId(@Param("studentId") UUID studentId, @Param("institutionId") UUID institutionId);

    @Query("SELECT f FROM Fee f WHERE f.student.id = :studentId AND f.status != :status")
    List<Fee> findByStudentIdAndStatusNot(@Param("studentId") UUID studentId, @Param("status") FeeStatus status);
}
