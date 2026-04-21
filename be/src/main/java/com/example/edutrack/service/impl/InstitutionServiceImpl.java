package com.example.edutrack.service.impl;

import com.example.edutrack.dto.InstitutionDto;
import com.example.edutrack.repository.InstitutionRepository;
import com.example.edutrack.service.InstitutionService;
import com.example.edutrack.mappers.InstitutionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstitutionServiceImpl implements InstitutionService {

    @Autowired
    private InstitutionRepository institutionRepository;

    @Autowired
    private InstitutionMapper institutionMapper;

    @Override
    public List<InstitutionDto> getAllInstitutions() {
        return institutionRepository.findByIsDeletedFalse().stream()
                .map(institutionMapper::toDto)
                .collect(Collectors.toList());
    }
}
