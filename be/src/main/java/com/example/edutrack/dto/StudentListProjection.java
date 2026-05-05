package com.example.edutrack.dto;

import java.util.UUID;

public interface StudentListProjection {
    UUID getId();
    String getStudentId();
    String getFirstName();
    String getLastName();
    String getGender();
    String getStatus();
    String getDepartmentName();
    Integer getBatchYear();
    String getSection();
}
