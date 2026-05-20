package com.example.edutrack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceSubmitRequest {
    private String recordDate;
    private Integer semester;
    private List<StudentAttendanceRecordDto> records;
}
