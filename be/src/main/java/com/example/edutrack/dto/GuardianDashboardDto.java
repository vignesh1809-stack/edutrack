package com.example.edutrack.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class GuardianDashboardDto {
    private List<ChildMinimalDto> children;
    private StudentDashboardDto selectedChildData;

    @Data
    @Builder
    public static class ChildMinimalDto {
        private UUID id;
        private String name;
        private String photo;
        private String grade;
        private String section;
        private boolean active;
    }
}
