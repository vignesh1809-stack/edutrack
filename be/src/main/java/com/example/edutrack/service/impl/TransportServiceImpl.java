package com.example.edutrack.service.impl;

import com.example.edutrack.dto.TransportDashboardDto;
import com.example.edutrack.dto.TransportRouteDto;
import com.example.edutrack.dto.TransportStaffDto;
import com.example.edutrack.entity.BusRoute;
import com.example.edutrack.entity.Buses;
import com.example.edutrack.entity.TransportStaff;
import com.example.edutrack.repository.BusRouteRepository;
import com.example.edutrack.repository.BusesLogsRepository;
import com.example.edutrack.repository.BusesRepository;
import com.example.edutrack.repository.TransportStaffRepository;
import com.example.edutrack.config.TenantContext;
import com.example.edutrack.service.TransportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransportServiceImpl implements TransportService {

    private final BusesRepository busesRepository;
    private final BusRouteRepository busRouteRepository;
    private final TransportStaffRepository transportStaffRepository;
    private final BusesLogsRepository busesLogsRepository;

    @Override
    public TransportDashboardDto getDashboardSummary() {
        UUID instId = UUID.fromString(TenantContext.getCurrentTenant());

        long totalBuses = busesRepository.countByInstitutionIdAndIsDeletedFalse(instId);
        long activeTransit = busesRepository.countByInstitutionIdAndFleetStatusAndIsDeletedFalse(instId, "ON_ROUTE");
        long inWorkshop = busesRepository.countByInstitutionIdAndFleetStatusAndIsDeletedFalse(instId, "MAINTENANCE");
        long efficiencyScore = busesLogsRepository.countBusesArrivedBefore9AM(instId, LocalDate.now());

        return TransportDashboardDto.builder()
                .totalBuses(totalBuses)
                .activeTransit(activeTransit)
                .inWorkshop(inWorkshop)
                .efficiencyScore(efficiencyScore)
                .build();
    }

    @Override
    public List<TransportStaffDto> getStaffOnDuty() {
        UUID instId = UUID.fromString(TenantContext.getCurrentTenant());
        List<TransportStaff> staffs = transportStaffRepository
                .findByInstitutionIdAndIsActiveTrueAndIsDeletedFalse(instId);

        return staffs.stream()
                .limit(5)
                .map(this::mapToStaffDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<TransportStaffDto> getAllStaff() {
        UUID instId = UUID.fromString(TenantContext.getCurrentTenant());
        List<TransportStaff> staffs = transportStaffRepository.findByInstitutionIdAndIsDeletedFalse(instId);

        return staffs.stream()
                .map(this::mapToStaffDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void toggleStaffStatus(UUID staffId) {
        TransportStaff staff = transportStaffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
        staff.setIsActive(!staff.getIsActive());
        transportStaffRepository.save(staff);
    }

    @Override
    public List<TransportRouteDto> getRoutes() {
        UUID instId = UUID.fromString(TenantContext.getCurrentTenant());
        List<BusRoute> routes = busRouteRepository.findByInstitutionIdAndIsDeletedFalse(instId);

        // This is a simplified mapping. Realistically, we'd query buses joined with
        // their routes and drivers.
        return routes.stream().map(route -> {
            Buses bus = busesRepository.findByInstitutionIdAndIsDeletedFalse(instId).stream()
                    .filter(b -> b.getRoute() != null && b.getRoute().getId().equals(route.getId()))
                    .findFirst().orElse(null);

            String driverName = "Unknown";
            if (bus != null) {
                driverName = transportStaffRepository.findByInstitutionIdAndIsDeletedFalse(instId).stream()
                        .filter(s -> "DRIVER".equals(s.getRole()) && s.getBus() != null
                                && s.getBus().getId().equals(bus.getId()))
                        .map(s -> s.getFirstName() + " " + s.getLastName())
                        .findFirst().orElse("Unknown");
            }

            return TransportRouteDto.builder()
                    .id(route.getId())
                    .busId(bus != null ? bus.getBusNumber() : "Unassigned")
                    .routeName(route.getRouteName())
                    .status(bus != null ? bus.getFleetStatus() : "IDLE")
                    .path(route.getPathSummary())
                    .driver(driverName)
                    .build();
        }).collect(Collectors.toList());
    }

    private TransportStaffDto mapToStaffDto(TransportStaff staff) {
        return TransportStaffDto.builder()
                .id(staff.getId())
                .name(staff.getFirstName() + " " + staff.getLastName())
                .role(staff.getRole())
                .bus(staff.getBus() != null ? staff.getBus().getBusNumber() : "Unassigned")
                .route(staff.getBus() != null && staff.getBus().getRoute() != null
                        ? staff.getBus().getRoute().getRouteName()
                        : "Unassigned")
                .active(Boolean.TRUE.equals(staff.getIsActive()))
                .img(staff.getAvatarUrl())
                .build();
    }
}
