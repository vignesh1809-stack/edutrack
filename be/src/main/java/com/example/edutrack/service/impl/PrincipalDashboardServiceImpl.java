package com.example.edutrack.service.impl;

import com.example.edutrack.config.TenantContext;
import com.example.edutrack.dto.PrincipalDashboardDto;
import com.example.edutrack.dto.PrincipalDashboardDto.RemarkSummaryDto;
import com.example.edutrack.repository.AttendanceRepository;
import com.example.edutrack.repository.BusesLogsRepository;
import com.example.edutrack.repository.RemarksRepository;
import com.example.edutrack.repository.StudentRepository;
import com.example.edutrack.service.PrincipalDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PrincipalDashboardServiceImpl implements PrincipalDashboardService {

    @Autowired private StudentRepository    studentRepository;
    @Autowired private AttendanceRepository attendanceRepository;
    @Autowired private BusesLogsRepository  busesLogsRepository;
    @Autowired private RemarksRepository    remarksRepository;

    @Override
    @Transactional(readOnly = true)
    public PrincipalDashboardDto getDashboard(UUID institutionId, Integer year, String section) {
        // Ensure tenant context is set
        TenantContext.setCurrentTenant(institutionId.toString());

        LocalDate today = LocalDate.now();

        // ── 1. Student counts ─────────────────────────────────────────────────
        long totalStudents = (year == null && section == null)
                ? studentRepository.countActiveStudents(institutionId)
                : studentRepository.countActiveStudentsFiltered(institutionId, year, section);

        long studentsMarkedToday = (year == null && section == null)
                ? attendanceRepository.countDistinctStudentsOnDate(institutionId, today)
                : attendanceRepository.countDistinctStudentsOnDateFiltered(institutionId, today, year, section);

        // ── 2. Attendance percentage ──────────────────────────────────────────
        long presentToday = (year == null && section == null)
                ? attendanceRepository.countPresentOnDate(institutionId, today)
                : attendanceRepository.countPresentOnDateFiltered(institutionId, today, year, section);

        long totalRecords = (year == null && section == null)
                ? attendanceRepository.countTotalOnDate(institutionId, today)
                : attendanceRepository.countTotalOnDateFiltered(institutionId, today, year, section);

        double attendancePct = totalRecords > 0
                ? Math.round((presentToday * 100.0 / totalRecords) * 10.0) / 10.0
                : 0.0;

        // ── 3. Bus metrics ────────────────────────────────────────────────────
        long totalBuses = (year == null && section == null)
                ? busesLogsRepository.countTotalBuses(institutionId)
                : busesLogsRepository.countTotalBusesFiltered(institutionId, year, section);

        long busesArrivedToday = (year == null && section == null)
                ? busesLogsRepository.countBusesArrivedOnDate(institutionId, today)
                : busesLogsRepository.countBusesArrivedOnDateFiltered(institutionId, today, year, section);

        // ── 4. Remarks metrics ────────────────────────────────────────────────
        long remarksToday;
        long totalRemarks;
        List<RemarkSummaryDto> latestRemarks;

        if (year == null && section == null) {
            // Show all remarks for the institution
            remarksToday = remarksRepository.countRemarksSubmittedOnDate(institutionId, today);
            totalRemarks = remarksRepository.countTotalRemarks(institutionId);

            List<Object[]> rawRemarks = remarksRepository
                    .findLatestRemarks(institutionId, PageRequest.of(0, 5))
                    .getContent();

            latestRemarks = rawRemarks.stream().map(row -> {
                String createdAt = row[2] != null ? row[2].toString() : null;
                return RemarkSummaryDto.builder()
                        .id(row[0] != null ? row[0].toString() : null)
                        .content(row[1] != null ? row[1].toString() : null)
                        .createdAt(createdAt)
                        .studentName(row[3] != null ? row[3].toString() : null)
                        .studentCode(row[4] != null ? row[4].toString() : null)
                        .build();
            }).collect(Collectors.toList());
        } else {
            // Show filtered remarks
            remarksToday = remarksRepository.countRemarksSubmittedOnDateFiltered(institutionId, today, year, section);
            totalRemarks = remarksRepository.countTotalRemarksFiltered(institutionId, year, section);

            List<Object[]> rawRemarks = remarksRepository
                    .findLatestRemarksFiltered(institutionId, year, section, PageRequest.of(0, 5))
                    .getContent();

            latestRemarks = rawRemarks.stream().map(row -> {
                String createdAt = row[2] != null ? row[2].toString() : null;
                return RemarkSummaryDto.builder()
                        .id(row[0] != null ? row[0].toString() : null)
                        .content(row[1] != null ? row[1].toString() : null)
                        .createdAt(createdAt)
                        .studentName(row[3] != null ? row[3].toString() : null)
                        .studentCode(row[4] != null ? row[4].toString() : null)
                        .build();
            }).collect(Collectors.toList());
        }

        return PrincipalDashboardDto.builder()
                .totalStudents(totalStudents)
                .studentsMarkedToday(studentsMarkedToday)
                .attendancePercentageToday(attendancePct)
                .totalBuses(totalBuses)
                .busesArrivedToday(busesArrivedToday)
                .remarksSubmittedToday(remarksToday)
                .totalRemarks(totalRemarks)
                .latestRemarks(latestRemarks)
                .build();
    }
}
