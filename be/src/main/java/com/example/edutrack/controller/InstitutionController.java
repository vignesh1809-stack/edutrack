package com.example.edutrack.controller;

import com.example.edutrack.dto.InstitutionDto;
import com.example.edutrack.service.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/institutions")
public class InstitutionController {

    @Autowired
    private InstitutionService institutionService;

    @GetMapping
    public ResponseEntity<List<InstitutionDto>> getAllInstitutions() {
        List<InstitutionDto> institutions = institutionService.getAllInstitutions();
        return ResponseEntity.ok(institutions);
    }
}
