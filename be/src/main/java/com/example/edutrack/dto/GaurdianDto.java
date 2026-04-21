package com.example.edutrack.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class GaurdianDto {

    private UUID id;
    private String name;
    private String phone;
    private String email;
    private String address;
    private String createdAt; 
 
}
