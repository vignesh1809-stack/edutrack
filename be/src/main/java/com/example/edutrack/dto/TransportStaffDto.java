package com.example.edutrack.dto;

import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class TransportStaffDto {
    private UUID id;
    private String name;
    private String role;
    private String bus;
    private String route;
    private boolean active;
    private String img;
}
