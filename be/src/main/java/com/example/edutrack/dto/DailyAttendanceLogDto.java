package com.example.edutrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyAttendanceLogDto {
    private String date;
    private long totalStudents;
    private long presentCount;
    private long absentCount;
    private long lateCount;
    private double presentRate;
}
