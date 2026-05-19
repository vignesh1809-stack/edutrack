package com.example.edutrack.service.impl;

import com.example.edutrack.service.StorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class LocalStorageServiceImpl implements StorageService {

    private final String uploadDir = "uploads";

    @Override
    public String store(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Cannot store empty or null file.");
        }
        
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String uniqueFilename = UUID.randomUUID().toString() + extension;
        Path targetPath = Paths.get(uploadDir).resolve(uniqueFilename);
        
        Files.copy(file.getInputStream(), targetPath);

        // Return path served by resource handler: /api/uploads/{filename}
        return "/api/uploads/" + uniqueFilename;
    }
}
