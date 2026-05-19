package com.example.edutrack.repository;

import com.example.edutrack.entity.Remarks;
import com.example.edutrack.entity.enums.RemarkStatus;
import com.example.edutrack.entity.enums.RemarkTarget;
import com.example.edutrack.dto.StudentDashboardRankProjection;
import com.example.edutrack.repository.projections.PrincipalRemarkFeedProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.UUID;

public interface RemarksRepository extends JpaRepository<Remarks, UUID> {

    /** Count pending campus/staff remarks submitted today for this institution */
    @Query(value = """
            SELECT COUNT(*)
            FROM remarks r
            WHERE r.institution_id = :instId
              AND DATE(r.created_at) = :date
              AND r.is_deleted       = false
              AND r.remark_status    = 'PENDING'
              AND r.remark_target    IN ('CAMPUS', 'STAFF')
            """, nativeQuery = true)
    long countRemarksSubmittedOnDate(@Param("instId") UUID instId, @Param("date") LocalDate date);

    /** Total pending campus/staff remarks for this institution */
    @Query(value = """
            SELECT COUNT(*)
            FROM remarks r
            WHERE r.institution_id = :instId
              AND r.is_deleted      = false
              AND r.remark_status   = 'PENDING'
              AND r.remark_target    IN ('CAMPUS', 'STAFF')
            """, nativeQuery = true)
    long countTotalRemarks(@Param("instId") UUID instId);

    /** Latest N pending campus/staff remarks with author student info for dashboard feed */
    @Query(value = """
            SELECT r.id, r.content, r.created_at,
                   CONCAT(s.first_name, ' ', s.last_name) AS studentName,
                   s.student_id AS studentCode
            FROM remarks r
            JOIN students s ON s.id = r.author_student_id
            WHERE r.institution_id = :instId
              AND r.is_deleted      = false
              AND r.remark_status   = 'PENDING'
              AND r.remark_target    IN ('CAMPUS', 'STAFF')
            ORDER BY r.created_at DESC
            """, nativeQuery = true)
    Page<Object[]> findLatestRemarks(@Param("instId") UUID instId, Pageable pageable);

    @Query(value = """
            SELECT COUNT(r.id)
            FROM remarks r
            JOIN students s ON s.id = r.author_student_id
            JOIN classes c ON s.class_id = c.id
            LEFT JOIN departments d ON d.id = c.department_id
            WHERE r.institution_id = :instId
              AND DATE(r.created_at) = :date
              AND r.is_deleted       = false
              AND r.remark_status    = 'PENDING'
              AND r.remark_target    IN ('CAMPUS', 'STAFF')
              AND (:batchYear IS NULL OR c.batch_year = :batchYear)
              AND (:section IS NULL OR c.section = :section)
              AND (:branch IS NULL OR d.code = :branch)
            """, nativeQuery = true)
    long countRemarksSubmittedOnDateFiltered(@Param("instId") UUID instId, 
                                             @Param("date") LocalDate date,
                                             @Param("batchYear") Integer batchYear,
                                             @Param("section") String section,
                                             @Param("branch") String branch);

    @Query(value = """
            SELECT COUNT(r.id)
            FROM remarks r
            JOIN students s ON s.id = r.author_student_id
            JOIN classes c ON s.class_id = c.id
            LEFT JOIN departments d ON d.id = c.department_id
            WHERE r.institution_id = :instId
              AND r.is_deleted      = false
              AND r.remark_status   = 'PENDING'
              AND r.remark_target    IN ('CAMPUS', 'STAFF')
              AND (:batchYear IS NULL OR c.batch_year = :batchYear)
              AND (:section IS NULL OR c.section = :section)
              AND (:branch IS NULL OR d.code = :branch)
            """, nativeQuery = true)
    long countTotalRemarksFiltered(@Param("instId") UUID instId,
                                   @Param("batchYear") Integer batchYear,
                                   @Param("section") String section,
                                   @Param("branch") String branch);

    @Query(value = """
            SELECT r.id, r.content, r.created_at,
                   CONCAT(s.first_name, ' ', s.last_name) AS studentName,
                   s.student_id AS studentCode
            FROM remarks r
            JOIN students s ON s.id = r.author_student_id
            JOIN classes c ON s.class_id = c.id
            LEFT JOIN departments d ON d.id = c.department_id
            WHERE r.institution_id = :instId
              AND r.is_deleted      = false
              AND r.remark_status   = 'PENDING'
              AND r.remark_target    IN ('CAMPUS', 'STAFF')
              AND (:batchYear IS NULL OR c.batch_year = :batchYear)
              AND (:section IS NULL OR c.section = :section)
              AND (:branch IS NULL OR d.code = :branch)
            ORDER BY r.created_at DESC
            """, nativeQuery = true)
    Page<Object[]> findLatestRemarksFiltered(@Param("instId") UUID instId, 
                                             @Param("batchYear") Integer batchYear,
                                             @Param("section") String section,
                                             @Param("branch") String branch,
                                             Pageable pageable);

