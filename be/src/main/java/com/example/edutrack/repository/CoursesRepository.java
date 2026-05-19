package com.example.edutrack.repository;

import com.example.edutrack.entity.Courses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CoursesRepository extends JpaRepository<Courses, UUID> {
    List<Courses> findByInstitutionIdAndIsDeletedFalse(UUID institutionId);
}
