package com.example.edutrack.service.impl;

import com.example.edutrack.config.TenantContext;
import com.example.edutrack.dto.DepartmentAverageDto;
import com.example.edutrack.dto.DepartmentAverageProjection;
import com.example.edutrack.dto.PrincipalDashboardDto;
import com.example.edutrack.dto.PrincipalDashboardDto.RemarkSummaryDto;
import com.example.edutrack.dto.StaffPerformanceDto;
import com.example.edutrack.repository.AssessmentRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PrincipalDashboardServiceImpl implements PrincipalDashboardService {

    @Autowired private StudentRepository    studentRepository;
    @Autowired private AttendanceRepository attendanceRepository;
    @Autowired private BusesLogsRepository  busesLogsRepository;
    @Autowired private RemarksRepository    remarksRepository;
    @Autowired private AssessmentRepository assessmentRepository;
    @Autowired private PrincipalDashboardMetricsHelper metricsHelper;

    @Override
    @Transactional(readOnly = true)
    public PrincipalDashboardDto getDashboard(UUID institutionId, Integer year, String section, String branch) {
        // Ensure tenant context is set
        TenantContext.setCurrentTenant(institutionId.toString());

        String branchFilter = (branch == null || branch.equals("All Branches")) ? null : branch;

        // ── 1. Student counts (Fragmented Cache) ──────────────────────────────
        long totalStudents = (year == null && section == null && branchFilter == null)
                ? metricsHelper.getCachedTotalStudents(institutionId)
                : metricsHelper.getCachedTotalStudentsFiltered(institutionId, year, section, branchFilter);

        // ── 2. Attendance metrics (11 AM Logic Cache) ─────────────────────────
        PrincipalDashboardMetricsHelper.AttendanceMetrics att = metricsHelper.getCachedAttendanceMetrics(institutionId, year, section, branchFilter);
        
        double attendancePct = att.total > 0
                ? Math.round((att.present * 100.0 / att.total) * 10.0) / 10.0
                : 0.0;

        // ── 3. Bus metrics (11 AM Logic Cache) ────────────────────────────────
        PrincipalDashboardMetricsHelper.BusMetrics bus = metricsHelper.getCachedBusMetrics(institutionId, year, section, branchFilter);

        // ── 4. Remarks metrics (Short TTL Cache) ──────────────────────────────
        PrincipalDashboardMetricsHelper.RemarkCounts rem = metricsHelper.getCachedRemarkCounts(institutionId, year, section, branchFilter);
        List<RemarkSummaryDto> latestRemarks = metricsHelper.getCachedLatestRemarks(institutionId, year, section, branchFilter);

        return PrincipalDashboardDto.builder()
                .totalStudents(totalStudents)
                .studentsMarkedToday(att.marked)
                .attendancePercentageToday(attendancePct)
                .totalBuses(bus.total)
                .busesArrivedToday(bus.arrived)
                .remarksSubmittedToday(rem.today)
                .totalRemarks(rem.total)
                .latestRemarks(latestRemarks)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentAverageDto> getDepartmentAverages(UUID institutionId, Integer year, String section, String branch) {
        TenantContext.setCurrentTenant(institutionId.toString());

        String branchFilter = (branch == null || branch.equals("All Branches")) ? null : branch;

        List<DepartmentAverageProjection> currentAverages = metricsHelper.getCachedDepartmentAverages(institutionId, year, section, branchFilter);
        
        List<DepartmentAverageProjection> previousAverages = null;
        if (year != null) {
            previousAverages = metricsHelper.getCachedDepartmentAverages(institutionId, year - 1, section, branchFilter);
        }

        List<DepartmentAverageDto> results = new ArrayList<>();

        for (DepartmentAverageProjection proj : currentAverages) {
            double currentPct = Math.round(proj.getAverageCgpa() * 100.0) / 10.0; // Correct rounding to 1 decimal: Math.round(cgpa * 10 * 10) / 10.0

            Double prevPct = null;
            Double trend = null;

            if (year != null && previousAverages != null) {
                for (DepartmentAverageProjection prevProj : previousAverages) {
                    if (prevProj.getDepartmentCode().equals(proj.getDepartmentCode())) {
                        prevPct = Math.round(prevProj.getAverageCgpa() * 100.0) / 10.0;
                        trend = Math.round((currentPct - prevPct) * 10.0) / 10.0;
                        break;
                    }
                }
            }

            results.add(DepartmentAverageDto.builder()
                    .department(proj.getDepartmentCode())
                    .averagePercentage(currentPct)
                    .previousPercentage(prevPct)
                    .trend(trend)
                    .build());
        }

        return results;
    }

    @Override
    @Transactional(readOnly = true)
    public List<StaffPerformanceDto> getLeastPerformedStaff(UUID institutionId, Integer year, String section, String branch) {
        TenantContext.setCurrentTenant(institutionId.toString());
        
        String branchFilter = (branch == null || branch.equals("All Branches")) ? null : branch;

        return metricsHelper.getCachedLeastPerformedStaff(institutionId, year, section, branchFilter)
                .stream()
                .map(proj -> StaffPerformanceDto.builder()
                        .staffId(proj.getStaffId())
                        .staffName(proj.getStaffName())
                        .subject(proj.getSubject())
                        .department(proj.getDepartment())
                        .performanceScore(Math.round(proj.getPerformanceScore() * 10.0) / 10.0)
                        .role(proj.getRole())
                        .build())
                .collect(Collectors.toList());
    }
}
