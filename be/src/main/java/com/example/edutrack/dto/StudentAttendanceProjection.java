package com.example.edutrack.dto;

public interface StudentAttendanceProjection {
    String getStudentId();
    String getFirstName();
    String getLastName();
    Integer getTotalDays();
    Integer getPresents();
    Double getPercentage();
    Integer getMonth0();
    Integer getMonth1();
    Integer getMonth2();
    Integer getMonth3();
    Integer getMonth4();
    Integer getMonth5();
}
