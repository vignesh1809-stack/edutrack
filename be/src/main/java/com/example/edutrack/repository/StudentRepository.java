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
                            YEAR(s.batch_year) as batchYear,
                            s.section as section,
                            s.current_semester as currentSemester,
                            s.cgpa as cgpa
                        FROM students s
                        JOIN departments d ON s.department_id = d.id
                        WHERE s.institution_id = :institutionId
                          AND s.is_deleted = 0
                          AND (:search IS NULL OR LOWER(s.first_name) LIKE :search OR LOWER(s.last_name) LIKE :search OR LOWER(s.student_id) LIKE :search)
                          AND (:status IS NULL OR s.status = :status)
                          AND (:courseLike IS NULL OR LOWER(d.code) LIKE :courseLike)
                          AND (:batchYear IS NULL OR YEAR(s.batch_year) = :batchYear)
                          AND (:section IS NULL OR s.section = :section)
                        """, countQuery = """
                        SELECT COUNT(*)
                        FROM students s
                        JOIN departments d ON s.department_id = d.id
                        WHERE s.institution_id = :institutionId
                          AND s.is_deleted = 0
                          AND (:search IS NULL OR LOWER(s.first_name) LIKE :search OR LOWER(s.last_name) LIKE :search OR LOWER(s.student_id) LIKE :search)
                          AND (:status IS NULL OR s.status = :status)
                          AND (:courseLike IS NULL OR LOWER(d.code) LIKE :courseLike)
                          AND (:batchYear IS NULL OR YEAR(s.batch_year) = :batchYear)
                          AND (:section IS NULL OR s.section = :section)
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

        @Query(value = """
            SELECT 
                BIN_TO_UUID(s.id) as id,
                s.student_id as studentId,
                s.first_name as firstName,
                s.last_name as lastName,
                s.status as status,
                s.gender as gender,
                d.name as departmentName,
                s.section as section,
                s.current_semester as currentSemester,
                s.phone as phone,
                s.email as email,
                s.address as address
            FROM students s
            LEFT JOIN departments d ON s.department_id = d.id
            WHERE s.id = UUID_TO_BIN(:id) 
              AND s.institution_id = UUID_TO_BIN(:instId) 
              AND s.is_deleted = 0
            """, nativeQuery = true)
        Optional<StudentProfileProjection> findProfileProjection(@Param("id") String id, @Param("instId") String instId);

        // Lookup by institution + phone (used in auth).
        Optional<Student> findByInstitutionIdAndPhone(UUID institutionId, String phone);

        @Query(value = "SELECT DISTINCT YEAR(batch_year) FROM students WHERE institution_id = UNHEX(REPLACE(:institutionId, '-', '')) AND is_deleted = 0 AND batch_year IS NOT NULL ORDER BY YEAR(batch_year) DESC", nativeQuery = true)
        List<Integer> findDistinctAdmissionYears(@Param("institutionId") String institutionId);

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
                        WHERE s.institution_id = :instId
                          AND s.is_deleted = false
                          AND (:batchYear IS NULL OR YEAR(s.batch_year) = :batchYear)
                          AND (:section IS NULL OR s.section = :section)
                        """, nativeQuery = true)
        long countActiveStudentsFiltered(@Param("instId") UUID instId,
                        @Param("batchYear") Integer batchYear,
                        @Param("section") String section);

        @Query(value = """
                        SELECT
                            d.code as departmentCode,
                            AVG(s.cgpa) as averageCgpa
                        FROM students s
                        JOIN departments d ON d.id = s.department_id
                        WHERE s.institution_id = :instId
                          AND s.is_deleted = false
                          AND (:batchYear IS NULL OR YEAR(s.batch_year) = :batchYear)
                          AND (:section IS NULL OR s.section = :section)
                          AND s.cgpa IS NOT NULL
                        GROUP BY d.code
                        """, nativeQuery = true)
        List<DepartmentAverageProjection> findDepartmentAveragesFiltered(
                        @Param("instId") UUID instId,
                        @Param("batchYear") Integer batchYear,
                        @Param("section") String section);

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
                              AND s.department_id = (
                                  SELECT s2.department_id FROM students s2
                                  WHERE s2.id = :studentId AND s2.institution_id = :instId LIMIT 1
                              )
                              AND s.section = (
                                  SELECT s2.section FROM students s2
                                  WHERE s2.id = :studentId AND s2.institution_id = :instId LIMIT 1
                              )
                              AND YEAR(s.batch_year) = (
                                  SELECT YEAR(s2.batch_year) FROM students s2
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
                                          AND a.is_deleted = false
                                    ), 0) DESC
                                ) AS rank_position,
                                COUNT(*) OVER () AS cohort_size
                            FROM students s
                            WHERE s.institution_id = :instId
                              AND s.is_deleted = false
                              AND s.department_id = (
                                  SELECT s2.department_id FROM students s2
                                  WHERE s2.id = :studentId AND s2.institution_id = :instId LIMIT 1
                              )
                              AND s.section = (
                                  SELECT s2.section FROM students s2
                                  WHERE s2.id = :studentId AND s2.institution_id = :instId LIMIT 1
                              )
                              AND YEAR(s.batch_year) = (
                                  SELECT YEAR(s2.batch_year) FROM students s2
                                  WHERE s2.id = :studentId AND s2.institution_id = :instId LIMIT 1
                              )
                        ) ranked
                        WHERE ranked.id = :studentId
                        """, nativeQuery = true)
        StudentDashboardRankProjection findAttendanceRankForStudentDashboard(
                        @Param("instId") UUID instId,
                        @Param("studentId") UUID studentId);
}
