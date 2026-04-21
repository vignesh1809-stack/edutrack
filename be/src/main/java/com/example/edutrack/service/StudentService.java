package com.example.edutrack.service;

import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.edutrack.entity.Student;

public interface StudentService {

        Page<Student> getAllStudents(Pageable pageable);
        Student getStudentById(UUID id);
        Student create(Student student);
        Student update(UUID id, Student student);
        void delete(UUID id);
}
