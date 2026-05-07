package com.example.edutrack.dto;

import java.time.LocalDate;
import java.util.UUID;

import com.example.edutrack.entity.enums.StaffRoles;

import lombok.Data;

@Data
public class StaffDto {

     private UUID id;

    private String first_name;
    private String last_name;
    private StaffRoles role;
    private String email;
    private String phone;
    private String avatar_url;
    private String responsibilities;
    private String departmentName;
    private UUID departmentId;
    private LocalDate last_login;
    private LocalDate created_at;
    
}
