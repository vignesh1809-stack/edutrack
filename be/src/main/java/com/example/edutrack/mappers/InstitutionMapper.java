package com.example.edutrack.mappers;

import com.example.edutrack.dto.InstitutionDto;
import com.example.edutrack.entity.Institution;
import org.springframework.stereotype.Component;

@Component
public class InstitutionMapper {

    public InstitutionDto toDto(Institution entity) {
        if (entity == null) return null;
        InstitutionDto dto = new InstitutionDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setLevel(entity.getLevel());
        if (entity.getLevel() != null) {
            dto.setLevelDisplayName(entity.getLevel().getDisplayName());
        }
        return dto;
    }
}
