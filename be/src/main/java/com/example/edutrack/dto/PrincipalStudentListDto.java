package com.example.edutrack.dto;

import lombok.Data;
import java.util.List;

@Data
public class PrincipalStudentListDto {
    private String id;
    private String name;
    private String roll;
    private String image;
    private String status;
    private String statusToken;
    private List<String> courseDetails;
    private String attendance;
    private String avgMarks;
    private String borderStyle;
    private String actionBtn;
    private String actionStyle;
    private String attendBg;
    private String attendText;
}
