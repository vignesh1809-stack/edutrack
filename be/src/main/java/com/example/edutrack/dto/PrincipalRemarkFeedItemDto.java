package com.example.edutrack.dto;

import com.example.edutrack.entity.enums.RemarkStatus;
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
public class PrincipalRemarkFeedItemDto {
    private UUID id;
    private String authorName;
    private String authorCode;
    private String academicInfo;
    private String content;
    private String urgency; // Mapped from RemarkPriority
    private LocalDateTime createdAt;
    private RemarkStatus status;
    private String targetStaffName;
}
