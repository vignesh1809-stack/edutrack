package com.example.edutrack.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.edutrack.entity.Guardian;

import java.util.Optional;

public interface GuardianRepository extends JpaRepository<Guardian, UUID> {
    Optional<Guardian> findByInstitutionIdAndPhone(UUID institutionId, String phone);
    Optional<Guardian> findByPhone(String phone);

    @Query(value = "SELECT * FROM guardians WHERE institution_id = UUID_TO_BIN(:instId) AND phone = :phone", nativeQuery = true)
    Optional<Guardian> findByPhoneNative(@Param("instId") String instId, @Param("phone") String phone);

    @Query(value = "SELECT * FROM guardians WHERE id = UUID_TO_BIN(:id) AND institution_id = UUID_TO_BIN(:instId)", nativeQuery = true)
    Optional<Guardian> findByIdNative(@Param("id") String id, @Param("instId") String instId);
}
