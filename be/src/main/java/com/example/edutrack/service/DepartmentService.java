package com.example.edutrack.service;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.edutrack.repository.DepartmentRepository;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Integer> getDistinctYears(UUID institutionId) {
        return departmentRepository.findDistinctBatchYears(institutionId.toString());
    }

    public List<String> getDistinctSectionsByYear(UUID institutionId, Integer year) {
        if (year == null) {
            return departmentRepository.findAllDistinctSections(institutionId.toString());
        }
        return departmentRepository.findDistinctSectionsByBatchYear(institutionId.toString(), year);
    }
}
