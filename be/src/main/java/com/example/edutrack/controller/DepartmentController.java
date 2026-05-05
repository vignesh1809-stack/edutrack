package com.example.edutrack.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.edutrack.service.DepartmentService;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @GetMapping("/years")
    public List<Integer> getYears(@RequestParam UUID institutionId) {
        List<Integer> years = departmentService.getDistinctYears(institutionId);
        return years;
    }

    @GetMapping("/sections")
    public List<String> getSections(@RequestParam UUID institutionId, @RequestParam(required = false) Integer year) {
        List<String> sections = departmentService.getDistinctSectionsByYear(institutionId, year);
        return sections;
    }
}
