package com.example.edutrack.service.impl;

import com.example.edutrack.config.TenantContext;
import com.example.edutrack.dto.PrincipalDashboardDto;
import com.example.edutrack.dto.PrincipalDashboardDto.RemarkSummaryDto;
import com.example.edutrack.repository.AttendanceRepository;
import com.example.edutrack.repository.BusesLogsRepository;
import com.example.edutrack.repository.RemarksRepository;
import com.example.edutrack.repository.StudentRepository;
import com.example.edutrack.service.PrincipalDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.example.edutrack.dto.PrincipalStudentListDto;
import com.example.edutrack.entity.Student;

import jakarta.persistence.criteria.Predicate;

@Service
public class PrincipalDashboardServiceImpl implements PrincipalDashboardService {

    @Autowired private StudentRepository    studentRepository;
    @Autowired private AttendanceRepository attendanceRepository;
    @Autowired private BusesLogsRepository  busesLogsRepository;
    @Autowired private RemarksRepository    remarksRepository;

    @Override
    @Transactional(readOnly = true)
    public PrincipalDashboardDto getDashboard(UUID institutionId, Integer year, String section) {
        // Ensure tenant context is set
        TenantContext.setCurrentTenant(institutionId.toString());

        LocalDate today = LocalDate.now();

        // ── 1. Student counts ─────────────────────────────────────────────────
        long totalStudents = (year == null && section == null)
                ? studentRepository.countActiveStudents(institutionId)
                : studentRepository.countActiveStudentsFiltered(institutionId, year, section);

        long studentsMarkedToday = (year == null && section == null)
                ? attendanceRepository.countDistinctStudentsOnDate(institutionId, today)
                : attendanceRepository.countDistinctStudentsOnDateFiltered(institutionId, today, year, section);

        // ── 2. Attendance percentage ──────────────────────────────────────────
        long presentToday = (year == null && section == null)
                ? attendanceRepository.countPresentOnDate(institutionId, today)
                : attendanceRepository.countPresentOnDateFiltered(institutionId, today, year, section);

        long totalRecords = (year == null && section == null)
                ? attendanceRepository.countTotalOnDate(institutionId, today)
                : attendanceRepository.countTotalOnDateFiltered(institutionId, today, year, section);

        double attendancePct = totalRecords > 0
                ? Math.round((presentToday * 100.0 / totalRecords) * 10.0) / 10.0
                : 0.0;

        // ── 3. Bus metrics ────────────────────────────────────────────────────
        long totalBuses = (year == null && section == null)
                ? busesLogsRepository.countTotalBuses(institutionId)
                : busesLogsRepository.countTotalBusesFiltered(institutionId, year, section);

        long busesArrivedToday = (year == null && section == null)
                ? busesLogsRepository.countBusesArrivedOnDate(institutionId, today)
                : busesLogsRepository.countBusesArrivedOnDateFiltered(institutionId, today, year, section);

        // ── 4. Remarks metrics ────────────────────────────────────────────────
        long remarksToday;
        long totalRemarks;
        List<RemarkSummaryDto> latestRemarks;

        if (year == null && section == null) {
            // Show all remarks for the institution
            remarksToday = remarksRepository.countRemarksSubmittedOnDate(institutionId, today);
            totalRemarks = remarksRepository.countTotalRemarks(institutionId);

            List<Object[]> rawRemarks = remarksRepository
                    .findLatestRemarks(institutionId, PageRequest.of(0, 5))
                    .getContent();

            latestRemarks = rawRemarks.stream().map(row -> {
                String createdAt = row[2] != null ? row[2].toString() : null;
                return RemarkSummaryDto.builder()
                        .id(row[0] != null ? row[0].toString() : null)
                        .content(row[1] != null ? row[1].toString() : null)
                        .createdAt(createdAt)
                        .studentName(row[3] != null ? row[3].toString() : null)
                        .studentCode(row[4] != null ? row[4].toString() : null)
                        .build();
            }).collect(Collectors.toList());
        } else {
            // Show filtered remarks
            remarksToday = remarksRepository.countRemarksSubmittedOnDateFiltered(institutionId, today, year, section);
            totalRemarks = remarksRepository.countTotalRemarksFiltered(institutionId, year, section);

            List<Object[]> rawRemarks = remarksRepository
                    .findLatestRemarksFiltered(institutionId, year, section, PageRequest.of(0, 5))
                    .getContent();

            latestRemarks = rawRemarks.stream().map(row -> {
                String createdAt = row[2] != null ? row[2].toString() : null;
                return RemarkSummaryDto.builder()
                        .id(row[0] != null ? row[0].toString() : null)
                        .content(row[1] != null ? row[1].toString() : null)
                        .createdAt(createdAt)
                        .studentName(row[3] != null ? row[3].toString() : null)
                        .studentCode(row[4] != null ? row[4].toString() : null)
                        .build();
            }).collect(Collectors.toList());
        }

        return PrincipalDashboardDto.builder()
                .totalStudents(totalStudents)
                .studentsMarkedToday(studentsMarkedToday)
                .attendancePercentageToday(attendancePct)
                .totalBuses(totalBuses)
                .busesArrivedToday(busesArrivedToday)
                .remarksSubmittedToday(remarksToday)
                .totalRemarks(totalRemarks)
                .latestRemarks(latestRemarks)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PrincipalStudentListDto> getStudentsList(UUID institutionId, String search, String statusFilter, Pageable pageable) {
        TenantContext.setCurrentTenant(institutionId.toString());

        Specification<Student> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("institution").get("id"), institutionId));
            predicates.add(cb.isFalse(root.get("isDeleted")));

