package com.example.edutrack.controller;

import com.example.edutrack.dto.StaffAttendanceClassDto;
import com.example.edutrack.dto.AttendanceSubmitRequest;
import com.example.edutrack.dto.StaffAttendanceHistoryDto;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.StaffAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/staff/attendance")
@CrossOrigin(origins = "*", maxAge = 3600)
public class StaffAttendanceController {

    @Autowired
    private StaffAttendanceService staffAttendanceService;

    @GetMapping("/class")
    @PreAuthorize("hasAnyAuthority('Lecturer', 'Head_of_Department', 'Administrator')")
    public ResponseEntity<StaffAttendanceClassDto> getStaffAttendanceClass(
            @AuthenticationPrincipal CustomUserDetails principal,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) Integer semester,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String section,
            @RequestParam(required = false) String branch) {
        
        StaffAttendanceClassDto classDto = staffAttendanceService.getStaffAttendanceClass(
                principal.getInstitutionId(), principal.getId(), date, semester, year, section, branch);
        return ResponseEntity.ok(classDto);
    }

    @PostMapping("/submit")
    @PreAuthorize("hasAnyAuthority('Lecturer', 'Head_of_Department', 'Administrator')")
    public ResponseEntity<?> submitStaffAttendance(
            @AuthenticationPrincipal CustomUserDetails principal,
            @RequestBody AttendanceSubmitRequest request) {
        
        staffAttendanceService.submitStaffAttendance(
                principal.getInstitutionId(), principal.getId(), request);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Successfully recorded attendance for " + request.getRecords().size() + " students on " + request.getRecordDate()
        ));
    }

    @GetMapping("/history")
    @PreAuthorize("hasAnyAuthority('Lecturer', 'Head_of_Department', 'Administrator')")
    public ResponseEntity<StaffAttendanceHistoryDto> getStaffAttendanceHistory(
            @AuthenticationPrincipal CustomUserDetails principal,
            @RequestParam(defaultValue = "30") int limit) {
        
        StaffAttendanceHistoryDto historyDto = staffAttendanceService.getStaffAttendanceHistory(
                principal.getInstitutionId(), principal.getId(), limit);
        return ResponseEntity.ok(historyDto);
    }
}
