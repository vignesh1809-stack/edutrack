package com.example.edutrack.repository;

public interface BranchMonthlyAttendanceProjection {
    String getBranchCode();
    Integer getYr();
    Integer getMo();
    Long getPresentCount();
    Long getTotalCount();
}
