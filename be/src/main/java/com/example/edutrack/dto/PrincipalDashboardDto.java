package com.example.edutrack.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PrincipalDashboardDto {

    // ── Student Metrics ──────────────────────────────────────────────────────
    /** Total enrolled (active) students in this institution */
    private long totalStudents;

    /** Number of distinct students who have an attendance record today */
    private long studentsMarkedToday;

    /** Attendance percentage today = (present / total records today) * 100 */
    private double attendancePercentageToday;

    // ── Bus Metrics ───────────────────────────────────────────────────────────
    /** Total buses registered for this institution */
    private long totalBuses;

    /** Distinct buses that have an arrival log entry for today */
    private long busesArrivedToday;

    // ── Remarks Metrics ───────────────────────────────────────────────────────
    /** Remarks submitted today (campus feedback from students) */
    private long remarksSubmittedToday;

    /** All-time total remarks for this institution */
    private long totalRemarks;

    /** Latest remarks feed (up to 5 most recent) */
    private List<RemarkSummaryDto> latestRemarks;


    // ── Nested DTO ────────────────────────────────────────────────────────────
    @Data
    @Builder
    public static class RemarkSummaryDto {
        private String id;
        private String content;
        private String studentName;
        private String studentCode;
        private String createdAt;
    }
}
