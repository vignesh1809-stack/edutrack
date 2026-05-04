package com.example.edutrack.controller;

import com.example.edutrack.dto.AssessmentDistributionDto;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @GetMapping("/types")
    @PreAuthorize("hasAnyAuthority('Administrator', 'Lecturer', 'Head_of_Department', 'Principal')")
    public ResponseEntity<List<String>> getAssessmentTypes(
            @AuthenticationPrincipal CustomUserDetails principal,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String section) {
        
        List<String> types = assessmentService.getDistinctAssessmentTypes(principal.getInstitutionId(), year, section);
        return ResponseEntity.ok(types);
    }

    @GetMapping("/distribution")
    @PreAuthorize("hasAnyAuthority('Administrator', 'Lecturer', 'Head_of_Department', 'Principal')")
    public ResponseEntity<List<AssessmentDistributionDto>> getMarksDistribution(
            @AuthenticationPrincipal CustomUserDetails principal,
            @RequestParam String type,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String section) {
        
        List<AssessmentDistributionDto> distribution = assessmentService.getMarksDistribution(principal.getInstitutionId(), type, year, section);
        return ResponseEntity.ok(distribution);
    }
}
