package com.example.edutrack.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class StudentDashboardDto {
    private Meta meta;
    private DashboardData data;

    @Data
    @Builder
    public static class Meta {
        private LocalDateTime generatedAt;
        private Integer semester;
    }

    @Data
    @Builder
    public static class DashboardData {
        private StudentInfo student;
        private WelcomeInfo welcome;
        private AcademicSummary academicSummary;
        private AttendanceSummary attendance;
        private RankSummary ranks;
        private UpcomingExam upcomingExam;
        private RemarksSummary remarksSummary;
    }

    @Data
    @Builder
    public static class StudentInfo {
        private UUID id;
        private String name;
        private String studentId;
        private String department;
        private String section;
        private Integer currentSemester;
    }

    @Data
    @Builder
    public static class WelcomeInfo {
        private String title;
    }

    @Data
    @Builder
    public static class AcademicSummary {
        private Integer semester;
        private Double gpa;
        private List<SubjectSummary> topSubjects;
    }

    @Data
    @Builder
    public static class SubjectSummary {
        private String courseName;
        private String grade;
        private Double scorePercent;
    }

    @Data
    @Builder
    public static class AttendanceSummary {
        private Double semesterPercent;
        private Double trendPercentVsLastMonth;
        private List<AttendanceBar> weeklyBars;
    }

    @Data
    @Builder
    public static class AttendanceBar {
        private String day;
        private Double percent;
    }

    @Data
    @Builder
    public static class RankSummary {
        private Integer marksRank;
        private Integer attendanceRank;
        private Integer cohortSize;
    }

    @Data
    @Builder
    public static class UpcomingExam {
        private String examId;
        private String title;
        private String examDate;
        private Integer daysRemaining;
    }

    @Data
    @Builder
    public static class RemarksSummary {
        private Long pendingCount;
        private LocalDateTime latestRemarkAt;
    }
}
