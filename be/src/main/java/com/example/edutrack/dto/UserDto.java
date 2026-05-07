package com.example.edutrack.dto;

import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class UserDto {
    private UUID id;
    private String name;
    private String phone;
    private String role;
    private UUID institutionId;
    private String departmentName;
    private String avatarUrl;
}
