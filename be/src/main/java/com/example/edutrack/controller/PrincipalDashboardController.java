package com.example.edutrack.controller;

import com.example.edutrack.dto.PrincipalDashboardDto;
import com.example.edutrack.dto.StaffPerformanceDto;
import com.example.edutrack.dto.DepartmentAverageDto;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.PrincipalDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/principal/dashboard")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PrincipalDashboardController {

    @Autowired
    private PrincipalDashboardService dashboardService;

    /**
     * GET /api/principal/dashboard
     *
     * Returns a single JSON object with:
     *   - totalStudents              → all enrolled students
     *   - studentsMarkedToday        → distinct students with attendance today
     *   - attendancePercentageToday  → % of PRESENT out of all records today
     *   - totalBuses                 → registered buses
     *   - busesArrivedToday          → buses with an arrival log today
     *   - remarksSubmittedToday      → campus remarks submitted today
     *   - totalRemarks               → all-time remarks count
     *   - latestRemarks              → latest 5 remark entries
     *
     * Secured: requires a valid JWT. Institution is read from the JWT principal.
     */
    @GetMapping
    @PreAuthorize("hasAnyAuthority('Administrator', 'Lecturer', 'Head_of_Department', 'Principal')")
    public ResponseEntity<PrincipalDashboardDto> getDashboard(
            @AuthenticationPrincipal CustomUserDetails principal,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String section,
            @RequestParam(required = false) String branch) {

        PrincipalDashboardDto dashboard = dashboardService.getDashboard(principal.getInstitutionId(), year, section, branch);
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/department-averages")
    @PreAuthorize("hasAuthority('Principal')")
    public ResponseEntity<List<DepartmentAverageDto>> getDepartmentAverages(
            @AuthenticationPrincipal CustomUserDetails principal,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String section,
            @RequestParam(required = false) String branch) {
        
        java.util.List<com.example.edutrack.dto.DepartmentAverageDto> data = dashboardService.getDepartmentAverages(principal.getInstitutionId(), year, section, branch);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/least-performed-staff")
    @PreAuthorize("hasAuthority('Principal')")
    public ResponseEntity<List<StaffPerformanceDto>> getLeastPerformedStaff(
            @AuthenticationPrincipal CustomUserDetails principal,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String section,
            @RequestParam(required = false) String branch) {
        
        java.util.List<com.example.edutrack.dto.StaffPerformanceDto> data = dashboardService.getLeastPerformedStaff(principal.getInstitutionId(), year, section, branch);
        return ResponseEntity.ok(data);
    }
}
