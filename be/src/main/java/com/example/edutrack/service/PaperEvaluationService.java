package com.example.edutrack.service;

import com.example.edutrack.entity.PaperSubmission;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface PaperEvaluationService {

    PaperSubmission createSubmission(UUID studentId, UUID courseId, String examType, 
                                     String academicYear, String section, 
                                     List<MultipartFile> files, MultipartFile questionPaper, 
                                     MultipartFile answerKey, UUID institutionId) throws IOException;

    void evaluateAsync(UUID submissionId);

    List<PaperSubmission> getSubmissions(UUID institutionId);

    PaperSubmission getSubmissionDetails(UUID id, UUID institutionId);

    void handleEvaluationWebhook(com.example.edutrack.dto.PaperEvaluationWebhookRequest request);
}
