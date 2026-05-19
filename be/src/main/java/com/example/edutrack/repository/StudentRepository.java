package com.example.edutrack.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.edutrack.entity.enums.StudentStatus;
import com.example.edutrack.dto.StudentListProjection;
import com.example.edutrack.dto.StudentProfileProjection;
import com.example.edutrack.dto.DepartmentAverageProjection;
import com.example.edutrack.dto.StudentDashboardRankProjection;

import com.example.edutrack.entity.Student;

public interface StudentRepository extends JpaRepository<Student, UUID> {

        // All active (non-deleted) students for the current tenant — routed to replica
        // via AOP.
        @Query("SELECT s FROM Student s WHERE s.institutionId = :institutionId AND s.isDeleted = false")
        Page<Student> findAllActive(@Param("institutionId") UUID institutionId, Pageable pageable);

        List<Student> findByInstitutionIdAndIsDeletedFalse(UUID institutionId);

        // Principal paginated student list using native SQL and interface projection
        @Query(value = """
                        SELECT
                            BIN_TO_UUID(s.id) as id,
                            s.student_id as studentId,
                            s.first_name as firstName,
                            s.last_name as lastName,
                            s.gender as gender,
                            s.status as status,
                            d.name as departmentName,
                            CAST(c.batch_year AS SIGNED) as batchYear,
                            c.section as section,
                            s.current_semester as currentSemester,
                            s.cgpa as cgpa
                        FROM students s
                        JOIN classes c ON s.class_id = c.id
                        JOIN departments d ON c.department_id = d.id
                        WHERE s.institution_id = :institutionId
                          AND s.is_deleted = 0
                          AND (:search IS NULL OR LOWER(s.first_name) LIKE :search OR LOWER(s.last_name) LIKE :search OR LOWER(s.student_id) LIKE :search)
                          AND (:status IS NULL OR s.status = :status)
                          AND (:courseLike IS NULL OR LOWER(d.code) LIKE :courseLike)
                          AND (:batchYear IS NULL OR c.batch_year = :batchYear)
                          AND (:section IS NULL OR c.section = :section)
                        """, countQuery = """
                        SELECT COUNT(*)
                        FROM students s
                        JOIN classes c ON s.class_id = c.id
                        JOIN departments d ON c.department_id = d.id
                        WHERE s.institution_id = :institutionId
                          AND s.is_deleted = 0
                          AND (:search IS NULL OR LOWER(s.first_name) LIKE :search OR LOWER(s.last_name) LIKE :search OR LOWER(s.student_id) LIKE :search)
                          AND (:status IS NULL OR s.status = :status)
                          AND (:courseLike IS NULL OR LOWER(d.code) LIKE :courseLike)
                          AND (:batchYear IS NULL OR c.batch_year = :batchYear)
                          AND (:section IS NULL OR c.section = :section)
                        """, nativeQuery = true)
        Page<StudentListProjection> findPrincipalStudentList(
                        @Param("institutionId") UUID institutionId,
                        @Param("search") String search,
                        @Param("status") String status,
                        @Param("courseLike") String courseLike,
                        @Param("batchYear") Integer batchYear,
                        @Param("section") String section,
                        Pageable pageable);

        // Single student by id, excluding soft-deleted rows.
        @Query(value = "SELECT * FROM students WHERE id = UUID_TO_BIN(:id) AND institution_id = UUID_TO_BIN(:instId) AND is_deleted = 0", nativeQuery = true)
        Optional<Student> findActiveById(@Param("id") String id, @Param("instId") String instId);

        // Single student by id with eager relationships
        @Query("SELECT s FROM Student s LEFT JOIN FETCH s.schoolClass sc LEFT JOIN FETCH sc.department LEFT JOIN FETCH s.guardians WHERE s.id = :id AND s.institutionId = :institutionId AND s.isDeleted = false")
        Optional<Student> findFullStudentProfile(@Param("id") UUID id, @Param("institutionId") UUID institutionId);

