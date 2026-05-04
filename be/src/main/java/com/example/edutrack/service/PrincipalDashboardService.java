package com.example.edutrack.service;

import com.example.edutrack.dto.PrincipalDashboardDto;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.edutrack.dto.PrincipalStudentListDto;

public interface PrincipalDashboardService {
    PrincipalDashboardDto getDashboard(UUID institutionId, Integer year, String section);
    Page<PrincipalStudentListDto> getStudentsList(UUID institutionId, String search, String statusFilter, Pageable pageable);
}
