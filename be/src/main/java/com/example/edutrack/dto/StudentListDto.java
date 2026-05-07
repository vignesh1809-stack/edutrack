package com.example.edutrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentListDto {
    private String id; // This will be the UUID for navigation
    private String studentId; // Human readable ID
    private String name;
    private String roll;
    private String image;
    private String status;
    private List<String> courseDetails;
    private String attendance;
    private String avgMarks;
    private String cgpa;
}
