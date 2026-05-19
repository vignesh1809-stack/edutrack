package com.example.edutrack.service.impl;

import com.example.edutrack.dto.GuardianDashboardDto;
import com.example.edutrack.dto.StudentDashboardDto;
import com.example.edutrack.entity.Guardian;
import com.example.edutrack.entity.Student;
import com.example.edutrack.repository.GuardianRepository;
import com.example.edutrack.service.GuardianDashboardService;
import com.example.edutrack.service.StudentDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GuardianDashboardServiceImpl implements GuardianDashboardService {

    @Autowired
    private GuardianRepository guardianRepository;

    @Autowired
    private StudentDashboardService studentDashboardService;

    @Override
    @Transactional(readOnly = true)
    public GuardianDashboardDto getDashboard(UUID institutionId, UUID guardianId, UUID selectedStudentId, Integer semester) {
        Guardian guardian = guardianRepository.findByIdNative(guardianId, institutionId)
                .orElseThrow(() -> new RuntimeException("Guardian not found"));

        List<Student> students = guardian.getStudents();
        if (students == null || students.isEmpty()) {
            return GuardianDashboardDto.builder()
                    .children(List.of())
                    .selectedChildData(null)
                    .build();
        }

        // Map children to minimal DTOs
        List<GuardianDashboardDto.ChildMinimalDto> childrenMinimal = students.stream()
                .map(s -> GuardianDashboardDto.ChildMinimalDto.builder()
                        .id(s.getId())
                        .name(s.getFirstName() + " " + s.getLastName())
                        .photo(s.getAvatarUrl())
                        .grade("YEAR " + ((s.getCurrentSemester() + 1) / 2))
                        .section(s.getSchoolClass() != null ? s.getSchoolClass().getSection() : "A")
                        .active(selectedStudentId != null ? s.getId().equals(selectedStudentId) : s.getId().equals(students.get(0).getId()))
                        .build())
                .collect(Collectors.toList());

        // Determine which student to fetch data for
        UUID studentToFetchId = selectedStudentId != null ? selectedStudentId : students.get(0).getId();
        
        // Fetch detailed dashboard data using existing student dashboard service
        StudentDashboardDto childDashboardData = studentDashboardService.getDashboard(institutionId, studentToFetchId, semester);
        
        // Fetch latest remarks for the selected child
        List<com.example.edutrack.dto.StudentRemarkDto> remarks = studentDashboardService.getStudentRemarks(institutionId, studentToFetchId);

        return GuardianDashboardDto.builder()
                .children(childrenMinimal)
                .selectedChildData(childDashboardData)
                .latestRemarks(remarks.stream().limit(5).collect(Collectors.toList()))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public StudentDashboardDto.AttendanceSummary getAttendance(UUID institutionId, UUID guardianId, UUID selectedStudentId, Integer semester) {
        Guardian guardian = guardianRepository.findByIdNative(guardianId, institutionId)
                .orElseThrow(() -> new RuntimeException("Guardian not found"));

        if (guardian.getStudents() == null || guardian.getStudents().isEmpty()) {
            return null;
        }

        UUID studentId = selectedStudentId != null ? selectedStudentId : guardian.getStudents().get(0).getId();
        StudentDashboardDto dashboard = studentDashboardService.getDashboard(institutionId, studentId, semester);
        return (dashboard != null && dashboard.getData() != null) ? dashboard.getData().getAttendance() : null;
    }

    @Override
    @Transactional(readOnly = true)
    public StudentDashboardDto.FinancialSummary getFees(UUID institutionId, UUID guardianId, UUID selectedStudentId) {
        Guardian guardian = guardianRepository.findByIdNative(guardianId, institutionId)
                .orElseThrow(() -> new RuntimeException("Guardian not found"));

        if (guardian.getStudents() == null || guardian.getStudents().isEmpty()) {
            return null;
        }

        UUID studentId = selectedStudentId != null ? selectedStudentId : guardian.getStudents().get(0).getId();
        StudentDashboardDto dashboard = studentDashboardService.getDashboard(institutionId, studentId, null);
        return (dashboard != null && dashboard.getData() != null) ? dashboard.getData().getFinancials() : null;
    }
}
