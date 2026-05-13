package com.example.edutrack.repository;

import com.example.edutrack.entity.BusesLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.UUID;

public interface BusesLogsRepository extends JpaRepository<BusesLogs, UUID> {

    /** Count distinct buses that arrived today (have a log entry today) for this institution */
    @Query(value = """
            SELECT COUNT(DISTINCT bl.bus_id)
            FROM buses_logs bl
            JOIN buses b ON b.id = bl.bus_id
            WHERE b.institution_id     = :instId
              AND DATE(bl.arrival_time) = :date
              AND bl.is_deleted         = false
            """, nativeQuery = true)
    long countBusesArrivedOnDate(@Param("instId") UUID instId, @Param("date") LocalDate date);

    /** Total buses registered for this institution */
    @Query(value = """
            SELECT COUNT(*)
            FROM buses b
            WHERE b.institution_id = :instId
              AND b.is_deleted      = false
            """, nativeQuery = true)
    long countTotalBuses(@Param("instId") UUID instId);

    @Query(value = """
            SELECT COUNT(DISTINCT b.id)
            FROM buses b
            JOIN students s ON s.bus_id = b.id
            LEFT JOIN departments d ON d.id = s.department_id
            WHERE b.institution_id = :instId
              AND b.is_deleted      = false
              AND (:batchYear IS NULL OR s.batch_year = :batchYear)
              AND (:section IS NULL OR s.section = :section)
              AND (:branch IS NULL OR d.code = :branch)
            """, nativeQuery = true)
    long countTotalBusesFiltered(@Param("instId") UUID instId,
                                 @Param("batchYear") Integer batchYear,
                                 @Param("section") String section,
                                 @Param("branch") String branch);

    @Query(value = """
            SELECT COUNT(DISTINCT bl.bus_id)
            FROM buses_logs bl
            JOIN buses b ON b.id = bl.bus_id
            JOIN students s ON s.bus_id = b.id
            LEFT JOIN departments d ON d.id = s.department_id
            WHERE b.institution_id     = :instId
              AND DATE(bl.arrival_time) = :date
              AND bl.is_deleted         = false
              AND (:batchYear IS NULL OR s.batch_year = :batchYear)
              AND (:section IS NULL OR s.section = :section)
              AND (:branch IS NULL OR d.code = :branch)
            """, nativeQuery = true)
    long countBusesArrivedOnDateFiltered(@Param("instId") UUID instId,
                                         @Param("date") LocalDate date,
                                         @Param("batchYear") Integer batchYear,
                                         @Param("section") String section,
                                         @Param("branch") String branch);
}
