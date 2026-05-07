package com.example.edutrack.service;

import com.example.edutrack.dto.StaffProfileDto;
import java.util.UUID;

public interface StaffService {
    StaffProfileDto getProfile(UUID staffId, UUID institutionId);
}
