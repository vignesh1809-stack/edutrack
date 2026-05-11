package com.example.edutrack.service;

import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.edutrack.entity.Student;

import com.example.edutrack.dto.StudentListDto;
import com.example.edutrack.dto.StudentProfileDto;
import com.example.edutrack.entity.enums.StudentStatus;

public interface StudentService {

        Page<Student> getAllStudents(Pageable pageable);
        Page<StudentListDto> getPrincipalStudentList(UUID institutionId, String search, StudentStatus status, String course, Integer batchYear, String section, Pageable pageable);
        java.util.List<String> getFilterBranches(UUID institutionId);
        java.util.List<Integer> getFilterYears(UUID institutionId);
        Student getStudentById(UUID id);
    StudentProfileDto getStudentProfile(UUID institutionId, UUID studentId);
    java.util.List<StudentProfileDto.RemarkDto> getStudentRemarks(UUID studentId);
    Student create(Student student);
        Student update(UUID id, Student student);
        void delete(UUID id);
}
