package com.example.edutrack.service;

import com.example.edutrack.dto.StudentDashboardDto;

import java.util.UUID;

public interface StudentDashboardService {
    StudentDashboardDto getDashboard(UUID institutionId, UUID studentId, Integer semester);
}
