package com.example.edutrack.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TransportDashboardDto {
    private long totalBuses;
    private long activeTransit;
    private long inWorkshop;
    private long efficiencyScore;
}
