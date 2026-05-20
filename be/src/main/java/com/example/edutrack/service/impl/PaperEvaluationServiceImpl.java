package com.example.edutrack.service.impl;

import com.example.edutrack.entity.*;
import com.example.edutrack.entity.enums.SubmissionStatus;
import com.example.edutrack.repository.PaperSubmissionPageRepository;
import com.example.edutrack.repository.PaperSubmissionRepository;
import com.example.edutrack.repository.StudentRepository;
import com.example.edutrack.repository.CoursesRepository;
import com.example.edutrack.service.PaperEvaluationService;
import com.example.edutrack.service.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class PaperEvaluationServiceImpl implements PaperEvaluationService {

    @Autowired
    private PaperSubmissionRepository submissionRepository;

    @Autowired
    private PaperSubmissionPageRepository pageRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CoursesRepository coursesRepository;

    @Autowired
    private StorageService storageService;

    @Autowired
    private com.fasterxml.jackson.databind.ObjectMapper objectMapper;

    @Override
    @Transactional
    public PaperSubmission createSubmission(UUID studentId, UUID courseId, String examType,
            String academicYear, String section,
            List<MultipartFile> files, MultipartFile questionPaper,
            MultipartFile answerKey, UUID institutionId) throws IOException {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found."));

        Courses course = null;
        if (courseId != null) {
            course = coursesRepository.findById(courseId).orElse(null);
        }

        PaperSubmission submission = new PaperSubmission();
        submission.setInstitutionId(institutionId);
        submission.setStudent(student);
        submission.setCourse(course);
        submission.setExamType(examType);
        submission.setAcademicYear(academicYear);
        submission.setSection(section);
        submission.setStatus(SubmissionStatus.PENDING);
        submission.setMaxScore(new BigDecimal("50.00"));
        submission.setMarksObtained(BigDecimal.ZERO);
        submission.setOverallFeedback("Evaluation pending...");
        submission.setDeleted(false);

        if (questionPaper != null && !questionPaper.isEmpty()) {
            submission.setQuestionPaperUrl(storageService.store(questionPaper));
        }
        if (answerKey != null && !answerKey.isEmpty()) {
            submission.setAnswerKeyUrl(storageService.store(answerKey));
        }

        // Save submission first to get ID
        submission = submissionRepository.save(submission);

        List<PaperSubmissionPage> pages = new ArrayList<>();
        int pageIndex = 1;
        for (MultipartFile file : files) {
            if (file == null || file.isEmpty())
                continue;

            String fileUrl = storageService.store(file);
            byte[] fileBytes = file.getBytes();
            String md5Hash = DigestUtils.md5DigestAsHex(fileBytes);

            // OCR Cache implementation
            List<PaperSubmissionPage> cachedPages = pageRepository.findByMd5Hash(md5Hash);
            String ocrText;
            if (!cachedPages.isEmpty()) {
                log.info("OCR cache HIT for file MD5: {}", md5Hash);
                ocrText = cachedPages.get(0).getOcrText();
            } else {
                log.info("OCR cache MISS for file MD5: {}", md5Hash);
                ocrText = "OCR Text for page " + pageIndex
                        + ": [Handwritten Student Script Page - Analysis In Progress]";
            }

            PaperSubmissionPage page = new PaperSubmissionPage();
            page.setSubmission(submission);
            page.setPageNumber(pageIndex++);
            page.setImageUrl(fileUrl);
            page.setMd5Hash(md5Hash);
            page.setOcrText(ocrText);

            pages.add(page);
        }

        submission.getPages().clear();
        submission.getPages().addAll(pages);
        submission = submissionRepository.save(submission);

        // Trigger Async Evaluation Task
        evaluateAsync(submission.getId());

        return submission;
    }

    @Override
    @Async
    @Transactional
    public void evaluateAsync(UUID submissionId) {
        log.info("Starting asynchronous AI evaluation for submission ID: {}", submissionId);
        try {
            // Give time for creation transaction to commit
            Thread.sleep(1000);

            Optional<PaperSubmission> optSub = submissionRepository.findById(submissionId);
            if (optSub.isEmpty()) {
                log.error("Submission not found for async evaluation: {}", submissionId);
                return;
            }

            PaperSubmission submission = optSub.get();
            submission.setStatus(SubmissionStatus.PROCESSING);
            submission.setOverallFeedback("Offloading evaluation payload to Python VLM service...");
            submissionRepository.save(submission);

            // Prepare HTTP payload for Python FastAPI service
            java.util.Map<String, Object> payload = new java.util.HashMap<>();
            payload.put("submissionId", submission.getId().toString());
            payload.put("studentId", submission.getStudent().getId().toString());
            payload.put("courseName",
                    submission.getCourse() != null ? submission.getCourse().getCourseName() : "General");
            payload.put("examType", submission.getExamType());
            payload.put("questionPaperUrl", submission.getQuestionPaperUrl());
            payload.put("answerKeyUrl", submission.getAnswerKeyUrl());
            payload.put("callbackUrl", "http://localhost:8080/api/staff/papers/webhook");

            List<String> pageUrls = new ArrayList<>();
            for (PaperSubmissionPage page : submission.getPages()) {
                pageUrls.add(page.getImageUrl());
            }
            payload.put("scriptPageUrls", pageUrls);

            // Trigger REST handshake to Python AI Service (Port 8000)
            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
            String requestBody = objectMapper.writeValueAsString(payload);
            java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder()
                    .uri(java.net.URI.create("http://localhost:8000/api/v1/evaluate"))
                    .header("Content-Type", "application/json")
                    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            log.info("Dispatching grading request to Python service: {}", requestBody);
            client.sendAsync(request, java.net.http.HttpResponse.BodyHandlers.ofString())
                    .thenAccept(response -> {
                        log.info("Python AI microservice handoff completed. Response status: {}",
                                response.statusCode());
                    })
                    .exceptionally(ex -> {
                        log.error("Failed to connect to Python FastAPI microservice: {}", ex.getMessage());
                        // Fallback to FAILED status
                        try {
                            markEvaluationFailed(submissionId, "AI Microservice Connection Failed: " + ex.getMessage());
                        } catch (Exception err) {
                            log.error("Error setting failed status", err);
                        }
                        return null;
                    });

        } catch (Exception e) {
            log.error("Error initiating async AI evaluation", e);
            markEvaluationFailed(submissionId, "Initialization failed: " + e.getMessage());
        }
    }

    private void markEvaluationFailed(UUID submissionId, String reason) {
        submissionRepository.findById(submissionId).ifPresent(sub -> {
            sub.setStatus(SubmissionStatus.FAILED);
            sub.setOverallFeedback(reason);
            submissionRepository.save(sub);
        });
    }

    @Override
    @Transactional
    public void handleEvaluationWebhook(com.example.edutrack.dto.PaperEvaluationWebhookRequest request) {
        log.info("Received AI evaluation callback for submission ID: {}", request.getSubmissionId());

        PaperSubmission submission = submissionRepository.findById(request.getSubmissionId())
                .orElseThrow(() -> new IllegalArgumentException("Submission not found: " + request.getSubmissionId()));

        if ("FAILED".equalsIgnoreCase(request.getStatus())) {
            submission.setStatus(SubmissionStatus.FAILED);
            submission.setOverallFeedback(request.getOverallFeedback());
            submissionRepository.save(submission);
            return;
        }

        submission.setStatus(SubmissionStatus.COMPLETED);
        submission.setOverallFeedback(request.getOverallFeedback());
        submission.setMaxScore(request.getMaxScore());
        submission.setMarksObtained(request.getMarksObtained());

        // Update parsed OCR texts matching page numbers
        if (request.getPages() != null) {
            for (com.example.edutrack.dto.PaperEvaluationWebhookRequest.PageOcrDto pDto : request.getPages()) {
                for (PaperSubmissionPage page : submission.getPages()) {
                    if (page.getPageNumber() == pDto.getPageNumber()) {
                        page.setOcrText(pDto.getOcrText());
                        pageRepository.save(page);
                    }
                }
            }
        }

        // Populates parsed Question breaks
        List<PaperSubmissionQuestion> questions = new ArrayList<>();
        if (request.getQuestions() != null) {
            for (com.example.edutrack.dto.PaperEvaluationWebhookRequest.QuestionGradeDto qDto : request
                    .getQuestions()) {
                PaperSubmissionQuestion q = new PaperSubmissionQuestion();
                q.setSubmission(submission);
                q.setQuestionNumber(qDto.getQuestionNumber());
                q.setMaxScore(qDto.getMaxScore());
                q.setMarksObtained(qDto.getMarksObtained());
                q.setFeedback(qDto.getFeedback());
                questions.add(q);
            }
        }

        submission.getQuestions().clear();
        submission.getQuestions().addAll(questions);
        submissionRepository.save(submission);

        log.info("AI evaluation successfully saved to MySQL. Job ID: {}", submission.getId());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaperSubmission> getSubmissions(UUID institutionId) {
        List<PaperSubmission> submissions = submissionRepository
                .findByInstitutionIdAndIsDeletedFalseOrderByCreatedAtDesc(institutionId);
        for (PaperSubmission sub : submissions) {
            if (sub.getPages() != null)
                sub.getPages().size();
            if (sub.getQuestions() != null)
                sub.getQuestions().size();
        }
        return submissions;
    }

    @Override
    @Transactional(readOnly = true)
    public PaperSubmission getSubmissionDetails(UUID id, UUID institutionId) {
        PaperSubmission submission = submissionRepository.findByIdAndInstitutionIdAndIsDeletedFalse(id, institutionId)
                .orElseThrow(() -> new IllegalArgumentException("Submission not found."));
        if (submission.getPages() != null)
            submission.getPages().size();
        if (submission.getQuestions() != null)
            submission.getQuestions().size();
        return submission;
    }
}
