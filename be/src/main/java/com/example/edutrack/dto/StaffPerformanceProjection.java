package com.example.edutrack.dto;

import java.util.UUID;

public interface StaffPerformanceProjection {
    String getStaffId();
    String getStaffName();
    String getSubject();
    String getDepartment();
    Double getPerformanceScore();
    String getRole();
}
