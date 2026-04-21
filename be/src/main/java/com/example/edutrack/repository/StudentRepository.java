package com.example.edutrack.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.edutrack.entity.Student;

public interface StudentRepository extends JpaRepository<Student, UUID> {
    
}
