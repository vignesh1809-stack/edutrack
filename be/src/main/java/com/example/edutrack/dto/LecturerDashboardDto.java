package com.example.edutrack.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class LecturerDashboardDto {
    private String classId;
    private String classLabel;
    private long totalStudents;
    private double classAttendance;
    private double classAvgMarks;
    private long pendingRemarks;

    private double avgStudentMarks;
    private double attendanceRate;

    private List<StudentPerformerDto> performers;
    private List<CourseStatsDto> courses;

    @Data
    @Builder
    public static class StudentPerformerDto {
        private String name;
        private String status;
        private String marks;
        private String statusColor;
        private String image;
        private String gender;
    }

    @Data
    @Builder
    public static class CourseStatsDto {
        private String courseId;
        private String courseName;
        private double avgStudentMarks;
        private double attendanceRate;
    }
}
