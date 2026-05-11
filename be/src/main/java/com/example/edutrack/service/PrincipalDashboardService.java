package com.example.edutrack.service;

import com.example.edutrack.dto.DepartmentAverageDto;
import com.example.edutrack.dto.PrincipalDashboardDto;
import com.example.edutrack.dto.StaffPerformanceDto;

import java.util.List;
import java.util.UUID;

public interface PrincipalDashboardService {
    PrincipalDashboardDto getDashboard(UUID institutionId, Integer year, String section, String branch);

    List<DepartmentAverageDto> getDepartmentAverages(UUID institutionId, Integer year, String section);

    List<StaffPerformanceDto> getLeastPerformedStaff(UUID institutionId, Integer year, String section, String branch);
}
