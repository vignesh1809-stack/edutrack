package com.example.edutrack.controller;

import com.example.edutrack.dto.AttendanceGraphDto;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.StaffDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff/dashboard")
@CrossOrigin(origins = "*", maxAge = 3600)
public class StaffDashboardController {

    @Autowired
    private StaffDashboardService staffDashboardService;

    /**
     * GET /api/staff/dashboard/attendance-graph
     * 
     * Returns attendance graph data for the last N days (default 7).
     * Provides dates, present counts, total counts, and percentages.
     */
    @GetMapping("/attendance-graph")
    @PreAuthorize("hasAnyAuthority('Administrator', 'Lecturer', 'Head_of_Department', 'Principal')")
    public ResponseEntity<List<AttendanceGraphDto>> getAttendanceGraph(
            @AuthenticationPrincipal CustomUserDetails principal,
            @RequestParam(defaultValue = "7") int days,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String section) {
        
        List<AttendanceGraphDto> graphData = staffDashboardService.getAttendanceGraph(principal.getInstitutionId(), days, year, section);
        return ResponseEntity.ok(graphData);
    }
}