        @Query(value = """
            SELECT 
                BIN_TO_UUID(s.id) as id,
                s.student_id as studentId,
                s.first_name as firstName,
                s.last_name as lastName,
                s.status as status,
                s.gender as gender,
                d.name as departmentName,
                c.section as section,
                s.current_semester as currentSemester,
                s.phone as phone,
                s.email as email,
                s.address as address,
                s.date_of_birth as dateOfBirth,
                s.blood_group as bloodGroup,
                CAST(c.batch_year AS SIGNED) as batchYear,
                s.cgpa as cgpa,
                s.avatar_url as avatarUrl
            FROM students s
            JOIN classes c ON s.class_id = c.id
            LEFT JOIN departments d ON c.department_id = d.id
            WHERE s.id = UUID_TO_BIN(:id) 
              AND s.institution_id = UUID_TO_BIN(:instId) 
              AND s.is_deleted = 0
            """, nativeQuery = true)
        Optional<StudentProfileProjection> findProfileProjection(@Param("id") String id, @Param("instId") String instId);

        // Lookup by institution + phone (used in auth).
        Optional<Student> findByInstitutionIdAndPhone(UUID institutionId, String phone);

        @Query(value = "SELECT DISTINCT batch_year FROM classes WHERE institution_id = UNHEX(REPLACE(:institutionId, '-', '')) AND is_deleted = 0 AND batch_year IS NOT NULL ORDER BY batch_year DESC", nativeQuery = true)
        List<Object> findDistinctAdmissionYears(@Param("institutionId") String institutionId);

        @Query(value = "SELECT * FROM students WHERE institution_id = :instId AND phone = :phone", nativeQuery = true)
        Optional<Student> findByPhoneNative(@Param("instId") UUID instId, @Param("phone") String phone);

        // Soft delete instead of hard delete — preserves audit trail.
        @Modifying
        @Query("UPDATE Student s SET s.isDeleted = true WHERE s.id = :id")
        void softDelete(@Param("id") UUID id);

        // Total active students in an institution (used by dashboard).
        @Query(value = "SELECT COUNT(*) FROM students WHERE institution_id = :instId AND is_deleted = false", nativeQuery = true)
        long countActiveStudents(@Param("instId") UUID instId);

        @Query(value = """
                        SELECT COUNT(s.id)
                        FROM students s
                        JOIN classes c ON s.class_id = c.id
                        LEFT JOIN departments d ON d.id = c.department_id
                        WHERE s.institution_id = :instId
                          AND s.is_deleted = false
                          AND (:batchYear IS NULL OR c.batch_year = :batchYear)
                          AND (:section IS NULL OR c.section = :section)
                          AND (:branch IS NULL OR d.code = :branch)
                        """, nativeQuery = true)
        long countActiveStudentsFiltered(@Param("instId") UUID instId,
                        @Param("batchYear") Integer batchYear,
                        @Param("section") String section,
                        @Param("branch") String branch);

        @Query(value = """
                        SELECT
                            d.code as departmentCode,
                            AVG(s.cgpa) as averageCgpa
                        FROM students s
                        JOIN classes c ON s.class_id = c.id
                        JOIN departments d ON d.id = c.department_id
                        WHERE s.institution_id = :instId
                          AND s.is_deleted = false
                          AND (:batchYear IS NULL OR c.batch_year = :batchYear)
                          AND (:section IS NULL OR c.section = :section)
                          AND (:branch IS NULL OR d.code = :branch)
                          AND s.cgpa IS NOT NULL
                        GROUP BY d.code
                        """, nativeQuery = true)
        List<DepartmentAverageProjection> findDepartmentAveragesFiltered(
                        @Param("instId") UUID instId,
                        @Param("batchYear") Integer batchYear,
                        @Param("section") String section,
                        @Param("branch") String branch);

