package com.example.edutrack.service;

import com.example.edutrack.dto.AttendanceTrendsDto;

import java.util.UUID;

public interface AttendanceTrendsService {
    AttendanceTrendsDto getTrends(UUID institutionId, int months, Integer year, String branch);
}
