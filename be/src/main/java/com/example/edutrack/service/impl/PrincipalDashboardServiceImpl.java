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
    public PrincipalDashboardDto getDashboard(UUID institutionId) {
        // Ensure tenant context is set (may already be set by the JWT filter)
        TenantContext.setCurrentTenant(institutionId.toString());

        LocalDate today = LocalDate.now();

        // ── 1. Student counts ─────────────────────────────────────────────────
        long totalStudents       = studentRepository.countActiveStudents(institutionId);
        long studentsMarkedToday = attendanceRepository.countDistinctStudentsOnDate(institutionId, today);

        // ── 2. Attendance percentage ──────────────────────────────────────────
        long presentToday = attendanceRepository.countPresentOnDate(institutionId, today);
        long totalRecords = attendanceRepository.countTotalOnDate(institutionId, today);
        double attendancePct = totalRecords > 0
                ? Math.round((presentToday * 100.0 / totalRecords) * 10.0) / 10.0
                : 0.0;

        // ── 3. Bus metrics ────────────────────────────────────────────────────
        long totalBuses       = busesLogsRepository.countTotalBuses(institutionId);
        long busesArrivedToday = busesLogsRepository.countBusesArrivedOnDate(institutionId, today);

        // ── 4. Remarks metrics ────────────────────────────────────────────────
        long remarksToday = remarksRepository.countRemarksSubmittedOnDate(institutionId, today);
        long totalRemarks = remarksRepository.countTotalRemarks(institutionId);

        // ── 5. Latest remarks feed (5 most recent) ────────────────────────────
        List<Object[]> rawRemarks = remarksRepository
                .findLatestRemarks(institutionId, PageRequest.of(0, 5))
                .getContent();

        List<RemarkSummaryDto> latestRemarks = rawRemarks.stream().map(row -> {
            String createdAt = row[2] != null ? row[2].toString() : null;
            return RemarkSummaryDto.builder()
                    .id(row[0] != null ? row[0].toString() : null)
                    .content(row[1] != null ? row[1].toString() : null)
                    .createdAt(createdAt)
                    .studentName(row[3] != null ? row[3].toString() : null)
                    .studentCode(row[4] != null ? row[4].toString() : null)
                    .build();
        }).collect(Collectors.toList());

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
