package com.example.edutrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaffAttendanceStudentDto {
    private String id;
    private String studentId;
    private String name;
    private String gender;
    private String avatarUrl;
    private String status;
    private String attendanceId;
}
