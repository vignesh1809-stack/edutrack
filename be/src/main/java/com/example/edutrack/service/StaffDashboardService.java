package com.example.edutrack.service;

import com.example.edutrack.dto.AttendanceGraphDto;
import java.util.List;
import java.util.UUID;

public interface StaffDashboardService {
    List<AttendanceGraphDto> getAttendanceGraph(UUID institutionId, int days);
}
