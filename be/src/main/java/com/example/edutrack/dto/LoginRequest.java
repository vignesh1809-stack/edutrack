package com.example.edutrack.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class LoginRequest {
    private UUID institutionId;
    private String phone;
    private String password;
    private String role;
}
