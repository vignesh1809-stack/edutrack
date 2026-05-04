package com.example.edutrack.service;

import com.example.edutrack.dto.PrincipalDashboardDto;

import java.util.UUID;

public interface PrincipalDashboardService {
    PrincipalDashboardDto getDashboard(UUID institutionId, Integer year, String section);
}
