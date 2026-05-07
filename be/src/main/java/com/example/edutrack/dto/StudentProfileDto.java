package com.example.edutrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileDto {
    private StudentIdentity identity;
    private List<SemesterPerformance> performance;
    private AttendanceSummary attendance;
    private FinancialSummary financials;
    private List<RemarkDto> remarks;
    private ContactDetails contact;

    @Data
    @Builder
    public static class StudentIdentity {
        private UUID id;
        private String studentId;
        private String firstName;
        private String lastName;
        private String status;
        private String avatarUrl;
        private String major;
        private String section;
        private int currentSemester;
    }

    @Data
    @Builder
    public static class SemesterPerformance {
        private String label; // "Sem 1", "Sem 2", etc.
        private double score;
        private String height; // Percentage string for CSS
    }

    @Data
    @Builder
    public static class AttendanceSummary {
        private double percentage;
        private int presents;
        private int totalDays;
    }

    @Data
    @Builder
    public static class FinancialSummary {
        private BigDecimal pendingAmount;
        private LocalDate dueDate;
    }

    @Data
    @Builder
    public static class RemarkDto {
        private String authorName;
        private String authorRole;
        private String content;
        private LocalDate date;
        private String type; // "Staff", "Guardian", "Parent"
    }

    @Data
    @Builder
    public static class ContactDetails {
        private String phone;
        private String email;
        private String address;
        private String guardianName;
        private String guardianRelation;
    }
}
