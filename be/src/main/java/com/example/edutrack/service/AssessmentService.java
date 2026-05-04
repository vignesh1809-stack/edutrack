package com.example.edutrack.service;

import com.example.edutrack.dto.AssessmentDistributionDto;
import java.util.List;
import java.util.UUID;

public interface AssessmentService {
    List<String> getDistinctAssessmentTypes(UUID institutionId, Integer year, String section);
    List<AssessmentDistributionDto> getMarksDistribution(UUID institutionId, String type, Integer year, String section);
}
