package com.example.edutrack.repository;

import com.example.edutrack.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, UUID> {

    @Query(value = """
            SELECT DISTINCT a.type 
            FROM assessments a
            JOIN students s ON s.id = a.student_id
            JOIN departments d ON d.id = s.department_id
            WHERE a.institution_id = :instId
              AND a.is_deleted = false
              AND (:year IS NULL OR d.batch_year = :year)
              AND (:section IS NULL OR d.section = :section)
            """, nativeQuery = true)
    List<String> findDistinctTypesFiltered(@Param("instId") UUID instId, 
                                            @Param("year") Integer year, 
                                            @Param("section") String section);

    @Query(value = """
            SELECT 
                marks_obtained / max_score * 100 as percentage
            FROM assessments a
            JOIN students s ON s.id = a.student_id
            JOIN departments d ON d.id = s.department_id
            WHERE a.institution_id = :instId
              AND a.is_deleted = false
              AND a.type = :type
              AND (:year IS NULL OR d.batch_year = :year)
              AND (:section IS NULL OR d.section = :section)
            """, nativeQuery = true)
    List<Double> findMarksPercentagesFiltered(@Param("instId") UUID instId,
                                               @Param("type") String type,
                                               @Param("year") Integer year,
                                               @Param("section") String section);
}
