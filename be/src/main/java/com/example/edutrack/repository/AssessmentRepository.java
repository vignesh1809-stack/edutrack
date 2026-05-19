package com.example.edutrack.repository;

import com.example.edutrack.entity.Assessment;
import com.example.edutrack.dto.StaffPerformanceProjection;
import com.example.edutrack.dto.StudentDashboardAcademicProjection;
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
            JOIN classes c ON s.class_id = c.id
            JOIN departments d ON d.id = c.department_id
            WHERE a.institution_id = :instId
              AND a.is_deleted = false
              AND (:year IS NULL OR c.batch_year = :year)
              AND (:section IS NULL OR c.section = :section)
            """, nativeQuery = true)
    List<String> findDistinctTypesFiltered(@Param("instId") UUID instId, 
                                            @Param("year") Integer year, 
                                            @Param("section") String section);

    @Query(value = """
            SELECT 
                marks_obtained / max_score * 100 as percentage
            FROM assessments a
            JOIN students s ON s.id = a.student_id
            JOIN classes c ON s.class_id = c.id
            JOIN departments d ON d.id = c.department_id
            WHERE a.institution_id = :instId
              AND a.is_deleted = false
              AND a.type = :type
              AND (:year IS NULL OR c.batch_year = :year)
              AND (:section IS NULL OR c.section = :section)
            """, nativeQuery = true)
    List<Double> findMarksPercentagesFiltered(@Param("instId") UUID instId,
                                               @Param("type") String type,
                                               @Param("year") Integer year,
                                               @Param("section") String section);
    @Query(value = """
            SELECT 
                c.semester as semester,
                AVG(a.marks_obtained / a.max_score * 100) as averageScore
            FROM assessments a
            JOIN courses c ON c.id = a.course_id
            WHERE a.student_id = :studentId
              AND a.is_deleted = false
            GROUP BY c.semester
            ORDER BY c.semester ASC
            """, nativeQuery = true)
    List<com.example.edutrack.dto.StudentPerformanceProjection> findSemesterPerformanceByStudentId(@Param("studentId") UUID studentId);

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
            JOIN classes cl ON stu.class_id = cl.id
            WHERE s.institution_id = :instId
              AND s.is_deleted = false
              AND c.is_deleted = false
              AND a.is_deleted = false
              AND (:year IS NULL OR cl.batch_year = :year)
              AND (:section IS NULL OR cl.section = :section)
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

    @Query(value = """
            SELECT
                c.course_name AS courseName,
                ROUND(AVG((a.marks_obtained / NULLIF(a.max_score, 0)) * 100), 2) AS scorePercent
            FROM assessments a
            JOIN courses c ON c.id = a.course_id
            WHERE a.institution_id = :instId
              AND a.student_id = :studentId
              AND a.is_deleted = false
              AND (:semester IS NULL OR c.semester = :semester)
            GROUP BY c.id, c.course_name
            ORDER BY scorePercent DESC
            """, nativeQuery = true)
    List<StudentDashboardAcademicProjection> findTopSubjectsForStudentDashboard(
            @Param("instId") UUID instId,
            @Param("studentId") UUID studentId,
            @Param("semester") Integer semester);

    @Query(value = "SELECT COALESCE(AVG(a.marks_obtained / a.max_score * 100.0), 0.0) FROM assessments a JOIN courses c ON a.course_id = c.id WHERE c.staff_id = :staffId AND a.is_deleted = 0 AND c.is_deleted = 0", nativeQuery = true)
    double getAvgMarksByStaffIdNative(@Param("staffId") UUID staffId);
}
