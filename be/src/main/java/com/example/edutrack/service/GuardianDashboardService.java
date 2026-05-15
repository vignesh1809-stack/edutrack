package com.example.edutrack.service;

import com.example.edutrack.dto.GuardianDashboardDto;
import com.example.edutrack.dto.StudentDashboardDto;
import java.util.UUID;

public interface GuardianDashboardService {
    GuardianDashboardDto getDashboard(UUID institutionId, UUID guardianId, UUID selectedStudentId, Integer semester);
    StudentDashboardDto.AttendanceSummary getAttendance(UUID institutionId, UUID guardianId, UUID selectedStudentId, Integer semester);
    StudentDashboardDto.FinancialSummary getFees(UUID institutionId, UUID guardianId, UUID selectedStudentId);
}
