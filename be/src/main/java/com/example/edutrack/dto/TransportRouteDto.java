package com.example.edutrack.dto;

import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class TransportRouteDto {
    private UUID id;
    private String busId;
    private String routeName;
    private String status;
    private String path;
    private String driver;
}
