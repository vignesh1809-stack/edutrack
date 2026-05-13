package com.example.edutrack.controller;

import com.example.edutrack.dto.StudentDashboardDto;
import com.example.edutrack.dto.StudentPortalProfileDto;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.StudentDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.edutrack.dto.StudentRemarkDto;
import com.example.edutrack.dto.StaffListDto;
import com.example.edutrack.dto.SubmitRemarkRequest;

import java.util.List;

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

    @GetMapping("/profile")
    @PreAuthorize("hasAuthority('Student')")
    public ResponseEntity<StudentPortalProfileDto> getProfile(
            @AuthenticationPrincipal CustomUserDetails studentPrincipal) {
        StudentPortalProfileDto profile = studentDashboardService.getStudentProfile(
                studentPrincipal.getInstitutionId(),
                studentPrincipal.getId()
        );
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/remarks")
    @PreAuthorize("hasAuthority('Student')")
    public ResponseEntity<List<StudentRemarkDto>> getRemarks(
            @AuthenticationPrincipal CustomUserDetails studentPrincipal) {
        List<StudentRemarkDto> remarks = studentDashboardService.getStudentRemarks(
                studentPrincipal.getInstitutionId(),
                studentPrincipal.getId()
        );
        return ResponseEntity.ok(remarks);
    }

    @PostMapping("/remarks")
    @PreAuthorize("hasAuthority('Student')")
    public ResponseEntity<Void> submitRemark(
            @AuthenticationPrincipal CustomUserDetails studentPrincipal,
            @RequestBody SubmitRemarkRequest request) {
        studentDashboardService.submitRemark(studentPrincipal.getInstitutionId(), studentPrincipal.getId(), request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/staff")
    @PreAuthorize("hasAuthority('Student')")
    public ResponseEntity<List<StaffListDto>> getStaffList(
            @AuthenticationPrincipal CustomUserDetails studentPrincipal) {
        return ResponseEntity.ok(studentDashboardService.getStaffList(studentPrincipal.getInstitutionId()));
    }
}
