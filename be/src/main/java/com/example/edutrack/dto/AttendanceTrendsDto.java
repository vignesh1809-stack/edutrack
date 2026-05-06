package com.example.edutrack.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AttendanceTrendsDto {

    /** Ordered month labels, e.g. ["Nov", "Dec", "Jan", ...] */
    private List<String> months;

    /** One entry per branch/department code */
    private List<SeriesDto> series;

    @Data
    @Builder
    public static class SeriesDto {
        private String label;           // Branch code, e.g. "CSE"
        private List<Double> data;      // Attendance % per month (same order as months[])
    }
}
