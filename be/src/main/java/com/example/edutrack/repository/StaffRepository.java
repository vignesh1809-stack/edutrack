package com.example.edutrack.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.edutrack.entity.Staff;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StaffRepository extends JpaRepository<Staff, UUID> {
    Optional<Staff> findByInstitutionIdAndPhone(UUID institutionId, String phone);
    Optional<Staff> findByPhone(String phone);

    @Query(value = "SELECT * FROM staffs WHERE institution_id = :instId AND phone = :phone", nativeQuery = true)
    Optional<Staff> findByPhoneNative(@Param("instId") UUID instId, @Param("phone") String phone);

    @Query(value = "SELECT * FROM staffs WHERE id = :id", nativeQuery = true)
    Optional<Staff> findByIdNative(@Param("id") UUID id);
}