            if (search != null && !search.trim().isEmpty()) {
                String searchLike = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("firstName")), searchLike),
                    cb.like(cb.lower(root.get("lastName")), searchLike),
                    cb.like(cb.lower(root.get("studentId")), searchLike)
                ));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<Student> students = studentRepository.findAll(spec, pageable);

        return students.map(student -> {
            Double attendancePctRaw = attendanceRepository.getAttendancePercentageByStudentId(institutionId, student.getId());
            double attendancePct = attendancePctRaw != null ? Math.round(attendancePctRaw * 10.0) / 10.0 : 100.0;
            
            double cgpa = student.getCGPA() != null ? student.getCGPA().doubleValue() : 0.0;
            
            String status = "Good";
            String statusToken = "bg-green-50 text-green-700";
            String borderStyle = "";
            String actionBtn = "View Portfolio";
            String actionStyle = "bg-secondary-container text-on-secondary-container";
            String attendBg = "bg-surface-container-low";
            String attendText = "text-slate-700";

            if (attendancePct < 75.0 || cgpa < 6.0) {
                status = "Critical";
                statusToken = "bg-error-container/20 text-error";
                borderStyle = "border-l-4 border-error";
                actionBtn = "Intervene";
                actionStyle = "bg-error text-white";
                attendBg = "bg-error-container/10";
                attendText = "text-error";
            } else if (attendancePct < 85.0 || cgpa < 7.5) {
                status = "At Risk";
                statusToken = "bg-yellow-100 text-yellow-700";
            }

            String gender = student.getGender() != null ? student.getGender().toLowerCase() : "male";
            String image = gender.equals("female") ? 
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBqCeAq3YNYXEm_mrCqHCTGZDY7T_z389pyA_h-zJuUllUZIeeI-_DgiWJlkkqxNBX1ziPYqeosBKdmlgt-ZfV2wbPFOMA2rtnaJeLxICW1WZeG1rxAH7-DYKHdcN3IurVF--aE70D18mFqEbiF-4o31qeiejfXvax9_16ujFADMf5wHefJw3psnyVnsOGUVjJtg9C_eNkz1tV4UqmxCo2bmedzbDKxtHSjUWxVAQUuG-zj23TdmN7PTdywfEh_wPTZ0Z8xLr_v3LQ" :
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAuK5ea-CQnsg9H3SSK-s00z83Y3RDrl2CCwNPRrC1CFOhGmhe00nej2AU4ZxowY-J1Bs9xECe61LGerMBhWbjSXVMV3Oz7GqAh7XZFovM2Jf_T3Uiiig4A1OdN6c1YTyFStRFVHEOtuCGHXUCiZI0a2X-0Uan49bYv9_zwjl2GIFTr7KaPsrBGCAew5G71ANZtcxGNg8g3z9YgB-Wg71PVdkFJ0gi64eG_WJ542-Lcaa1S1ahlIyyos5wpAY-v52OQJ4bRLuZOFXw";

            String departmentName = student.getDepartment() != null && student.getDepartment().getName() != null ? student.getDepartment().getName() : "Unknown";
            int year = 1;
            if (student.getAdmissionDate() != null) {
                year = LocalDate.now().getYear() - student.getAdmissionDate().getYear();
                if (year <= 0) year = 1;
            }
            
            String section = student.getDepartment() != null && student.getDepartment().getSection() != null ? student.getDepartment().getSection() : "A";

            PrincipalStudentListDto dto = new PrincipalStudentListDto();
            dto.setId(student.getId().toString());
            dto.setName(student.getFirstName() + " " + student.getLastName());
            dto.setRoll(student.getStudentId());
            dto.setImage(image);
            dto.setStatus(status);
            dto.setStatusToken(statusToken);
            dto.setCourseDetails(Arrays.asList(departmentName + " | " + year + " Year", "Section " + section));
            dto.setAttendance(attendancePct + "%");
            dto.setAvgMarks(String.valueOf(cgpa));
            dto.setBorderStyle(borderStyle);
            dto.setActionBtn(actionBtn);
            dto.setActionStyle(actionStyle);
            dto.setAttendBg(attendBg);
            dto.setAttendText(attendText);
            
            return dto;
        });
    }
}
