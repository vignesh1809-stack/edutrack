package com.example.edutrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrincipalRemarksSummaryDto {
    private double resolutionRate;
    private double trendPercentage;
    private long staffRemarksCount;
    private long campusRemarksCount;
}
