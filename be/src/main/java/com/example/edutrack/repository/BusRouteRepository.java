package com.example.edutrack.repository;

import com.example.edutrack.entity.BusRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BusRouteRepository extends JpaRepository<BusRoute, UUID> {
    List<BusRoute> findByInstitutionIdAndIsDeletedFalse(UUID institutionId);
}
