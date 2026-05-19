package com.example.edutrack.repository;

import com.example.edutrack.entity.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import java.util.UUID;

public interface SchoolClassRepository extends JpaRepository<SchoolClass, UUID> {
    
    @Query(value = "SELECT * FROM classes WHERE class_teacher_id = :teacherId AND is_deleted = 0 LIMIT 1", nativeQuery = true)
    Optional<SchoolClass> findByClassTeacherIdNative(@Param("teacherId") UUID teacherId);
    
    Optional<SchoolClass> findByClassTeacherIdAndIsDeleted(UUID teacherId, boolean isDeleted);
}
