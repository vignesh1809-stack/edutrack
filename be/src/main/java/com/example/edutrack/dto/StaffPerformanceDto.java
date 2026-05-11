package com.example.edutrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaffPerformanceDto {
    private String staffId;
    private String staffName;
    private String subject;
    private String department;
    private double performanceScore;
    private String role;
}
