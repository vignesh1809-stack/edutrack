package com.example.edutrack.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.edutrack.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, UUID> {
    
    @Query(value = "SELECT DISTINCT batch_year FROM students WHERE institution_id = UNHEX(REPLACE(:institutionId, '-', '')) AND is_deleted = 0 AND batch_year IS NOT NULL ORDER BY batch_year DESC", nativeQuery = true)
    List<Object> findDistinctBatchYears(@Param("institutionId") String institutionId);

    @Query(value = "SELECT DISTINCT section FROM students WHERE institution_id = UNHEX(REPLACE(:institutionId, '-', '')) AND batch_year = :batchYear AND is_deleted = 0 AND section IS NOT NULL ORDER BY section ASC", nativeQuery = true)
    List<String> findDistinctSectionsByBatchYear(@Param("institutionId") String institutionId, @Param("batchYear") int batchYear);

    @Query(value = "SELECT DISTINCT section FROM students WHERE institution_id = UNHEX(REPLACE(:institutionId, '-', '')) AND is_deleted = 0 AND section IS NOT NULL ORDER BY section ASC", nativeQuery = true)
    List<String> findAllDistinctSections(@Param("institutionId") String institutionId);

    @Query(value = "SELECT DISTINCT code FROM departments WHERE institution_id = UNHEX(REPLACE(:institutionId, '-', '')) AND is_deleted = 0", nativeQuery = true)
    List<String> findDistinctCodes(@Param("institutionId") String institutionId);
}
