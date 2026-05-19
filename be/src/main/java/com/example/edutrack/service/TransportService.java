package com.example.edutrack.service;

import com.example.edutrack.dto.TransportDashboardDto;
import com.example.edutrack.dto.TransportRouteDto;
import com.example.edutrack.dto.TransportStaffDto;

import java.util.List;
import java.util.UUID;

public interface TransportService {
    TransportDashboardDto getDashboardSummary();
    List<TransportStaffDto> getStaffOnDuty();
    List<TransportStaffDto> getAllStaff();
    void toggleStaffStatus(UUID staffId);
    List<TransportRouteDto> getRoutes();
}
