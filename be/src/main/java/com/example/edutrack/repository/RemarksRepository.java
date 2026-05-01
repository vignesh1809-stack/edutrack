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

    /** Count campus-related remarks submitted today for this institution */
    @Query(value = """
            SELECT COUNT(*)
            FROM remarks r
            WHERE r.institution_id = :instId
              AND DATE(r.created_at) = :date
              AND r.is_deleted       = false
            """, nativeQuery = true)
    long countRemarksSubmittedOnDate(@Param("instId") UUID instId, @Param("date") LocalDate date);

    /** Total remarks ever submitted for this institution */
    @Query(value = """
            SELECT COUNT(*)
            FROM remarks r
            WHERE r.institution_id = :instId
              AND r.is_deleted      = false
            """, nativeQuery = true)
    long countTotalRemarks(@Param("instId") UUID instId);

    /** Latest N remarks with student info for the dashboard feed */
    @Query(value = """
            SELECT r.id, r.content, r.created_at,
                   CONCAT(s.first_name, ' ', s.last_name) AS studentName,
                   s.student_id AS studentCode
            FROM remarks r
            JOIN students s ON s.id = r.target_student_id
            WHERE r.institution_id = :instId
              AND r.is_deleted      = false
            ORDER BY r.created_at DESC
            """, nativeQuery = true)
    Page<Object[]> findLatestRemarks(@Param("instId") UUID instId, Pageable pageable);
}
