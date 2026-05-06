package com.example.edutrack.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DepartmentAverageDto {
    private String department;
    private Double averagePercentage;
    private Double previousPercentage; // Nullable if "All Years" is selected
    private Double trend; // Positive or negative difference
}
