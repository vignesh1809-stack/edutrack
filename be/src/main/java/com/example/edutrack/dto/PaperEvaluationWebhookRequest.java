package com.example.edutrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaperEvaluationWebhookRequest {

    private UUID submissionId;
    private UUID institutionId;
    private String status;
    private String overallFeedback;
    private BigDecimal maxScore;
    private BigDecimal marksObtained;
    private List<QuestionGradeDto> questions;
    private List<PageOcrDto> pages;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionGradeDto {
        private int questionNumber;
        private BigDecimal maxScore;
        private BigDecimal marksObtained;
        private String feedback;
        private String whatWentWell;
        private String needsImprovement;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PageOcrDto {
        private int pageNumber;
        private String ocrText;
    }
}
