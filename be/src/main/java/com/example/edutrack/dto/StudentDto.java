package com.example.edutrack.dto;

import java.time.LocalDate;

import com.example.edutrack.entity.enums.StudentStatus;

import lombok.Data;

@Data
public class StudentDto {
    private String studentId;
    private String firstName;
    private String lastName;
    private StudentStatus status;
    private String avatarUrl;
    private String email;
    private String phone;
    private String address;
    private String admissionDate;
    private GaurdianDto guardian;
    private String gender;
    private LocalDate dateOfBirth;
    private boolean isHosteller;
    private float CGPA;
    }
