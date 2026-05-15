package com.example.edutrack.dto;

public interface StudentDashboardAttendanceSummaryProjection {
    Double getSemesterPercent();
    Double getCurrentMonthPercent();
    Double getPreviousMonthPercent();
    Integer getPresentCount();
    Integer getTotalCount();
}
