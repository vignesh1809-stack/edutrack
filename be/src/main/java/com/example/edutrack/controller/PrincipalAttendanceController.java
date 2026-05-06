package com.example.edutrack.controller;

import com.example.edutrack.dto.AttendanceTrendsDto;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.AttendanceTrendsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/principal/attendance")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PrincipalAttendanceController {

    @Autowired
    private AttendanceTrendsService attendanceTrendsService;

    @GetMapping("/trends")
    @PreAuthorize("hasAuthority('Principal')")
    public ResponseEntity<AttendanceTrendsDto> getTrends(
            @AuthenticationPrincipal CustomUserDetails principal,
            @RequestParam(required = false, defaultValue = "6") int months,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String branch) {

        AttendanceTrendsDto trends = attendanceTrendsService.getTrends(
                principal.getInstitutionId(), months, year, branch
        );
        return ResponseEntity.ok(trends);
    }
}
