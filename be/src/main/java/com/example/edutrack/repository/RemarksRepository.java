package com.example.edutrack.repository;

import com.example.edutrack.entity.Remarks;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.UUID;

public interface RemarksRepository extends JpaRepository<Remarks, UUID> {

    /** Count campus and staff related remarks submitted today for this institution */
    @Query(value = """
            SELECT COUNT(*)
            FROM remarks r
            WHERE r.institution_id = :instId
              AND DATE(r.created_at) = :date
              AND r.is_deleted       = false
              AND r.remark_target    IN ('CAMPUS', 'STAFF')
            """, nativeQuery = true)
    long countRemarksSubmittedOnDate(@Param("instId") UUID instId, @Param("date") LocalDate date);

    /** Total campus and staff remarks ever submitted for this institution */
    @Query(value = """
            SELECT COUNT(*)
            FROM remarks r
            WHERE r.institution_id = :instId
              AND r.is_deleted      = false
              AND r.remark_target    IN ('CAMPUS', 'STAFF')
            """, nativeQuery = true)
    long countTotalRemarks(@Param("instId") UUID instId);

    /** Latest N campus/staff remarks with author student info for the dashboard feed */
    @Query(value = """
            SELECT r.id, r.content, r.created_at,
                   CONCAT(s.first_name, ' ', s.last_name) AS studentName,
                   s.student_id AS studentCode
            FROM remarks r
            JOIN students s ON s.id = r.author_student_id
            WHERE r.institution_id = :instId
              AND r.is_deleted      = false
              AND r.remark_target    IN ('CAMPUS', 'STAFF')
            ORDER BY r.created_at DESC
            """, nativeQuery = true)
    Page<Object[]> findLatestRemarks(@Param("instId") UUID instId, Pageable pageable);

    @Query(value = """
            SELECT COUNT(r.id)
            FROM remarks r
            JOIN students s ON s.id = r.author_student_id
            WHERE r.institution_id = :instId
              AND DATE(r.created_at) = :date
              AND r.is_deleted       = false
              AND r.remark_target    IN ('CAMPUS', 'STAFF')
              AND (:batchYear IS NULL OR YEAR(s.batch_year) = :batchYear)
              AND (:section IS NULL OR s.section = :section)
            """, nativeQuery = true)
    long countRemarksSubmittedOnDateFiltered(@Param("instId") UUID instId, 
                                             @Param("date") LocalDate date,
                                             @Param("batchYear") Integer batchYear,
                                             @Param("section") String section);

    @Query(value = """
            SELECT COUNT(r.id)
            FROM remarks r
            JOIN students s ON s.id = r.author_student_id
            WHERE r.institution_id = :instId
              AND r.is_deleted      = false
              AND r.remark_target    IN ('CAMPUS', 'STAFF')
              AND (:batchYear IS NULL OR YEAR(s.batch_year) = :batchYear)
              AND (:section IS NULL OR s.section = :section)
            """, nativeQuery = true)
    long countTotalRemarksFiltered(@Param("instId") UUID instId,
                                   @Param("batchYear") Integer batchYear,
                                   @Param("section") String section);

    @Query(value = """
            SELECT r.id, r.content, r.created_at,
                   CONCAT(s.first_name, ' ', s.last_name) AS studentName,
                   s.student_id AS studentCode
            FROM remarks r
            JOIN students s ON s.id = r.author_student_id
            WHERE r.institution_id = :instId
              AND r.is_deleted      = false
              AND r.remark_target    IN ('CAMPUS', 'STAFF')
              AND (:batchYear IS NULL OR YEAR(s.batch_year) = :batchYear)
              AND (:section IS NULL OR s.section = :section)
            ORDER BY r.created_at DESC
            """, nativeQuery = true)
    Page<Object[]> findLatestRemarksFiltered(@Param("instId") UUID instId, 
                                             @Param("batchYear") Integer batchYear,
                                             @Param("section") String section,
                                             Pageable pageable);

    @Query(value = """
            SELECT * FROM remarks 
            WHERE target_student_id = :studentId 
              AND institution_id    = :instId 
              AND is_deleted         = false 
            ORDER BY created_at DESC
            """, nativeQuery = true)
    java.util.List<Remarks> findByTargetStudentId(@Param("studentId") UUID studentId, @Param("instId") UUID instId);
}
