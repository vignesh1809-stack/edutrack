package com.example.edutrack.service.impl;

import com.example.edutrack.dto.PrincipalDashboardDto;
import com.example.edutrack.repository.AttendanceRepository;
import com.example.edutrack.repository.BusesLogsRepository;
import com.example.edutrack.repository.RemarksRepository;
import com.example.edutrack.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Component
public class PrincipalDashboardMetricsHelper {

    @Autowired private StudentRepository studentRepository;
    @Autowired private AttendanceRepository attendanceRepository;
    @Autowired private BusesLogsRepository busesLogsRepository;
    @Autowired private RemarksRepository remarksRepository;

    // Cache total students for 30 days (manually evicted on changes)
    @Cacheable(value = "totalStudents", key = "#institutionId")
    public long getCachedTotalStudents(UUID institutionId) {
        return studentRepository.countActiveStudents(institutionId);
    }

    @Cacheable(value = "totalStudentsFiltered", key = "#institutionId + '-' + #year + '-' + #section + '-' + #branch")
    public long getCachedTotalStudentsFiltered(UUID institutionId, Integer year, String section, String branch) {
        return studentRepository.countActiveStudentsFiltered(institutionId, year, section, branch);
    }

    // Attendance stats: Caches based on time of day (11 AM Logic)
    // We use a custom key suffix that changes every 5 mins before 11 AM, and stays static after 11 AM
    @Cacheable(value = "attendanceStats", key = "#institutionId + '-' + #year + '-' + #section + '-' + #branch + '-' + @principalDashboardMetricsHelper.getTimeKey()")
    public AttendanceMetrics getCachedAttendanceMetrics(UUID institutionId, Integer year, String section, String branch) {
        LocalDate today = LocalDate.now();
        long present = (year == null && section == null && branch == null)
                ? attendanceRepository.countPresentOnDate(institutionId, today)
                : attendanceRepository.countPresentOnDateFiltered(institutionId, today, year, section, branch);

        long total = (year == null && section == null && branch == null)
                ? attendanceRepository.countTotalOnDate(institutionId, today)
                : attendanceRepository.countTotalOnDateFiltered(institutionId, today, year, section, branch);

        long marked = (year == null && section == null && branch == null)
                ? attendanceRepository.countDistinctStudentsOnDate(institutionId, today)
                : attendanceRepository.countDistinctStudentsOnDateFiltered(institutionId, today, year, section, branch);

        return new AttendanceMetrics(present, total, marked);
    }

    @Cacheable(value = "busStats", key = "#institutionId + '-' + #year + '-' + #section + '-' + #branch + '-' + @principalDashboardMetricsHelper.getTimeKey()")
    public BusMetrics getCachedBusMetrics(UUID institutionId, Integer year, String section, String branch) {
        LocalDate today = LocalDate.now();
        long total = (year == null && section == null && branch == null)
                ? busesLogsRepository.countTotalBuses(institutionId)
                : busesLogsRepository.countTotalBusesFiltered(institutionId, year, section, branch);

        long arrived = (year == null && section == null && branch == null)
                ? busesLogsRepository.countBusesArrivedOnDate(institutionId, today)
                : busesLogsRepository.countBusesArrivedOnDateFiltered(institutionId, today, year, section, branch);

        return new BusMetrics(total, arrived);
    }

    @Cacheable(value = "remarkCounts", key = "#institutionId + '-' + #year + '-' + #section + '-' + #branch")
    public RemarkCounts getCachedRemarkCounts(UUID institutionId, Integer year, String section, String branch) {
        LocalDate today = LocalDate.now();
        long todayCount = (year == null && section == null && branch == null)
                ? remarksRepository.countRemarksSubmittedOnDate(institutionId, today)
                : remarksRepository.countRemarksSubmittedOnDateFiltered(institutionId, today, year, section, branch);

        long totalCount = (year == null && section == null && branch == null)
                ? remarksRepository.countTotalRemarks(institutionId)
                : remarksRepository.countTotalRemarksFiltered(institutionId, year, section, branch);

        return new RemarkCounts(todayCount, totalCount);
    }

    @Cacheable(value = "latestRemarks", key = "#institutionId + '-' + #year + '-' + #section + '-' + #branch")
    public List<PrincipalDashboardDto.RemarkSummaryDto> getCachedLatestRemarks(UUID institutionId, Integer year, String section, String branch) {
        PageRequest pageable = PageRequest.of(0, 5);
        List<Object[]> rawRemarks = (year == null && section == null && branch == null)
                ? remarksRepository.findLatestRemarks(institutionId, pageable).getContent()
                : remarksRepository.findLatestRemarksFiltered(institutionId, year, section, branch, pageable).getContent();

        return rawRemarks.stream().map(row -> {
            String createdAt = row[2] != null ? row[2].toString() : null;
            return PrincipalDashboardDto.RemarkSummaryDto.builder()
                    .id(row[0] != null ? row[0].toString() : null)
                    .content(row[1] != null ? row[1].toString() : null)
                    .createdAt(createdAt)
                    .studentName(row[3] != null ? row[3].toString() : null)
                    .studentCode(row[4] != null ? row[4].toString() : null)
                    .build();
        }).collect(java.util.stream.Collectors.toList());
    }

    /**
     * Generates a cache key suffix based on the "11 AM" architectural logic.
     * Before 11:00: Key changes every 5 minutes.
     * After 11:00: Key is static "AFTERNOON".
     */
    public String getTimeKey() {
        LocalTime now = LocalTime.now();
        if (now.isAfter(LocalTime.of(11, 0))) {
            return "AFTERNOON";
        }
        // Change key every 5 minutes to allow for morning updates
        return "MORNING-" + (now.getHour() * 12 + now.getMinute() / 5);
    }

    // Helper Record-like classes (using standard Java as we might not have records in Java 11, though user said Java 17)
    public static class AttendanceMetrics {
        public final long present; public final long total; public final long marked;
        public AttendanceMetrics(long present, long total, long marked) { this.present = present; this.total = total; this.marked = marked; }
    }
    public static class BusMetrics {
        public final long total; public final long arrived;
        public BusMetrics(long total, long arrived) { this.total = total; this.arrived = arrived; }
    }
    public static class RemarkCounts {
        public final long today; public final long total;
        public RemarkCounts(long today, long total) { this.today = today; this.total = total; }
    }
}
