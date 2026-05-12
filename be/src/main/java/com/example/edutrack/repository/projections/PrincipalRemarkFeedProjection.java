package com.example.edutrack.repository.projections;

import java.time.LocalDateTime;
import java.util.UUID;

public interface PrincipalRemarkFeedProjection {
    UUID getId();
    String getContent();
    LocalDateTime getCreatedAt();
    String getAuthorName();
    String getAuthorCode();
    String getAcademicInfo();
    String getStatus();
    String getPriority();
    String getCategory();
    String getTargetStaffName();
}
