package com.example.edutrack.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.edutrack.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, UUID> {
    
}
