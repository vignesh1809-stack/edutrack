package com.example.edutrack.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.edutrack.entity.Student;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    // All active (non-deleted) students for the current tenant — routed to replica via AOP.
    @Query("SELECT s FROM Student s WHERE s.isDeleted = false")
    Page<Student> findAllActive(Pageable pageable);

    // Single student by id, excluding soft-deleted rows.
    @Query("SELECT s FROM Student s WHERE s.id = :id AND s.isDeleted = false")
    Optional<Student> findActiveById(@Param("id") UUID id);

    // Lookup by institution + phone (used in auth).
    Optional<Student> findByInstitutionIdAndPhone(UUID institutionId, String phone);

    @Query(value = "SELECT * FROM students WHERE institution_id = :instId AND phone = :phone", nativeQuery = true)
    Optional<Student> findByPhoneNative(@Param("instId") UUID instId, @Param("phone") String phone);

    // Soft delete instead of hard delete — preserves audit trail.
    @Modifying
    @Query("UPDATE Student s SET s.isDeleted = true WHERE s.id = :id")
    void softDelete(@Param("id") UUID id);

    // Total active students in an institution (used by dashboard).
    @Query(value = "SELECT COUNT(*) FROM students WHERE institution_id = :instId AND is_deleted = false",
           nativeQuery = true)
    long countActiveStudents(@Param("instId") UUID instId);
}
