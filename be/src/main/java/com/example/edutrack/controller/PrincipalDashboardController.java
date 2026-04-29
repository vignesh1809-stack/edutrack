package com.example.edutrack.controller;

import com.example.edutrack.dto.PrincipalDashboardDto;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.PrincipalDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
            @AuthenticationPrincipal CustomUserDetails principal) {

        PrincipalDashboardDto dashboard = dashboardService.getDashboard(principal.getInstitutionId());
        return ResponseEntity.ok(dashboard);
    }
}
