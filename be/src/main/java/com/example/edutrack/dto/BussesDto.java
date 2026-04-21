package com.example.edutrack.dto;

import lombok.Data;

@Data
public class BussesDto {
    private int bus_id;
    private String bus_number;
    private String driver_name;
    private String route;
    private int total_students;
    private StaffDto incharge;
    
}
