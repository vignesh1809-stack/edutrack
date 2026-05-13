package com.example.edutrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentRemarkDto {
    private UUID id;
    private String title;
    private LocalDateTime date;
    private String content;
    private boolean isLatest;
    
    private AuthorInfo author;
    private AiSuggestionInfo aiSuggestion;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AuthorInfo {
        private String name;
        private String role;
        private String avatarUrl;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AiSuggestionInfo {
        private String type; // e.g., NEXT_STEPS, IMPROVEMENT
        private String text;
    }
}
