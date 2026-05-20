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
        List<Object> rawYears = departmentRepository.findDistinctBatchYears(institutionId.toString());
        return rawYears.stream()
                .map(obj -> {
                    String str = obj.toString();
                    return Integer.parseInt(str.contains("-") ? str.split("-")[0] : str);
                })
                .collect(java.util.stream.Collectors.toList());
    }

    public List<String> getDistinctSectionsByYear(UUID institutionId, Integer year) {
        if (year == null) {
            return departmentRepository.findAllDistinctSections(institutionId.toString());
        }
        return departmentRepository.findDistinctSectionsByBatchYear(institutionId.toString(), year);
    }

    public List<String> getDistinctNames(UUID institutionId) {
        return departmentRepository.findDistinctNames(institutionId.toString());
    }
}
