package com.example.edutrack.controller;

import com.example.edutrack.dto.TransportDashboardDto;
import com.example.edutrack.dto.TransportRouteDto;
import com.example.edutrack.dto.TransportStaffDto;
import com.example.edutrack.service.TransportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transport")
@RequiredArgsConstructor
public class TransportController {

    private final TransportService transportService;

    @GetMapping("/dashboard/summary")
    public ResponseEntity<TransportDashboardDto> getDashboardSummary() {
        return ResponseEntity.ok(transportService.getDashboardSummary());
    }

    @GetMapping("/dashboard/on-duty-staff")
    public ResponseEntity<List<TransportStaffDto>> getStaffOnDuty() {
        return ResponseEntity.ok(transportService.getStaffOnDuty());
    }

    @GetMapping("/staff")
    public ResponseEntity<List<TransportStaffDto>> getAllStaff() {
        return ResponseEntity.ok(transportService.getAllStaff());
    }

    @PutMapping("/staff/{id}/status")
    public ResponseEntity<Void> toggleStaffStatus(@PathVariable UUID id) {
        transportService.toggleStaffStatus(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/routes")
    public ResponseEntity<List<TransportRouteDto>> getRoutes() {
        return ResponseEntity.ok(transportService.getRoutes());
    }
}
