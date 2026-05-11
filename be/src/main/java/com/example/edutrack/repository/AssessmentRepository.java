package com.example.edutrack.repository;

import com.example.edutrack.entity.Assessment;
import com.example.edutrack.dto.StaffPerformanceProjection;
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
              AND (:year IS NULL OR YEAR(s.batch_year) = :year)
              AND (:section IS NULL OR s.section = :section)
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
              AND (:year IS NULL OR YEAR(s.batch_year) = :year)
              AND (:section IS NULL OR s.section = :section)
            """, nativeQuery = true)
    List<Double> findMarksPercentagesFiltered(@Param("instId") UUID instId,
                                               @Param("type") String type,
                                               @Param("year") Integer year,
                                               @Param("section") String section);
    @Query("SELECT a FROM Assessment a WHERE a.student.id = :studentId")
    List<Assessment> findByStudentId(@Param("studentId") UUID studentId);

    @Query(value = """
            SELECT 
                CAST(s.id AS CHAR) as staffId,
                CONCAT(s.first_name, ' ', s.last_name) as staffName,
                c.course_name as subject,
                d.name as department,
                AVG(a.marks_obtained / a.max_score * 100) as performanceScore,
                s.role as role
            FROM staffs s
            JOIN courses c ON c.staff_id = s.id
            JOIN departments d ON d.id = s.department_id
            JOIN assessments a ON a.course_id = c.id
            JOIN students stu ON stu.id = a.student_id
            WHERE s.institution_id = :instId
              AND s.is_deleted = false
              AND c.is_deleted = false
              AND a.is_deleted = false
              AND (:year IS NULL OR YEAR(stu.batch_year) = :year)
              AND (:section IS NULL OR stu.section = :section)
              AND (:branch IS NULL OR d.name = :branch)
            GROUP BY s.id, c.id, d.name
            ORDER BY performanceScore ASC
            LIMIT 3
            """, nativeQuery = true)
    List<StaffPerformanceProjection> findLeastPerformedStaff(
            @Param("instId") UUID instId,
            @Param("year") Integer year,
            @Param("section") String section,
            @Param("branch") String branch);
}
