package com.example.edutrack.repository;

import com.example.edutrack.entity.Attendance;
import com.example.edutrack.entity.enums.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface AttendanceRepository extends JpaRepository<Attendance, UUID> {

    /** Count distinct students who have at least one record on a given date for this institution */
    @Query(value = """
            SELECT COUNT(DISTINCT a.student_id)
            FROM attendances a
            WHERE a.institution_id = :instId
              AND a.record_date    = :date
              AND a.is_deleted     = false
            """, nativeQuery = true)
    long countDistinctStudentsOnDate(@Param("instId") UUID instId, @Param("date") LocalDate date);

    /** Count PRESENT records for a given date in this institution */
    @Query(value = """
            SELECT COUNT(*)
            FROM attendances a
            WHERE a.institution_id     = :instId
              AND a.record_date        = :date
              AND a.attendance_status  = 'PRESENT'
              AND a.is_deleted         = false
            """, nativeQuery = true)
    long countPresentOnDate(@Param("instId") UUID instId, @Param("date") LocalDate date);

    /** Total attendance records (all statuses) for a given date */
    @Query(value = """
            SELECT COUNT(*)
            FROM attendances a
            WHERE a.institution_id = :instId
              AND a.record_date    = :date
              AND a.is_deleted     = false
            """, nativeQuery = true)
    long countTotalOnDate(@Param("instId") UUID instId, @Param("date") LocalDate date);

    @Query(value = """
            SELECT COUNT(DISTINCT a.student_id)
            FROM attendances a
            JOIN students s ON s.id = a.student_id
            JOIN departments d ON d.id = s.department_id
            WHERE a.institution_id = :instId
              AND a.record_date    = :date
              AND a.is_deleted     = false
              AND (:batchYear IS NULL OR d.batch_year = :batchYear)
              AND (:section IS NULL OR d.section = :section)
            """, nativeQuery = true)
    long countDistinctStudentsOnDateFiltered(@Param("instId") UUID instId, 
                                             @Param("date") LocalDate date,
                                             @Param("batchYear") Integer batchYear,
                                             @Param("section") String section);

    @Query(value = """
            SELECT COUNT(a.id)
            FROM attendances a
            JOIN students s ON s.id = a.student_id
            JOIN departments d ON d.id = s.department_id
            WHERE a.institution_id     = :instId
              AND a.record_date        = :date
              AND a.attendance_status  = 'PRESENT'
              AND a.is_deleted         = false
              AND (:batchYear IS NULL OR d.batch_year = :batchYear)
              AND (:section IS NULL OR d.section = :section)
            """, nativeQuery = true)
    long countPresentOnDateFiltered(@Param("instId") UUID instId, 
                                    @Param("date") LocalDate date,
                                    @Param("batchYear") Integer batchYear,
                                    @Param("section") String section);

    @Query(value = """
            SELECT COUNT(a.id)
            FROM attendances a
            JOIN students s ON s.id = a.student_id
            JOIN departments d ON d.id = s.department_id
            WHERE a.institution_id = :instId
              AND a.record_date    = :date
              AND a.is_deleted     = false
              AND (:batchYear IS NULL OR d.batch_year = :batchYear)
              AND (:section IS NULL OR d.section = :section)
            """, nativeQuery = true)
    long countTotalOnDateFiltered(@Param("instId") UUID instId, 
                                  @Param("date") LocalDate date,
                                  @Param("batchYear") Integer batchYear,
                                  @Param("section") String section);

    @Query(value = """
            SELECT a.record_date as recordDate, 
                   COUNT(CASE WHEN a.attendance_status = 'PRESENT' THEN 1 END) as presentCount,
                   COUNT(a.id) as totalCount
            FROM attendances a
            WHERE a.institution_id = :instId
              AND a.record_date >= :startDate
              AND a.is_deleted = false
            GROUP BY a.record_date
            ORDER BY a.record_date ASC
            """, nativeQuery = true)
    List<DailyAttendanceProjection> getAttendanceGraphData(@Param("instId") UUID instId, @Param("startDate") LocalDate startDate);

    @Query(value = """
            SELECT a.record_date as recordDate, 
                   COUNT(CASE WHEN a.attendance_status = 'PRESENT' THEN 1 END) as presentCount,
                   COUNT(a.id) as totalCount
            FROM attendances a
            JOIN students s ON s.id = a.student_id
            JOIN departments d ON d.id = s.department_id
            WHERE a.institution_id = :instId
              AND a.record_date >= :startDate
              AND a.is_deleted = false
              AND (:batchYear IS NULL OR d.batch_year = :batchYear)
              AND (:section IS NULL OR d.section = :section)
            GROUP BY a.record_date
            ORDER BY a.record_date ASC
            """, nativeQuery = true)
    List<DailyAttendanceProjection> getAttendanceGraphDataFiltered(@Param("instId") UUID instId, 
                                                                   @Param("startDate") LocalDate startDate,
                                                                   @Param("batchYear") Integer batchYear,
                                                                   @Param("section") String section);
}