        @Query(value = """
                        SELECT ranked.rank_position AS rankPosition, ranked.cohort_size AS cohortSize
                        FROM (
                            SELECT
                                s.id,
                                DENSE_RANK() OVER (ORDER BY COALESCE(s.cgpa, 0) DESC) AS rank_position,
                                COUNT(*) OVER () AS cohort_size
                            FROM students s
                            WHERE s.institution_id = :instId
                              AND s.is_deleted = false
                              AND s.class_id = (
                                  SELECT s2.class_id FROM students s2
                                  WHERE s2.id = :studentId AND s2.institution_id = :instId LIMIT 1
                              )
                              AND s.current_semester = (
                                  SELECT s2.current_semester FROM students s2
                                  WHERE s2.id = :studentId AND s2.institution_id = :instId LIMIT 1
                              )
                        ) ranked
                        WHERE ranked.id = :studentId
                        """, nativeQuery = true)
        StudentDashboardRankProjection findMarksRankForStudentDashboard(
                        @Param("instId") UUID instId,
                        @Param("studentId") UUID studentId);

        @Query(value = """
                        SELECT ranked.rank_position AS rankPosition, ranked.cohort_size AS cohortSize
                        FROM (
                            SELECT
                                s.id,
                                DENSE_RANK() OVER (
                                    ORDER BY COALESCE((
                                        SELECT (SUM(CASE WHEN a.attendance_status = 'PRESENT' THEN 1 ELSE 0 END) * 100.0) / NULLIF(COUNT(a.id), 0)
                                        FROM attendances a
                                        WHERE a.institution_id = s.institution_id
                                          AND a.student_id = s.id
                                          AND a.semester = s.current_semester
                                          AND a.is_deleted = false
                                      ), 0) DESC
                                ) AS rank_position,
                                COUNT(*) OVER () AS cohort_size
                            FROM students s
                            WHERE s.institution_id = :instId
                              AND s.is_deleted = false
                              AND s.class_id = (
                                  SELECT s2.class_id FROM students s2
                                  WHERE s2.id = :studentId AND s2.institution_id = :instId LIMIT 1
                              )
                              AND s.current_semester = (
                                  SELECT s2.current_semester FROM students s2
                                  WHERE s2.id = :studentId AND s2.institution_id = :instId LIMIT 1
                              )
                        ) ranked
                        WHERE ranked.id = :studentId
                        """, nativeQuery = true)
        StudentDashboardRankProjection findAttendanceRankForStudentDashboard(
                        @Param("instId") UUID instId,
                        @Param("studentId") UUID studentId);

        @Query(value = "SELECT COUNT(*) FROM students WHERE class_id = :classId AND is_deleted = 0", nativeQuery = true)
        long countBySchoolClassIdNative(@Param("classId") UUID classId);

        @Query(value = "SELECT COALESCE(AVG(a.marks_obtained / a.max_score * 100.0), 0.0) FROM assessments a JOIN students s ON a.student_id = s.id WHERE s.class_id = :classId AND a.is_deleted = 0 AND s.is_deleted = 0", nativeQuery = true)
        double getAvgMarksByClassIdNative(@Param("classId") UUID classId);

        @Query(value = "SELECT COALESCE(AVG(CASE WHEN a.attendance_status = 'PRESENT' THEN 100.0 ELSE 0.0 END), 0.0) FROM attendances a JOIN students s ON a.student_id = s.id WHERE s.class_id = :classId AND a.is_deleted = 0 AND s.is_deleted = 0", nativeQuery = true)
        double getAttendanceByClassIdNative(@Param("classId") UUID classId);

        @Query(value = "SELECT COUNT(*) FROM remarks r JOIN students s ON r.target_student_id = s.id WHERE s.class_id = :classId AND r.is_deleted = 0 AND s.is_deleted = 0", nativeQuery = true)
        long countPendingRemarksByClassIdNative(@Param("classId") UUID classId);

        @Query(value = """
            SELECT 
                s.first_name AS firstName,
                s.last_name AS lastName,
                AVG(a.marks_obtained / a.max_score * 100.0) AS averageScore
            FROM students s
            LEFT JOIN assessments a ON s.id = a.student_id AND a.is_deleted = 0
            WHERE s.class_id = :classId AND s.is_deleted = 0
            GROUP BY s.id, s.first_name, s.last_name
            ORDER BY averageScore DESC
            """, nativeQuery = true)
        List<com.example.edutrack.dto.StudentPerformanceReviewProjection> findStudentPerformanceReviewByClassId(@Param("classId") UUID classId);
}
