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
import com.example.edutrack.dto.StudentProfileProjection;
import java.util.UUID;
import java.util.Map;
import java.time.LocalDate;

import com.example.edutrack.dto.StudentListDto;
import com.example.edutrack.dto.StudentProfileDto;
import com.example.edutrack.entity.enums.StudentStatus;
import com.example.edutrack.entity.enums.AttendanceStatus;
import com.example.edutrack.entity.enums.FeeStatus;
import com.example.edutrack.entity.Assessment;
import com.example.edutrack.entity.Attendance;
import com.example.edutrack.entity.Fee;
import com.example.edutrack.entity.Remarks;
import com.example.edutrack.repository.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Data
public class StudentServiceImpl implements StudentService {

    @Autowired
    private final StudentRepository studentRepository;

    @Autowired
    private final com.example.edutrack.repository.DepartmentRepository departmentRepository;

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private FeeRepository feeRepository;

    @Autowired
    private RemarksRepository remarksRepository;

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
    public Page<StudentListDto> getPrincipalStudentList(UUID institutionId, String search, StudentStatus status,
            String course, Integer batchYear, String section, Pageable pageable) {
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
                pageable).map(this::convertProjectionToDto);
    }

    private StudentListDto convertProjectionToDto(StudentListProjection proj) {
        String statusLabel = proj.getStatus() != null ? capitalize(proj.getStatus().replace("_", " ")) : "Good";

        String studentId = proj.getStudentId() != null ? proj.getStudentId() : "N/A";
        String roll = studentId.length() >= 4 ? studentId.substring(studentId.length() - 4) : studentId;

        return StudentListDto.builder()
                .id(proj.getId().toString()) // UUID for navigation
                .studentId(studentId) // Human readable ID
                .name(proj.getFirstName() + " " + proj.getLastName())
                .roll(roll)
                .image("female".equalsIgnoreCase(proj.getGender()) ? FEMALE_IMAGE : MALE_IMAGE)
                .status(statusLabel)
                .courseDetails(Arrays.asList(
                        proj.getDepartmentName() + " | Sem "
                                + (proj.getCurrentSemester() != null ? proj.getCurrentSemester() : 1),
                        "Section " + proj.getSection()))
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
        if (str == null || str.isEmpty())
            return str;
        return Arrays.stream(str.toLowerCase().split(" "))
                .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1))
                .collect(Collectors.joining(" "));
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "students", keyGenerator = "tenantKeyGenerator")
    public Student getStudentById(UUID id) {
        String instId = TenantContext.getCurrentTenant();
        return studentRepository.findActiveById(id.toString(), instId).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public StudentProfileDto getStudentProfile(UUID institutionId, UUID studentId) {
        TenantContext.setCurrentTenant(institutionId.toString());
        System.out.println(
                "[PROFILE] Fetching profile for studentId: " + studentId + " in institutionId: " + institutionId);

        StudentProfileProjection student = studentRepository.findProfileProjection(studentId.toString(), institutionId.toString())
                .orElseThrow(() -> new RuntimeException(
                        "Student not found with UUID: " + studentId));

        // Get entity for related data lookups
        Student studentEntity = studentRepository.findActiveById(studentId.toString(), institutionId.toString()).orElse(null);

        // 1. Identity
        StudentProfileDto.StudentIdentity identity = StudentProfileDto.StudentIdentity.builder()
                .id(UUID.fromString(student.getId()))
                .studentId(student.getStudentId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .status(student.getStatus() != null ? student.getStatus() : "ACTIVE")
                .avatarUrl("female".equalsIgnoreCase(student.getGender()) ? FEMALE_IMAGE : MALE_IMAGE)
                .major(student.getDepartmentName() != null ? student.getDepartmentName() : "General")
                .section(student.getSection())
                .currentSemester(student.getCurrentSemester())
                .build();

        // 2. Performance (Sem-wise)
        List<Assessment> assessments = assessmentRepository.findByStudentId(studentId);
        Map<Integer, List<Assessment>> bySem = assessments.stream()
                .filter(a -> a.getCourse() != null)
                .collect(Collectors.groupingBy(a -> a.getCourse().getSemester()));

        List<StudentProfileDto.SemesterPerformance> performance = bySem.entrySet().stream()
                .map((Map.Entry<Integer, List<Assessment>> entry) -> {
                    double avg = entry.getValue().stream()
                            .mapToDouble(a -> a.getMarksObtained().doubleValue() / a.getMaxScore().doubleValue() * 100)
                            .average().orElse(0.0);
                    return StudentProfileDto.SemesterPerformance.builder()
                            .label("Sem " + entry.getKey())
                            .score(Math.round(avg * 10) / 10.0)
                            .height(Math.round(avg) + "%")
                            .build();
                })
                .sorted(Comparator.comparing(StudentProfileDto.SemesterPerformance::getLabel))
                .collect(Collectors.toList());

        // 3. Attendance (Using optimized native query)
        com.example.edutrack.dto.StudentAttendanceProjection attProj = attendanceRepository.findStudentAttendanceTrend(studentId.toString(), institutionId.toString());
        
        StudentProfileDto.AttendanceSummary attendance;
        if (attProj != null) {
            attendance = StudentProfileDto.AttendanceSummary.builder()
                    .percentage(attProj.getPercentage() != null ? attProj.getPercentage() : 0.0)
                    .presents(attProj.getPresents() != null ? attProj.getPresents() : 0)
                    .totalDays(attProj.getTotalDays() != null ? attProj.getTotalDays() : 0)
                    .monthlyTrend(Arrays.asList(
                            attProj.getMonth5() != null ? attProj.getMonth5() : 0,
                            attProj.getMonth4() != null ? attProj.getMonth4() : 0,
                            attProj.getMonth3() != null ? attProj.getMonth3() : 0,
                            attProj.getMonth2() != null ? attProj.getMonth2() : 0,
                            attProj.getMonth1() != null ? attProj.getMonth1() : 0,
                            attProj.getMonth0() != null ? attProj.getMonth0() : 0
                    ))
                    .build();
        } else {
            attendance = StudentProfileDto.AttendanceSummary.builder()
                    .percentage(0.0)
                    .presents(0)
                    .totalDays(0)
                    .monthlyTrend(Arrays.asList(0, 0, 0, 0, 0, 0))
                    .build();
        }

        // 4. Financials (Using optimized native query)
        com.example.edutrack.dto.StudentFinancialProjection finProj = feeRepository.findStudentFinancialSummary(studentId.toString(), institutionId.toString());
        
        StudentProfileDto.FinancialSummary financials;
        if (finProj != null) {
            financials = StudentProfileDto.FinancialSummary.builder()
                    .pendingAmount(finProj.getPendingAmount() != null ? finProj.getPendingAmount() : BigDecimal.ZERO)
                    .dueDate(finProj.getDueDate())
                    .build();
        } else {
            financials = StudentProfileDto.FinancialSummary.builder()
                    .pendingAmount(BigDecimal.ZERO)
                    .dueDate(null)
                    .build();
        }

        // 5. Remarks
        List<Remarks> remarksList = remarksRepository.findByTargetStudentId(studentId);
        List<StudentProfileDto.RemarkDto> remarks = remarksList.stream()
                .map((Remarks r) -> {
                    String authorName = "System";
                    String authorRole = "Automated";
                    String type = "Staff";

                    if (r.getAuthorStaff() != null) {
                        authorName = r.getAuthorStaff().getFirstName() + " " + r.getAuthorStaff().getLastName();
                        authorRole = r.getAuthorStaff().getRole() != null ? r.getAuthorStaff().getRole().name()
                                : "Staff";
                        type = "Staff";
                    } else if (r.getAuthorStudent() != null) {
                        authorName = r.getAuthorStudent().getFirstName() + " " + r.getAuthorStudent().getLastName();
                        authorRole = "Student";
                        type = "Peer";
                    }

                    return StudentProfileDto.RemarkDto.builder()
                            .authorName(authorName)
                            .authorRole(authorRole)
                            .content(r.getContent())
                            .date(r.getCreatedAt().toLocalDate())
                            .type(type)
                            .build();
                })
                .limit(5) // Just top 5
                .collect(Collectors.toList());

        // 6. Contact
        StudentProfileDto.ContactDetails contact = StudentProfileDto.ContactDetails.builder()
                .phone(student.getPhone())
                .email(student.getEmail())
                .address(student.getAddress())
                .guardianName(studentEntity != null && studentEntity.getGuardians() != null && !studentEntity.getGuardians().isEmpty() ? 
                        studentEntity.getGuardians().get(0).getName() : "N/A")
                .guardianRelation(studentEntity != null && studentEntity.getGuardians() != null && !studentEntity.getGuardians().isEmpty() ? 
                        "Guardian" : "N/A")
                .build();

        return StudentProfileDto.builder()
                .identity(identity)
                .performance(performance)
                .attendance(attendance)
                .financials(financials)
                .remarks(remarks)
                .contact(contact)
                .build();
    }


    @Override
    @Transactional(readOnly = true)
    public List<StudentProfileDto.RemarkDto> getStudentRemarks(UUID studentId) {
        List<Remarks> remarksList = remarksRepository.findByTargetStudentId(studentId);
        return remarksList.stream()
                .map((Remarks r) -> {
                    String authorName = "System";
                    String authorRole = "Automated";
                    String type = "Staff";

                    if (r.getAuthorStaff() != null) {
                        authorName = r.getAuthorStaff().getFirstName() + " " + r.getAuthorStaff().getLastName();
                        authorRole = r.getAuthorStaff().getRole() != null ? r.getAuthorStaff().getRole().name()
                                : "Staff";
                        type = "Staff";
                    } else if (r.getAuthorStudent() != null) {
                        authorName = r.getAuthorStudent().getFirstName() + " " + r.getAuthorStudent().getLastName();
                        authorRole = "Student";
                        type = "Peer";
                    }

                    return StudentProfileDto.RemarkDto.builder()
                            .authorName(authorName)
                            .authorRole(authorRole)
                            .content(r.getContent())
                            .date(r.getCreatedAt().toLocalDate())
                            .type(type)
                            .build();
                })
                .collect(Collectors.toList());
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
