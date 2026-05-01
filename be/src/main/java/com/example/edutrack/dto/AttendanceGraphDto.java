package com.example.edutrack.dto;

import java.time.LocalDate;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceGraphDto {
    private LocalDate date;
    private long presentCount;
    private long totalCount;
    private double percentage;
}
