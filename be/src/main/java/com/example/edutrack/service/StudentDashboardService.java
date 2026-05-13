package com.example.edutrack.service;

import com.example.edutrack.dto.StudentDashboardDto;
import com.example.edutrack.dto.StudentPortalProfileDto;
import com.example.edutrack.dto.StudentRemarkDto;
import com.example.edutrack.dto.StaffListDto;
import com.example.edutrack.dto.SubmitRemarkRequest;

import java.util.List;
import java.util.UUID;

public interface StudentDashboardService {
    StudentDashboardDto getDashboard(UUID institutionId, UUID studentId, Integer semester);
    StudentPortalProfileDto getStudentProfile(UUID institutionId, UUID studentId);
    List<StudentRemarkDto> getStudentRemarks(UUID institutionId, UUID studentId);
    void submitRemark(UUID institutionId, UUID studentId, SubmitRemarkRequest request);
    List<StaffListDto> getStaffList(UUID institutionId);
}
