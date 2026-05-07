package com.example.edutrack.controller;

import com.example.edutrack.dto.StaffProfileDto;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProfileController {

    @Autowired
    private StaffService staffService;

    @GetMapping
    public ResponseEntity<StaffProfileDto> getMyProfile(@AuthenticationPrincipal CustomUserDetails principal) {
        // Assuming principal is a Staff member
        StaffProfileDto profile = staffService.getProfile(principal.getId(), principal.getInstitutionId());
        return ResponseEntity.ok(profile);
    }
}
