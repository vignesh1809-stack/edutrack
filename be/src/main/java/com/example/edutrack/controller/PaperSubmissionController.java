package com.example.edutrack.controller;

import com.example.edutrack.entity.PaperSubmission;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.service.PaperEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/staff/papers")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PaperSubmissionController {

    @Autowired
    private PaperEvaluationService evaluationService;

    @Autowired
    private com.example.edutrack.repository.StudentRepository studentRepository;

    @Autowired
    private com.example.edutrack.repository.CoursesRepository coursesRepository;

    @GetMapping("/students")
    @PreAuthorize("hasAnyAuthority('Administrator', 'Lecturer', 'Head_of_Department', 'Principal')")
    public ResponseEntity<List<java.util.Map<String, Object>>> getStudents(
            @AuthenticationPrincipal CustomUserDetails principal) {
        List<com.example.edutrack.entity.Student> students = studentRepository.findByInstitutionIdAndIsDeletedFalse(principal.getInstitutionId());
        List<java.util.Map<String, Object>> result = students.stream().map(s -> {
            java.util.Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", s.getId());
            map.put("studentId", s.getStudentId());
            map.put("firstName", s.getFirstName());
            map.put("lastName", s.getLastName());
            map.put("section", s.getSchoolClass() != null ? s.getSchoolClass().getSection() : "A");
            return map;
        }).collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/courses")
    @PreAuthorize("hasAnyAuthority('Administrator', 'Lecturer', 'Head_of_Department', 'Principal')")
    public ResponseEntity<List<java.util.Map<String, Object>>> getCourses(
            @AuthenticationPrincipal CustomUserDetails principal) {
        List<com.example.edutrack.entity.Courses> courses = coursesRepository.findByInstitutionIdAndIsDeletedFalse(principal.getInstitutionId());
        List<java.util.Map<String, Object>> result = courses.stream().map(c -> {
            java.util.Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", c.getId());
            map.put("courseName", c.getCourseName());
            map.put("semester", c.getSemester());
            return map;
        }).collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/submit")
    @PreAuthorize("hasAnyAuthority('Administrator', 'Lecturer', 'Head_of_Department', 'Principal')")
    public ResponseEntity<PaperSubmission> submitPaper(
            @RequestParam("studentId") UUID studentId,
            @RequestParam(value = "courseId", required = false) UUID courseId,
            @RequestParam("examType") String examType,
            @RequestParam("academicYear") String academicYear,
            @RequestParam("section") String section,
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam(value = "questionPaper", required = false) MultipartFile questionPaper,
            @RequestParam(value = "answerKey", required = false) MultipartFile answerKey,
            @AuthenticationPrincipal CustomUserDetails principal) throws IOException {

        PaperSubmission submission = evaluationService.createSubmission(
                studentId, courseId, examType, academicYear, section, 
                files, questionPaper, answerKey, principal.getInstitutionId()
        );
        return ResponseEntity.ok(submission);
    }

    @GetMapping("/submissions")
    @PreAuthorize("hasAnyAuthority('Administrator', 'Lecturer', 'Head_of_Department', 'Principal')")
    public ResponseEntity<List<PaperSubmission>> getSubmissions(
            @AuthenticationPrincipal CustomUserDetails principal) {
        
        List<PaperSubmission> submissions = evaluationService.getSubmissions(principal.getInstitutionId());
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/submissions/{id}")
    @PreAuthorize("hasAnyAuthority('Administrator', 'Lecturer', 'Head_of_Department', 'Principal')")
    public ResponseEntity<PaperSubmission> getSubmissionDetails(
            @PathVariable UUID id,
            @AuthenticationPrincipal CustomUserDetails principal) {
        
        PaperSubmission submission = evaluationService.getSubmissionDetails(id, principal.getInstitutionId());
        return ResponseEntity.ok(submission);
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(
            @RequestBody com.example.edutrack.dto.PaperEvaluationWebhookRequest payload) {
        evaluationService.handleEvaluationWebhook(payload);
        return ResponseEntity.ok("Webhook processed successfully.");
    }
}
