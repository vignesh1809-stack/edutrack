package com.example.edutrack.repository;

import com.example.edutrack.entity.PaperSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaperSubmissionRepository extends JpaRepository<PaperSubmission, UUID> {

    @Query("SELECT s FROM PaperSubmission s LEFT JOIN FETCH s.student LEFT JOIN FETCH s.course WHERE s.institutionId = :institutionId AND s.isDeleted = false ORDER BY s.createdAt DESC")
    List<PaperSubmission> findByInstitutionIdAndIsDeletedFalseOrderByCreatedAtDesc(UUID institutionId);

    @Query("SELECT s FROM PaperSubmission s LEFT JOIN FETCH s.student LEFT JOIN FETCH s.course WHERE s.id = :id AND s.institutionId = :institutionId AND s.isDeleted = false")
    Optional<PaperSubmission> findByIdAndInstitutionIdAndIsDeletedFalse(UUID id, UUID institutionId);
}
