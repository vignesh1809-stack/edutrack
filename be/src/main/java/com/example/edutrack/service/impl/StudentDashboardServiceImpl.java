package com.example.edutrack.service.impl;

import com.example.edutrack.dto.*;
import com.example.edutrack.repository.AssessmentRepository;
import com.example.edutrack.repository.AttendanceRepository;
import com.example.edutrack.repository.RemarksRepository;
import com.example.edutrack.repository.StudentRepository;
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
                                .gpa(null)
                                .topSubjects(topSubjects)
                                .build())
                        .attendance(StudentDashboardDto.AttendanceSummary.builder()
                                .semesterPercent(semesterPercent)
                                .trendPercentVsLastMonth(trend)
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
                        .build())
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
}
