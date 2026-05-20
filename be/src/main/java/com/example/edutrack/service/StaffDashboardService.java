package com.example.edutrack.service;

import com.example.edutrack.dto.AttendanceGraphDto;
import com.example.edutrack.dto.LecturerDashboardDto;
import java.util.List;
import java.util.UUID;

public interface StaffDashboardService {
    List<AttendanceGraphDto> getAttendanceGraph(UUID institutionId, int days, Integer year, String section);
    LecturerDashboardDto getLecturerDashboard(UUID institutionId, UUID staffId, String courseId);
}
