package com.example.edutrack.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class StudentSubjectAnalysisDto {
    private UUID submissionId;
    private String courseName;
    private String examType;
    private String academicYear;
    private Double score;
    private Double maxScore;
    private String grade;
    private Double classAverage;
    private String overallFeedback;
    private String feedbackStatus; // e.g. "High Distinction", "First Class", "Action Required"
    
    private List<StrengthInfo> strengths;
    private List<QuestionBreakdownInfo> questions;

    @Data
    @Builder
    public static class StrengthInfo {
        private String title;
        private String icon;
        private String desc;
    }

    @Data
    @Builder
    public static class QuestionBreakdownInfo {
        private String q;
        private String area;
        private String score; // e.g. "10/10"
        private String status; // e.g. "Full Marks", "High Pass", "Action Required"
        private String type; // "success" or "error"
        private String well;
        private String improve;
    }
}
