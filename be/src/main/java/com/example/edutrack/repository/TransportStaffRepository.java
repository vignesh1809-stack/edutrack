package com.example.edutrack.repository;

import com.example.edutrack.entity.TransportStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransportStaffRepository extends JpaRepository<TransportStaff, UUID> {
    List<TransportStaff> findByInstitutionIdAndIsDeletedFalse(UUID institutionId);
    List<TransportStaff> findByInstitutionIdAndIsActiveTrueAndIsDeletedFalse(UUID institutionId);
}
