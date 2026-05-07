package com.example.edutrack.dto;

public interface StudentProfileProjection {
    String getId();
    String getStudentId();
    String getFirstName();
    String getLastName();
    String getStatus();
    String getGender();
    String getDepartmentName();
    String getSection();
    Integer getCurrentSemester();
    String getPhone();
    String getEmail();
    String getAddress();
}
