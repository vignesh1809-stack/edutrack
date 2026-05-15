package com.example.edutrack.service.impl;

import com.example.edutrack.config.TenantContext;
import com.example.edutrack.dto.*;
import com.example.edutrack.entity.Remarks;
import com.example.edutrack.repository.AssessmentRepository;
import com.example.edutrack.repository.AttendanceRepository;
import com.example.edutrack.repository.RemarksRepository;
import com.example.edutrack.repository.StudentRepository;
import com.example.edutrack.repository.StaffRepository;
import com.example.edutrack.entity.enums.RemarkTarget;
import com.example.edutrack.entity.enums.RemarkCategory;
import com.example.edutrack.entity.Staff;
import com.example.edutrack.entity.Student;
import com.example.edutrack.entity.Institution;
import com.example.edutrack.service.StudentDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class StudentDashboardServiceImpl implements StudentDashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private RemarksRepository remarksRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private FeeRepository feeRepository;

    @Override
    @Transactional(readOnly = true)
    public StudentDashboardDto getDashboard(UUID institutionId, UUID studentId, Integer semester) {
        StudentProfileProjection profile = studentRepository
                .findProfileProjection(studentId.toString(), institutionId.toString())
                .orElseThrow(() -> new RuntimeException("Student not found for dashboard"));

        int effectiveSemester = semester != null
                ? semester
                : (profile.getCurrentSemester() != null ? profile.getCurrentSemester() : 1);

        List<StudentDashboardAcademicProjection> subjectRows = assessmentRepository
                .findTopSubjectsForStudentDashboard(institutionId, studentId, effectiveSemester);

        List<StudentDashboardDto.SubjectSummary> topSubjects = subjectRows.stream()
                .map(row -> StudentDashboardDto.SubjectSummary.builder()
                        .courseName(row.getCourseName())
                        .scorePercent(row.getScorePercent() != null ? row.getScorePercent() : 0.0)
                        .grade(toGrade(row.getScorePercent()))
                        .build())
                .toList();

        StudentDashboardAttendanceSummaryProjection attendanceSummaryRow = attendanceRepository
                .findStudentDashboardAttendanceSummary(institutionId, studentId, effectiveSemester);

        double semesterPercent = attendanceSummaryRow != null && attendanceSummaryRow.getSemesterPercent() != null
                ? attendanceSummaryRow.getSemesterPercent()
                : 0.0;
        double currentMonthPercent = attendanceSummaryRow != null && attendanceSummaryRow.getCurrentMonthPercent() != null
                ? attendanceSummaryRow.getCurrentMonthPercent()
                : 0.0;
        double previousMonthPercent = attendanceSummaryRow != null && attendanceSummaryRow.getPreviousMonthPercent() != null
                ? attendanceSummaryRow.getPreviousMonthPercent()
                : 0.0;
        double trend = roundOneDecimal(currentMonthPercent - previousMonthPercent);

        List<StudentDashboardDayAttendanceProjection> weeklyRows = attendanceRepository
                .findStudentDashboardWeeklyBars(institutionId, studentId);

        List<StudentDashboardDto.AttendanceBar> bars = weeklyRows.stream()
                .map(row -> StudentDashboardDto.AttendanceBar.builder()
                        .day(row.getDayKey())
                        .percent(row.getPercent() != null ? row.getPercent() : 0.0)
                        .build())
                .toList();

        StudentDashboardRankProjection marksRank = studentRepository
                .findMarksRankForStudentDashboard(institutionId, studentId);
        StudentDashboardRankProjection attendanceRank = studentRepository
                .findAttendanceRankForStudentDashboard(institutionId, studentId);

        int cohortSize = marksRank != null && marksRank.getCohortSize() != null
                ? marksRank.getCohortSize()
                : (attendanceRank != null && attendanceRank.getCohortSize() != null ? attendanceRank.getCohortSize() : 0);

        long pendingRemarks = remarksRepository.countPendingByTargetStudentId(institutionId, studentId);
        LocalDateTime latestPendingRemarkAt = remarksRepository.findLatestPendingRemarkAtByTargetStudentId(institutionId, studentId);

        StudentDashboardDto.StudentInfo student = StudentDashboardDto.StudentInfo.builder()
                .id(UUID.fromString(profile.getId()))
                .name((profile.getFirstName() + " " + profile.getLastName()).trim())
                .studentId(profile.getStudentId())
                .department(profile.getDepartmentName())
                .section(profile.getSection())
                .currentSemester(profile.getCurrentSemester())
                .build();

        return StudentDashboardDto.builder()
                .meta(StudentDashboardDto.Meta.builder()
                        .generatedAt(LocalDateTime.now())
                        .semester(effectiveSemester)
                        .build())
                .data(StudentDashboardDto.DashboardData.builder()
                        .student(student)
                        .welcome(StudentDashboardDto.WelcomeInfo.builder()
                                .title("Welcome back, " + profile.getFirstName())
                                .build())
                        .academicSummary(StudentDashboardDto.AcademicSummary.builder()
                                .semester(effectiveSemester)
                                .gpa(profile.getCgpa() != null ? profile.getCgpa().doubleValue() : 0.0)
                                .topSubjects(topSubjects)
                                .build())
                        .attendance(StudentDashboardDto.AttendanceSummary.builder()
                                .semesterPercent(semesterPercent)
                                .trendPercentVsLastMonth(trend)
                                .presents(attendanceSummaryRow != null && attendanceSummaryRow.getPresentCount() != null ? attendanceSummaryRow.getPresentCount() : 0)
                                .totalDays(attendanceSummaryRow != null && attendanceSummaryRow.getTotalCount() != null ? attendanceSummaryRow.getTotalCount() : 0)
                                .weeklyBars(bars)
                                .build())
                        .ranks(StudentDashboardDto.RankSummary.builder()
                                .marksRank(marksRank != null ? marksRank.getRankPosition() : null)
                                .attendanceRank(attendanceRank != null ? attendanceRank.getRankPosition() : null)
                                .cohortSize(cohortSize)
                                .build())
                        .upcomingExam(StudentDashboardDto.UpcomingExam.builder()
                                .examId(null)
                                .title(null)
                                .examDate(null)
                                .daysRemaining(null)
                                .build())
                        .remarksSummary(StudentDashboardDto.RemarksSummary.builder()
                                .pendingCount(pendingRemarks)
                                .latestRemarkAt(latestPendingRemarkAt)
                                .build())
                        .financials(fetchFinancials(institutionId, studentId))
                        .build())
                .build();
    }

    private StudentDashboardDto.FinancialSummary fetchFinancials(UUID institutionId, UUID studentId) {
        try {
            var finProj = feeRepository.findStudentFinancialSummary(studentId.toString(), institutionId.toString());
            
            // Fetch detailed pending items
            List<com.example.edutrack.entity.Fee> pendingFees = feeRepository.findByStudentId(studentId, institutionId).stream()
                    .filter(f -> f.getStatus() != com.example.edutrack.entity.enums.FeeStatus.PAID)
                    .toList();

            List<StudentDashboardDto.FeeDetailDto> items = pendingFees.stream()
                    .map(f -> StudentDashboardDto.FeeDetailDto.builder()
                            .feeType(f.getFeeType() != null ? f.getFeeType().name() : "Other")
                            .term(f.getTerm())
                            .totalAmount(f.getTotalAmount() != null ? f.getTotalAmount() : java.math.BigDecimal.ZERO)
                            .fineAmount(f.getFineAmount() != null ? f.getFineAmount() : java.math.BigDecimal.ZERO)
                            .dueDate(f.getDueDate())
                            .status(f.getStatus() != null ? f.getStatus().name() : "UNPAID")
                            .build())
                    .toList();

            if (finProj != null) {
                return StudentDashboardDto.FinancialSummary.builder()
                        .pendingAmount(finProj.getPendingAmount() != null ? finProj.getPendingAmount() : java.math.BigDecimal.ZERO)
                        .dueDate(finProj.getDueDate())
                        .status(finProj.getPendingAmount() != null && finProj.getPendingAmount().compareTo(java.math.BigDecimal.ZERO) > 0 ? "UNPAID" : "PAID")
                        .pendingItems(items)
                        .build();
            }
        } catch (Exception e) {
            // Log error and return zeroed financials
        }
        return StudentDashboardDto.FinancialSummary.builder()
                .pendingAmount(java.math.BigDecimal.ZERO)
                .dueDate(null)
                .status("PAID")
                .pendingItems(List.of())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentRemarkDto> getStudentRemarks(UUID institutionId, UUID studentId) {
        com.example.edutrack.config.TenantContext.setCurrentTenant(institutionId.toString());

        List<Remarks> remarksList = remarksRepository.findByTargetStudentId(studentId, institutionId);

        return remarksList.stream().map(remark -> {
            String authorName = "System";
            String authorRole = "External";
            String avatarUrl = null;

            try {
                if (remark.getAuthorStaff() != null) {
                    authorName = remark.getAuthorStaff().getFirstName() + " " + remark.getAuthorStaff().getLastName();
                    authorRole = remark.getAuthorStaff().getRole() != null ? remark.getAuthorStaff().getRole().toString() : "Faculty";
                    avatarUrl = remark.getAuthorStaff().getAvatarUrl();
                } else if (remark.getAuthorGuardian() != null) {
                    authorName = remark.getAuthorGuardian().getName();
                    authorRole = "Guardian";
                } else if (remark.getAuthorStudent() != null) {
                    authorName = remark.getAuthorStudent().getFirstName() + " " + remark.getAuthorStudent().getLastName();
                    authorRole = "Student Peer";
                    avatarUrl = remark.getAuthorStudent().getAvatarUrl();
                }
            } catch (Exception e) {
                // Fallback for broken foreign key references
                authorName = "Educator";
                authorRole = "Faculty";
            }

            StudentRemarkDto.AuthorInfo author = StudentRemarkDto.AuthorInfo.builder()
                    .name(authorName)
                    .role(authorRole)
                    .avatarUrl(avatarUrl)
                    .build();

            StudentRemarkDto.AiSuggestionInfo aiSuggestion = null;
            if (remark.getAiSuggestion() != null) {
                aiSuggestion = StudentRemarkDto.AiSuggestionInfo.builder()
                        .type(remark.getAiSuggestionType() != null ? remark.getAiSuggestionType() : "NEXT_STEPS")
                        .text(remark.getAiSuggestion())
                        .build();
            }

            String title = "Note";
            if (remark.getCategory() != null) {
                title = switch (remark.getCategory()) {
                    case ACADEMIC -> "Academic Staff";
                    case BEHAVIORAL -> "Behavioral Note";
                    case ATTENDANCE -> "Attendance Alert";
                    default -> "Staff Insight";
                };
            }
            if (remark.getAuthorGuardian() != null) title = "Guardian Note";

            return StudentRemarkDto.builder()
                    .id(remark.getId())
                    .title(title)
                    .date(remark.getCreatedAt())
                    .content(remark.getContent())
                    .author(author)
                    .aiSuggestion(aiSuggestion)
                    .isLatest(remarksList.indexOf(remark) == 0)
                    .build();
        }).collect(java.util.stream.Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public StudentPortalProfileDto getStudentProfile(UUID institutionId, UUID studentId) {
        com.example.edutrack.config.TenantContext.setCurrentTenant(institutionId.toString());
        
        com.example.edutrack.dto.StudentProfileProjection student = studentRepository
                .findProfileProjection(studentId.toString(), institutionId.toString())
                .orElseThrow(() -> new RuntimeException("Student not found for profile"));

        String fullName = (student.getFirstName() + " " + student.getLastName()).trim();
        String currentLevel = "Semester " + student.getCurrentSemester();
        
        // Calculate Grade (Dummy logic for now, using Year 1, Year 2 etc)
        String gradeSection = "YEAR " + ((student.getCurrentSemester() + 1) / 2) + ", SECTION " + student.getSection();

        StudentPortalProfileDto.HeaderInfo header = StudentPortalProfileDto.HeaderInfo.builder()
                .fullName(fullName)
                .gradeSection(gradeSection)
                .location(student.getAddress())
                .avatarUrl(student.getAvatarUrl())
                .build();

        StudentPortalProfileDto.PersonalInfo personal = StudentPortalProfileDto.PersonalInfo.builder()
                .dateOfBirth(student.getDateOfBirth())
                .gender(student.getGender())
                .bloodGroup(student.getBloodGroup() != null ? student.getBloodGroup() : "Not Specified")
                .nationality("Indian") // Hardcoded as per user request
                .build();

        StudentPortalProfileDto.ContactInfo contact = StudentPortalProfileDto.ContactInfo.builder()
                .primaryPhone(student.getPhone())
                .emailAddress(student.getEmail())
                .residentialAddress(student.getAddress())
                .build();

        StudentPortalProfileDto.SchoolInfo school = StudentPortalProfileDto.SchoolInfo.builder()
                .studentId(student.getStudentId())
                .departmentName(student.getDepartmentName() != null ? student.getDepartmentName() : "N/A")
                .enrollmentYear(student.getBatchYear())
                .currentLevel(currentLevel)
                .build();

        // Still need entity for guardians if not projection-mapped
        com.example.edutrack.entity.Student studentEntity = studentRepository
                .findActiveById(studentId.toString(), institutionId.toString())
                .orElse(null);

        com.example.edutrack.entity.Guardian primaryGuardian = (studentEntity != null && studentEntity.getGuardians() != null && !studentEntity.getGuardians().isEmpty())
                ? studentEntity.getGuardians().get(0)
                : null;

        StudentPortalProfileDto.GuardianInfo guardian = StudentPortalProfileDto.GuardianInfo.builder()
                .name(primaryGuardian != null ? primaryGuardian.getName() : "Not Specified")
                .relation(primaryGuardian != null && primaryGuardian.getRelation() != null ? primaryGuardian.getRelation() : "Primary Contact")
                .phone(primaryGuardian != null ? primaryGuardian.getPhone() : "Not Specified")
                .occupation(primaryGuardian != null && primaryGuardian.getOccupation() != null ? primaryGuardian.getOccupation() : "Not Specified")
                .build();

        return StudentPortalProfileDto.builder()
                .header(header)
                .personal(personal)
                .contact(contact)
                .school(school)
                .guardian(guardian)
                .build();
    }

    private String toGrade(Double scorePercent) {
        double score = scorePercent != null ? scorePercent : 0.0;
        if (score >= 90) return "A";
        if (score >= 85) return "A-";
        if (score >= 80) return "B+";
        if (score >= 75) return "B";
        if (score >= 70) return "C+";
        if (score >= 60) return "C";
        return "D";
    }

    private double roundOneDecimal(double value) {
        return Math.round(value * 10.0) / 10.0;
    }

    @Override
    @Transactional
    public void submitRemark(UUID institutionId, UUID studentId, SubmitRemarkRequest request) {
        TenantContext.setCurrentTenant(institutionId.toString());
        Student author = studentRepository.findActiveById(studentId.toString(), institutionId.toString())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Remarks remark = new Remarks();
        remark.setInstitutionId(institutionId);
        remark.setAuthorStudent(author);
        remark.setSubject(request.getSubject());
        remark.setContent(request.getContent());
        remark.setTarget(RemarkTarget.valueOf(request.getTargetType()));
        
        try {
            remark.setCategory(RemarkCategory.valueOf(request.getCategory()));
        } catch (Exception e) {
            remark.setCategory(RemarkCategory.OTHER);
        }

        try {
            if (request.getPriority() != null) {
                remark.setPriority(com.example.edutrack.entity.enums.RemarkPriority.valueOf(request.getPriority()));
            }
        } catch (Exception e) {
            remark.setPriority(com.example.edutrack.entity.enums.RemarkPriority.LOW);
        }

        if (request.getTargetId() != null && "STAFF".equals(request.getTargetType())) {
            Staff targetStaff = staffRepository.findByIdNative(request.getTargetId())
                    .orElseThrow(() -> new RuntimeException("Target staff not found"));
            remark.setTargetStaff(targetStaff);
        }

        remark.setCreatedAt(LocalDateTime.now());
        remark.setUpdatedAt(LocalDateTime.now());
        remark.setDeleted(false);

        remarksRepository.save(remark);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StaffListDto> getStaffList(UUID institutionId) {
        List<Staff> staffs = staffRepository.findAllByInstitutionIdNative(institutionId.toString());
        return staffs.stream().map(s -> {
            String deptName = "Academic Department";
            try {
                if (s.getDepartment() != null) {
                    deptName = s.getDepartment().getName();
                }
            } catch (Exception e) {
                // Handle cases where department record is missing from DB
                deptName = "Academic Department";
            }
            
            return StaffListDto.builder()
                .id(s.getId())
                .fullName(s.getFirstName() + " " + s.getLastName())
                .role(s.getRole() != null ? s.getRole().name() : "Academic Staff")
                .departmentName(deptName)
                .build();
        }).toList();
    }
}
