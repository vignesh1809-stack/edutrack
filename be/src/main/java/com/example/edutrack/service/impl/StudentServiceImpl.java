package com.example.edutrack.service.impl;

import com.example.edutrack.service.StudentService;

import lombok.Data;

import com.example.edutrack.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import com.example.edutrack.entity.Student;
import java.util.UUID;

@Service
@Data
public class StudentServiceImpl implements StudentService {

    @Autowired
    private final StudentRepository studentRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<Student> getAllStudents(Pageable pageable) {
        return studentRepository.findAllActive(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "students", keyGenerator = "tenantKeyGenerator")
    public Student getStudentById(UUID id) {
        return studentRepository.findActiveById(id).orElse(null);
    }

    @Override
    @Transactional
    public Student create(Student student) {
        return studentRepository.save(student);
    }

    @Override
    @Transactional
    @CacheEvict(value = "students", keyGenerator = "tenantKeyGenerator")
    public Student update(UUID id, Student student) {
        if (studentRepository.existsById(id)) {
            return studentRepository.save(student);
        }
        return null;
    }

    @Override
    @Transactional
    @CacheEvict(value = "students", keyGenerator = "tenantKeyGenerator")
    public void delete(UUID id) {
        studentRepository.softDelete(id);
    }
}

