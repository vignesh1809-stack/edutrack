package com.example.edutrack.service;

import com.example.edutrack.dto.DepartmentAverageDto;
import com.example.edutrack.dto.PrincipalDashboardDto;

import java.util.List;
import java.util.UUID;

public interface PrincipalDashboardService {
    PrincipalDashboardDto getDashboard(UUID institutionId, Integer year, String section, String branch);

    List<DepartmentAverageDto> getDepartmentAverages(UUID institutionId, Integer year, String section);
}
