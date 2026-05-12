package com.example.edutrack.controller;

import com.example.edutrack.dto.StudentDashboardDto;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.StudentDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/dashboard")
@CrossOrigin(origins = "*", maxAge = 3600)
public class StudentDashboardController {

    @Autowired
    private StudentDashboardService studentDashboardService;

    @GetMapping
    @PreAuthorize("hasAuthority('Student')")
    public ResponseEntity<StudentDashboardDto> getDashboard(
            @AuthenticationPrincipal CustomUserDetails studentPrincipal,
            @RequestParam(required = false) Integer semester) {
        StudentDashboardDto dashboard = studentDashboardService.getDashboard(
                studentPrincipal.getInstitutionId(),
                studentPrincipal.getId(),
                semester
        );
        return ResponseEntity.ok(dashboard);
    }
}
