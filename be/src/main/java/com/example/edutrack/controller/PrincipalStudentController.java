package com.example.edutrack.controller;

import com.example.edutrack.dto.PagedResponse;
import com.example.edutrack.dto.StudentListDto;
import com.example.edutrack.entity.enums.StudentStatus;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.StudentService;
import com.example.edutrack.dto.StudentProfileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/principal/students")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PrincipalStudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    @PreAuthorize("hasAuthority('Principal')")
    public ResponseEntity<PagedResponse<StudentListDto>> getStudentList(
            @AuthenticationPrincipal CustomUserDetails principal,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) StudentStatus status,
            @RequestParam(required = false) String course,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String section,
            Pageable pageable) {

        Page<StudentListDto> students = studentService.getPrincipalStudentList(
                principal.getInstitutionId(),
                search,
                status,
                course,
                year,
                section,
                pageable
        );
        return ResponseEntity.ok(PagedResponse.fromPage(students));
    }

    @GetMapping("/{studentId}")
    @PreAuthorize("hasAuthority('Principal')")
    public ResponseEntity<StudentProfileDto> getStudentProfile(
            @AuthenticationPrincipal CustomUserDetails principal,
            @PathVariable UUID studentId) {
        return ResponseEntity.ok(studentService.getStudentProfile(principal.getInstitutionId(), studentId));
    }

    @GetMapping("/{studentId}/remarks")
    @PreAuthorize("hasAuthority('Principal')")
    public ResponseEntity<java.util.List<StudentProfileDto.RemarkDto>> getStudentRemarks(
            @AuthenticationPrincipal CustomUserDetails principal,
            @PathVariable UUID studentId) {
        return ResponseEntity.ok(studentService.getStudentRemarks(studentId));
    }

    @GetMapping("/filters/branches")
    @PreAuthorize("hasAuthority('Principal')")
    public ResponseEntity<java.util.List<String>> getFilterBranches(@AuthenticationPrincipal CustomUserDetails principal) {
        return ResponseEntity.ok(studentService.getFilterBranches(principal.getInstitutionId()));
    }

    @GetMapping("/filters/years")
    @PreAuthorize("hasAuthority('Principal')")
    public ResponseEntity<java.util.List<Integer>> getFilterYears(@AuthenticationPrincipal CustomUserDetails principal) {
        return ResponseEntity.ok(studentService.getFilterYears(principal.getInstitutionId()));
    }
}
