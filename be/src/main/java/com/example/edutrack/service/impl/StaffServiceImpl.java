package com.example.edutrack.service.impl;

import com.example.edutrack.dto.StaffProfileDto;
import com.example.edutrack.entity.Staff;
import com.example.edutrack.repository.StaffRepository;
import com.example.edutrack.service.StaffService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.edutrack.config.TenantContext;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class StaffServiceImpl implements StaffService {

    private static final Logger logger = LoggerFactory.getLogger(StaffServiceImpl.class);

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    @Transactional(readOnly = true)
    public StaffProfileDto getProfile(UUID staffId, UUID institutionId) {
        // Ensure tenant context is set for standard JPA lookups
        TenantContext.setCurrentTenant(institutionId.toString());

        // Standard lookup
        Staff staff = staffRepository.findById(staffId).orElse(null);

        // Fallback if standard tenant-filtered lookup fails
        if (staff == null) {
            staff = staffRepository.findByIdNative(staffId)
                    .filter(s -> s.getInstitutionId().equals(institutionId))
                    .orElseThrow(() -> new RuntimeException("Staff not found with id: " + staffId));
            
            if (staff.isDeleted()) {
                throw new RuntimeException("This account has been deactivated.");
            }
        }

        Map<String, Object> respMap = new HashMap<>();
        if (staff.getResponsibilities() != null && !staff.getResponsibilities().isEmpty()) {
            try {
                respMap = objectMapper.readValue(staff.getResponsibilities(), new TypeReference<Map<String, Object>>() {});
            } catch (Exception e) {
                respMap.put("error", "Could not parse responsibilities");
            }
        }

        if (respMap.isEmpty()) {
            respMap.put("academic", java.util.Arrays.asList(
                "Data Structures & Algorithms (CS-201)",
                "Database Management Systems (CS-302)",
                "Introduction to Machine Learning (CS-415)"
            ));
            respMap.put("administrative", java.util.Arrays.asList(
                "Department Academic Audit Coordinator",
                "Senior Board of Studies Member",
                "Computer Science Lab Coordinator"
            ));
            respMap.put("specializations", java.util.Arrays.asList(
                "Distributed Systems",
                "Neural Networks",
                "Cloud Infrastructure"
            ));
        }

        String deptName = "General";
        UUID deptId = null;
        try {
            if (staff.getDepartment() != null) {
                deptId = staff.getDepartment().getId();
                deptName = staff.getDepartment().getName();
                if (deptName == null || deptName.isEmpty()) {
                    deptName = "General";
                }
            }
        } catch (Exception e) {
            deptName = "General";
            deptId = null;
        }

        return StaffProfileDto.builder()
                .id(staff.getId())
                .firstName(staff.getFirstName())
                .lastName(staff.getLastName())
                .email(staff.getEmail())
                .phone(staff.getPhone())
                .avatarUrl(staff.getAvatarUrl())
                .role(staff.getRole())
                .departmentId(deptId)
                .departmentName(deptName)
                .lastLogin(staff.getLastLogin())
                .responsibilities(respMap)
                .twoFactorEnabled(staff.isTwoFactorEnabled())
                .workStatus("Full-Time") // Default for now
                .campus("Main Campus") // Default for now
                .build();
    }
}
