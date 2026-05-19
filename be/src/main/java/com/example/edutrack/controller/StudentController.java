package com.example.edutrack.controller;

import org.springframework.web.bind.annotation.*;

import com.example.edutrack.entity.Student;
import com.example.edutrack.service.StudentService;

import lombok.Data;

import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.edutrack.dto.PagedResponse;

@RestController
@RequestMapping("/students")
@Data
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public PagedResponse<Student> getAllStudents(Pageable pageable) {
        return PagedResponse.fromPage(studentService.getAllStudents(pageable));
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable UUID id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.create(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable UUID id, @RequestBody Student student) {
        return studentService.update(id, student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable UUID id) {
        studentService.delete(id);
    }

}
