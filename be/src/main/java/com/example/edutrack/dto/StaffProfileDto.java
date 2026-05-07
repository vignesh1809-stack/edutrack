package com.example.edutrack.dto;

import com.example.edutrack.entity.enums.StaffRoles;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaffProfileDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String avatarUrl;
    private StaffRoles role;
    private UUID departmentId;
    private String departmentName;
    private LocalDateTime lastLogin;
    private Map<String, Object> responsibilities; // Parsed JSON
    private boolean twoFactorEnabled;
    private String workStatus; // Hardcoded or dynamic
    private String campus; // Hardcoded
}
