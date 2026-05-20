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
public class StaffAttendanceClassDto {
    private String classId;
    private String classLabel;
    private String recordDate;
    private Integer semester;
    private List<StaffAttendanceStudentDto> students;
}
