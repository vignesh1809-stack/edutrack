package com.example.edutrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmitRemarkRequest {
    private String targetType; // STAFF, INSTITUTION
    private UUID targetId;     // UUID of staff (if type is STAFF)
    private String category;   // ACADEMIC, MAINTENANCE, IT, etc.
    private String subject;
    private String content;
    private String priority;   // LOW, MEDIUM, HIGH
}
