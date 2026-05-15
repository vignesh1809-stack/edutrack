package com.example.edutrack.controller;

import com.example.edutrack.dto.GuardianDashboardDto;
import com.example.edutrack.dto.StudentDashboardDto;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.GuardianDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/guardian/dashboard")
@CrossOrigin(origins = "*", maxAge = 3600)
public class GuardianDashboardController {

    @Autowired
    private GuardianDashboardService guardianDashboardService;

    @GetMapping
    @PreAuthorize("hasAuthority('Guardian')")
    public ResponseEntity<GuardianDashboardDto> getDashboard(
            @AuthenticationPrincipal CustomUserDetails guardianPrincipal,
            @RequestParam(required = false) UUID studentId,
            @RequestParam(required = false) Integer semester) {
        
        GuardianDashboardDto dashboard = guardianDashboardService.getDashboard(
                guardianPrincipal.getInstitutionId(),
                guardianPrincipal.getId(),
                studentId,
                semester
        );
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/attendance")
    @PreAuthorize("hasAuthority('Guardian')")
    public ResponseEntity<StudentDashboardDto.AttendanceSummary> getAttendance(
            @AuthenticationPrincipal CustomUserDetails guardianPrincipal,
            @RequestParam(required = false) UUID studentId,
            @RequestParam(required = false) Integer semester) {
        
        return ResponseEntity.ok(guardianDashboardService.getAttendance(
                guardianPrincipal.getInstitutionId(),
                guardianPrincipal.getId(),
                studentId,
                semester
        ));
    }

    @GetMapping("/fees")
    @PreAuthorize("hasAuthority('Guardian')")
    public ResponseEntity<StudentDashboardDto.FinancialSummary> getFees(
            @AuthenticationPrincipal CustomUserDetails guardianPrincipal,
            @RequestParam(required = false) UUID studentId) {
        
        return ResponseEntity.ok(guardianDashboardService.getFees(
                guardianPrincipal.getInstitutionId(),
                guardianPrincipal.getId(),
                studentId
        ));
    }
}
