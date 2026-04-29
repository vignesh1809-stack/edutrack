package com.example.edutrack.dto;

import com.example.edutrack.entity.enums.InstitutionLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstitutionDto {

    private UUID id;
    private String name;
    private InstitutionLevel level;
    private String levelDisplayName;
}