    @Query(value = """
            SELECT * FROM remarks 
            WHERE target_student_id = :studentId 
              AND institution_id    = :instId 
              AND is_deleted         = false 
            ORDER BY created_at DESC
            """, nativeQuery = true)
    java.util.List<Remarks> findByTargetStudentId(@Param("studentId") UUID studentId, @Param("instId") UUID instId);
    @Query(value = """
            SELECT COUNT(*) FROM remarks 
            WHERE institution_id = :instId 
                AND remark_status = 'PENDING' 
                AND author_student_id IS NOT NULL 
                AND remark_target = 'CAMPUS' 
                AND is_deleted = false
            """, nativeQuery = true)
    long countPendingCampusRemarksNative(@Param("instId") UUID instId);

    @Query(value = """
            SELECT COUNT(*) FROM remarks r
            JOIN students s ON s.id = r.author_student_id
            JOIN classes c ON s.class_id = c.id
            WHERE r.institution_id = :instId
                AND r.remark_status = 'PENDING'
                AND r.author_student_id IS NOT NULL
                AND r.remark_target = 'CAMPUS'
                AND r.is_deleted = false
                AND (:batchYear IS NULL OR c.batch_year = :batchYear)
                AND (:section IS NULL OR c.section = :section)
            """, nativeQuery = true)
    long countPendingCampusRemarksNativeFiltered(@Param("instId") UUID instId,
                                                 @Param("batchYear") Integer batchYear,
                                                 @Param("section") String section);

    @Query(value = """
            SELECT COUNT(*) FROM remarks 
            WHERE institution_id = :instId 
                AND remark_status = 'PENDING' 
                AND author_student_id IS NOT NULL 
                AND remark_target = 'STAFF' 
                AND target_staff_id IS NOT NULL
                AND is_deleted = false
            """, nativeQuery = true)
    long countPendingStaffRemarksNative(@Param("instId") UUID instId);

    @Query(value = """
            SELECT COUNT(*) FROM remarks r
            JOIN students s ON s.id = r.author_student_id
            JOIN classes c ON s.class_id = c.id
            WHERE r.institution_id = :instId
                AND r.remark_status = 'PENDING'
                AND r.author_student_id IS NOT NULL
                AND r.remark_target = 'STAFF'
                AND r.target_staff_id IS NOT NULL
                AND r.is_deleted = false
                AND (:batchYear IS NULL OR c.batch_year = :batchYear)
                AND (:section IS NULL OR c.section = :section)
            """, nativeQuery = true)
    long countPendingStaffRemarksNativeFiltered(@Param("instId") UUID instId,
                                                @Param("batchYear") Integer batchYear,
                                                @Param("section") String section);

    long countByInstitutionIdAndIsDeletedFalse(UUID instId);

    long countByInstitutionIdAndStatusAndIsDeletedFalse(UUID instId, RemarkStatus status);

    @Query(value = """
            SELECT 
                BIN_TO_UUID(r.id) AS id,
                r.content,
                r.created_at AS createdAt,
                CONCAT(s.first_name, ' ', s.last_name) AS authorName,
                s.student_id AS authorCode,
                CONCAT('Year ', s.current_semester) AS academicInfo,
                r.remark_status AS status,
                r.remark_priority AS priority,
                r.remark_category AS category,
                NULL AS targetStaffName
            FROM remarks r
            JOIN students s ON r.author_student_id = s.id
            WHERE r.institution_id = :instId
                AND r.remark_status = 'PENDING'
                AND r.author_student_id IS NOT NULL
                AND r.remark_target = 'CAMPUS'
                AND r.is_deleted = false
            ORDER BY r.created_at DESC
            """, nativeQuery = true)
    Page<PrincipalRemarkFeedProjection> findCampusRemarksNative(@Param("instId") UUID instId, Pageable pageable);

    @Query(value = """
            SELECT 
                BIN_TO_UUID(r.id) AS id,
                r.content,
                r.created_at AS createdAt,
                CONCAT(s.first_name, ' ', s.last_name) AS authorName,
                s.student_id AS authorCode,
                CONCAT('Year ', s.current_semester) AS academicInfo,
                r.remark_status AS status,
                r.remark_priority AS priority,
                r.remark_category AS category,
                NULL AS targetStaffName
            FROM remarks r
            JOIN students s ON r.author_student_id = s.id
            JOIN classes c ON s.class_id = c.id
            WHERE r.institution_id = :instId
                AND r.remark_status = 'PENDING'
                AND r.author_student_id IS NOT NULL
                AND r.remark_target = 'CAMPUS'
                AND r.is_deleted = false
                AND (:batchYear IS NULL OR c.batch_year = :batchYear)
                AND (:section IS NULL OR c.section = :section)
            ORDER BY r.created_at DESC
            """, nativeQuery = true)
    Page<PrincipalRemarkFeedProjection> findCampusRemarksNativeFiltered(@Param("instId") UUID instId,
                                                                        @Param("batchYear") Integer batchYear,
                                                                        @Param("section") String section,
                                                                        Pageable pageable);

