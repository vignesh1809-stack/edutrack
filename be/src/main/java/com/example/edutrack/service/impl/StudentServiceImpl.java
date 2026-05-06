package com.example.edutrack.service.impl;

import com.example.edutrack.service.StudentService;

import lombok.Data;

import com.example.edutrack.config.TenantContext;
import com.example.edutrack.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import com.example.edutrack.entity.Student;
import com.example.edutrack.dto.StudentListProjection;
import java.util.UUID;

import com.example.edutrack.dto.StudentListDto;
import com.example.edutrack.entity.enums.StudentStatus;
import java.util.stream.Collectors;
import java.util.Arrays;

@Service
@Data
public class StudentServiceImpl implements StudentService {

    @Autowired
    private final StudentRepository studentRepository;

    @Autowired
    private final com.example.edutrack.repository.DepartmentRepository departmentRepository;

    @Override
    public java.util.List<String> getFilterBranches(UUID institutionId) {
        return departmentRepository.findDistinctCodes(institutionId.toString());
    }

    @Override
    public java.util.List<Integer> getFilterYears(UUID institutionId) {
        return studentRepository.findDistinctAdmissionYears(institutionId.toString());
    }

    private static final String MALE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuAuK5ea-CQnsg9H3SSK-s00z83Y3RDrl2CCwNPRrC1CFOhGmhe00nej2AU4ZxowY-J1Bs9xECe61LGerMBhWbjSXVMV3Oz7GqAh7XZFovM2Jf_T3Uiiig4A1OdN6c1YTyFStRFVHEOtuCGHXUCiZI0a2X-0Uan49bYv9_zwjl2GIFTr7KaPsrBGCAew5G71ANZtcxGNg8g3z9YgB-Wg71PVdkFJ0gi64eG_WJ542-Lcaa1S1ahlIyyos5wpAY-v52OQJ4bRLuZOFXw";
    private static final String FEMALE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBqCeAq3YNYXEm_mrCqHCTGZDY7T_z389pyA_h-zJuUllUZIeeI-_DgiWJlkkqxNBX1ziPYqeosBKdmlgt-ZfV2wbPFOMA2rtnaJeLxICW1WZeG1rxAH7-DYKHdcN3IurVF--aE70D18mFqEbiF-4o31qeiejfXvax9_16ujFADMf5wHefJw3psnyVnsOGUVjJtg9C_eNkz1tV4UqmxCo2bmedzbDKxtHSjUWxVAQUuG-zj23TdmN7PTdywfEh_wPTZ0Z8xLr_v3LQ";

    @Override
    @Transactional(readOnly = true)
    public Page<Student> getAllStudents(Pageable pageable) {
        UUID institutionId = UUID.fromString(TenantContext.getCurrentTenant());
        return studentRepository.findAllActive(institutionId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudentListDto> getPrincipalStudentList(UUID institutionId, String search, StudentStatus status, String course, Integer batchYear, String section, Pageable pageable) {
        String searchPattern = (search != null && !search.isBlank()) ? "%" + search.toLowerCase() + "%" : null;
        String courseLike = (course != null && !course.isBlank()) ? "%" + course.toLowerCase() + "%" : null;
        String statusStr = (status != null) ? status.name() : null;

        return studentRepository.findPrincipalStudentList(
                institutionId,
                searchPattern,
                statusStr,
                courseLike,
                batchYear,
                section,
                pageable
        ).map(this::convertProjectionToDto);
    }

    private StudentListDto convertProjectionToDto(StudentListProjection proj) {
        String statusLabel = proj.getStatus() != null ? 
            capitalize(proj.getStatus().replace("_", " ")) : "Good";

        String studentId = proj.getStudentId() != null ? proj.getStudentId() : proj.getId().toString();
        String roll = studentId.length() >= 4 ? studentId.substring(studentId.length() - 4) : studentId;

        return StudentListDto.builder()
                .id(studentId)
                .name(proj.getFirstName() + " " + proj.getLastName())
                .roll(roll)
                .image("female".equalsIgnoreCase(proj.getGender()) ? FEMALE_IMAGE : MALE_IMAGE)
                .status(statusLabel)
                .courseDetails(Arrays.asList(
                        proj.getDepartmentName() + " | " + proj.getBatchYear() + " Year",
                        "Section " + proj.getSection()
                ))
                .attendance(calculateAttendancePlaceholder())
                .avgMarks(proj.getCGPA() != null ? proj.getCGPA().toString() : "0.0")
                .cgpa(proj.getCGPA() != null ? proj.getCGPA().toString() : "0.0")
                .build();
    }

    private String calculateAttendancePlaceholder() {
        return (70 + (new java.util.Random().nextInt(25))) + "%";
    }

    private String calculateAvgMarksPlaceholder() {
        return String.format("%.1f", 6.5 + (new java.util.Random().nextDouble() * 3.0));
    }

    private String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return Arrays.stream(str.toLowerCase().split(" "))
                .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1))
                .collect(Collectors.joining(" "));
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "students", keyGenerator = "tenantKeyGenerator")
    public Student getStudentById(UUID id) {
        return studentRepository.findActiveById(id).orElse(null);
    }

    @Override
    @Transactional
    public Student create(Student student) {
        return studentRepository.save(student);
    }

    @Override
    @Transactional
    @CacheEvict(value = "students", keyGenerator = "tenantKeyGenerator")
    public Student update(UUID id, Student student) {
        if (studentRepository.existsById(id)) {
            return studentRepository.save(student);
        }
        return null;
    }

    @Override
    @Transactional
    @CacheEvict(value = "students", keyGenerator = "tenantKeyGenerator")
    public void delete(UUID id) {
        studentRepository.softDelete(id);
    }
}

