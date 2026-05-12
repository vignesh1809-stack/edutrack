package com.example.edutrack.controller;

import com.example.edutrack.dto.PrincipalRemarkFeedItemDto;
import com.example.edutrack.dto.PrincipalRemarkResolveDto;
import com.example.edutrack.dto.PrincipalRemarksSummaryDto;
import com.example.edutrack.entity.enums.RemarkTarget;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.PrincipalRemarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/principal/remarks")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PrincipalRemarksController {

    @Autowired
    private PrincipalRemarksService principalRemarksService;

    @GetMapping("/dashboard-summary")
    @PreAuthorize("hasAuthority('Principal')")
    public ResponseEntity<PrincipalRemarksSummaryDto> getDashboardSummary(
            @AuthenticationPrincipal CustomUserDetails principal) {
        return ResponseEntity.ok(principalRemarksService.getDashboardSummary(principal.getInstitutionId()));
    }

    @GetMapping("/feed")
    @PreAuthorize("hasAuthority('Principal')")
    public ResponseEntity<Page<PrincipalRemarkFeedItemDto>> getRemarksFeed(
            @AuthenticationPrincipal CustomUserDetails principal,
            @RequestParam RemarkTarget scope,
            Pageable pageable) {
        return ResponseEntity.ok(principalRemarksService.getRemarksFeed(principal.getInstitutionId(), scope, pageable));
    }

    @PostMapping("/{id}/resolve")
    @PreAuthorize("hasAuthority('Principal')")
    public ResponseEntity<Void> resolveRemark(
            @AuthenticationPrincipal CustomUserDetails principal,
            @PathVariable UUID id,
            @RequestBody PrincipalRemarkResolveDto resolveDto) {
        principalRemarksService.resolveRemark(principal.getInstitutionId(), id, resolveDto);
        return ResponseEntity.ok().build();
    }
}
