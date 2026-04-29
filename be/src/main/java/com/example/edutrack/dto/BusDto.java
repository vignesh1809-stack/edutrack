package com.example.edutrack.dto;

import lombok.Data;

@Data
public class BusDto {
    private int busId;
    private String busNumber;
    private String driverName;
    private String route;
    private int totalStudents;
    private StaffDto incharge;
}
