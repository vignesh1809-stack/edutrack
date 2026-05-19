package com.example.edutrack.repository;

import com.example.edutrack.entity.Buses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BusesRepository extends JpaRepository<Buses, UUID> {
    List<Buses> findByInstitutionIdAndIsDeletedFalse(UUID institutionId);
    
    long countByInstitutionIdAndIsDeletedFalse(UUID institutionId);
    
    long countByInstitutionIdAndFleetStatusAndIsDeletedFalse(UUID institutionId, String fleetStatus);
}
