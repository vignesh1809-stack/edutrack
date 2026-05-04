package com.example.edutrack.service.impl;

import com.example.edutrack.dto.AssessmentDistributionDto;
import com.example.edutrack.repository.AssessmentRepository;
import com.example.edutrack.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AssessmentServiceImpl implements AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Override
    public List<String> getDistinctAssessmentTypes(UUID institutionId, Integer year, String section) {
        return assessmentRepository.findDistinctTypesFiltered(institutionId, year, section);
    }

    @Override
    public List<AssessmentDistributionDto> getMarksDistribution(UUID institutionId, String type, Integer year, String section) {
        List<Double> percentages = assessmentRepository.findMarksPercentagesFiltered(institutionId, type, year, section);
        
        int aPlus = 0, a = 0, b = 0, c = 0, d = 0;
        int total = percentages.size();

        for (Double p : percentages) {
            if (p >= 90) aPlus++;
            else if (p >= 80) a++;
            else if (p >= 70) b++;
            else if (p >= 60) c++;
            else d++;
        }

        List<AssessmentDistributionDto> result = new ArrayList<>();
        result.add(createDto("A+ 90+", aPlus, total, "primary"));
        result.add(createDto("A 80-89", a, total, "primary"));
        result.add(createDto("B 70-79", b, total, "tertiary"));
        result.add(createDto("C 60-69", c, total, "secondary"));
        result.add(createDto("D <60", d, total, "error"));

        return result;
    }

    private AssessmentDistributionDto createDto(String grade, int count, int total, String color) {
        int percent = total > 0 ? (int) Math.round((double) count / total * 100) : 0;
        return AssessmentDistributionDto.builder()
                .grade(grade)
                .percent(percent)
                .width(percent + "%")
                .color(color)
                .build();
    }
}