    @Query(value = """
            SELECT 
                BIN_TO_UUID(r.id) AS id,
                r.content,
                r.created_at AS createdAt,
                CONCAT(stu.first_name, ' ', stu.last_name) AS authorName,
                stu.student_id AS authorCode,
                CONCAT('Year ', stu.current_semester) AS academicInfo,
                CONCAT(sf.first_name, ' ', sf.last_name) AS targetStaffName,
                r.remark_status AS status,
                r.remark_priority AS priority,
                r.remark_category AS category
            FROM remarks r
            JOIN students stu ON r.author_student_id = stu.id
            JOIN staffs sf ON r.target_staff_id = sf.id
            WHERE r.institution_id = :instId
                AND r.remark_status = 'PENDING'
                AND r.author_student_id IS NOT NULL
                AND r.remark_target = 'STAFF'
                AND r.target_staff_id IS NOT NULL
                AND r.is_deleted = false
            ORDER BY r.created_at DESC
            """, nativeQuery = true)
    Page<PrincipalRemarkFeedProjection> findStaffRemarksNative(@Param("instId") UUID instId, Pageable pageable);

    @Query(value = """
            SELECT 
                BIN_TO_UUID(r.id) AS id,
                r.content,
                r.created_at AS createdAt,
                CONCAT(stu.first_name, ' ', stu.last_name) AS authorName,
                stu.student_id AS authorCode,
                CONCAT('Year ', stu.current_semester) AS academicInfo,
                CONCAT(sf.first_name, ' ', sf.last_name) AS targetStaffName,
                r.remark_status AS status,
                r.remark_priority AS priority,
                r.remark_category AS category
            FROM remarks r
            JOIN students stu ON r.author_student_id = stu.id
            JOIN classes c ON stu.class_id = c.id
            JOIN staffs sf ON r.target_staff_id = sf.id
            WHERE r.institution_id = :instId
                AND r.remark_status = 'PENDING'
                AND r.author_student_id IS NOT NULL
                AND r.remark_target = 'STAFF'
                AND r.target_staff_id IS NOT NULL
                AND r.is_deleted = false
                AND (:batchYear IS NULL OR c.batch_year = :batchYear)
                AND (:section IS NULL OR c.section = :section)
            ORDER BY r.created_at DESC
            """, nativeQuery = true)
    Page<PrincipalRemarkFeedProjection> findStaffRemarksNativeFiltered(@Param("instId") UUID instId,
                                                                       @Param("batchYear") Integer batchYear,
                                                                       @Param("section") String section,
                                                                       Pageable pageable);

    @Query(value = """
            SELECT COUNT(r.id)
            FROM remarks r
            JOIN students s ON s.id = r.author_student_id
            JOIN classes c ON s.class_id = c.id
            WHERE r.institution_id = :instId
              AND r.is_deleted = false
              AND r.remark_target IN ('CAMPUS', 'STAFF')
              AND (:batchYear IS NULL OR c.batch_year = :batchYear)
              AND (:section IS NULL OR c.section = :section)
            """, nativeQuery = true)
    long countTotalRemarksForResolutionFiltered(@Param("instId") UUID instId,
                                                @Param("batchYear") Integer batchYear,
                                                @Param("section") String section);

    @Query(value = """
            SELECT COUNT(r.id)
            FROM remarks r
            JOIN students s ON s.id = r.author_student_id
            JOIN classes c ON s.class_id = c.id
            WHERE r.institution_id = :instId
              AND r.is_deleted = false
              AND r.remark_status = 'RESOLVED'
              AND r.remark_target IN ('CAMPUS', 'STAFF')
              AND (:batchYear IS NULL OR c.batch_year = :batchYear)
              AND (:section IS NULL OR c.section = :section)
            """, nativeQuery = true)
    long countResolvedRemarksFiltered(@Param("instId") UUID instId,
                                      @Param("batchYear") Integer batchYear,
                                      @Param("section") String section);

    @Query(value = """
            SELECT COUNT(*)
            FROM remarks r
            WHERE r.institution_id = :instId
              AND r.target_student_id = :studentId
              AND r.remark_status = 'PENDING'
              AND r.is_deleted = false
            """, nativeQuery = true)
    long countPendingByTargetStudentId(@Param("instId") UUID instId, @Param("studentId") UUID studentId);

    @Query(value = """
            SELECT MAX(r.created_at)
            FROM remarks r
            WHERE r.institution_id = :instId
              AND r.target_student_id = :studentId
              AND r.remark_status = 'PENDING'
              AND r.is_deleted = false
            """, nativeQuery = true)
    java.time.LocalDateTime findLatestPendingRemarkAtByTargetStudentId(@Param("instId") UUID instId, @Param("studentId") UUID studentId);
}
