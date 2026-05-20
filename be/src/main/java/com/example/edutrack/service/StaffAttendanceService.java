package com.example.edutrack.service;

import com.example.edutrack.dto.StaffAttendanceClassDto;
import com.example.edutrack.dto.AttendanceSubmitRequest;
import com.example.edutrack.dto.StaffAttendanceHistoryDto;
import java.util.UUID;

public interface StaffAttendanceService {
    StaffAttendanceClassDto getStaffAttendanceClass(UUID institutionId, UUID staffId, String dateStr, Integer semester, Integer year, String section, String branch);
    void submitStaffAttendance(UUID institutionId, UUID staffId, AttendanceSubmitRequest request);
    StaffAttendanceHistoryDto getStaffAttendanceHistory(UUID institutionId, UUID staffId, int limit);
}
