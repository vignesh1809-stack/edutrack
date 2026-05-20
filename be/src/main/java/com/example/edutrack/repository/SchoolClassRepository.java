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

    @Query(value = """
            SELECT c.* FROM classes c
            LEFT JOIN departments d ON c.department_id = d.id
            WHERE c.institution_id = :institutionId
              AND (:year IS NULL OR c.batch_year = :year)
              AND (:section IS NULL OR c.section = :section OR c.section LIKE CONCAT(:section, '%'))
              AND (:branch IS NULL OR d.name = :branch OR d.name LIKE CONCAT('%', :branch, '%'))
              AND c.is_deleted = 0
            LIMIT 1
            """, nativeQuery = true)
    Optional<SchoolClass> findByLookupParamsNative(
            @Param("institutionId") UUID institutionId,
            @Param("year") Integer year,
            @Param("section") String section,
            @Param("branch") String branch);
}
