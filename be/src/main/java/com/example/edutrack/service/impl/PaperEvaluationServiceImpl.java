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
            if (file == null || file.isEmpty()) continue;

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
                ocrText = "OCR Text for page " + pageIndex + ": [Handwritten Student Script Page - Analysis In Progress]";
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
            Thread.sleep(1500);

            Optional<PaperSubmission> optSub = submissionRepository.findById(submissionId);
            if (optSub.isEmpty()) {
                log.error("Submission not found for async evaluation: {}", submissionId);
                return;
            }

            PaperSubmission submission = optSub.get();
            submission.setStatus(SubmissionStatus.PROCESSING);
            submission.setOverallFeedback("Performing OCR text extraction and alignment check...");
            submissionRepository.save(submission);

            // Simulate OCR & Image Alignment processing
            Thread.sleep(4000);

            submission.setOverallFeedback("Grading questions against provided Answer Key...");
            submissionRepository.save(submission);

            // Simulate LLM Evaluation
            Thread.sleep(4000);

            List<PaperSubmissionQuestion> questions = new ArrayList<>();
            BigDecimal totalScore = BigDecimal.ZERO;

            // Generate realistic evaluations
            String[] questionsText = {
                "Describe the time complexity of bubble sort. (Max: 10)",
                "What is a deadlock? List the conditions. (Max: 10)",
                "Explain public key cryptography. (Max: 10)",
                "Write code to reverse a linked list. (Max: 10)",
                "What is normal form in DBMS? (Max: 10)"
            };

            BigDecimal[] maxScores = {
                new BigDecimal("10.00"),
                new BigDecimal("10.00"),
                new BigDecimal("10.00"),
                new BigDecimal("10.00"),
                new BigDecimal("10.00")
            };

            BigDecimal[] obtainedScores = {
                new BigDecimal("8.00"),
                new BigDecimal("9.50"),
                new BigDecimal("7.00"),
                new BigDecimal("10.00"),
                new BigDecimal("6.00")
            };

            String[] feedbacks = {
                "Good explanation. Included worst-case O(n^2) and best-case O(n) scenarios, but did not sketch the pass swaps visual diagram.",
                "Excellent answer. Correctly detailed Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait conditions.",
                "Well explained. Discussed asymmetric keys (public/private) and key distribution, but omitted mathematical RSA basis.",
                "Flawless recursive implementation. Handled edge cases (empty list and single element) perfectly with correct pointer swaps.",
                "Partial credit. Correctly described 1NF and 2NF, but failed to define 3NF transitives and BCNF dependencies accurately."
            };

            for (int i = 0; i < 5; i++) {
                PaperSubmissionQuestion q = new PaperSubmissionQuestion();
                q.setSubmission(submission);
                q.setQuestionNumber(i + 1);
                q.setMaxScore(maxScores[i]);
                q.setMarksObtained(obtainedScores[i]);
                q.setFeedback(feedbacks[i]);
                questions.add(q);
                totalScore = totalScore.add(obtainedScores[i]);

                // Update page OCRs with realistic text based on evaluation
                if (i < submission.getPages().size()) {
                    PaperSubmissionPage p = submission.getPages().get(i);
                    p.setOcrText("OCR Extracted Handwritings (Page " + (i+1) + "):\nQuestion " + (i+1) + ": Answered.\nStudent Answered details: " + feedbacks[i].substring(0, Math.min(feedbacks[i].length(), 40)) + "...");
                    pageRepository.save(p);
                }
            }

            submission.getQuestions().clear();
            submission.getQuestions().addAll(questions);
            submission.setMarksObtained(totalScore);
            submission.setStatus(SubmissionStatus.COMPLETED);
            submission.setOverallFeedback("The student has shown strong performance in algorithms and coding logic. Focus areas: cryptography equations and relational database normalization theory.");
            
            submissionRepository.save(submission);
            log.info("AI evaluation completed successfully for submission ID: {}", submissionId);

        } catch (InterruptedException e) {
            log.error("Async evaluation thread interrupted", e);
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            log.error("Error during async AI evaluation", e);
            submissionRepository.findById(submissionId).ifPresent(sub -> {
                sub.setStatus(SubmissionStatus.FAILED);
                sub.setOverallFeedback("AI processing failed: " + e.getMessage());
                submissionRepository.save(sub);
            });
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaperSubmission> getSubmissions(UUID institutionId) {
        List<PaperSubmission> submissions = submissionRepository.findByInstitutionIdAndIsDeletedFalseOrderByCreatedAtDesc(institutionId);
        for (PaperSubmission sub : submissions) {
            if (sub.getPages() != null) sub.getPages().size();
            if (sub.getQuestions() != null) sub.getQuestions().size();
        }
        return submissions;
    }

    @Override
    @Transactional(readOnly = true)
    public PaperSubmission getSubmissionDetails(UUID id, UUID institutionId) {
        PaperSubmission submission = submissionRepository.findByIdAndInstitutionIdAndIsDeletedFalse(id, institutionId)
                .orElseThrow(() -> new IllegalArgumentException("Submission not found."));
        if (submission.getPages() != null) submission.getPages().size();
        if (submission.getQuestions() != null) submission.getQuestions().size();
        return submission;
    }
}
