package com.example.edutrack.service.impl;

import com.example.edutrack.dto.*;
import com.example.edutrack.entity.Attendance;
import com.example.edutrack.entity.SchoolClass;
import com.example.edutrack.entity.Student;
import com.example.edutrack.entity.enums.AttendanceStatus;
import com.example.edutrack.repository.AttendanceRepository;
import com.example.edutrack.repository.SchoolClassRepository;
import com.example.edutrack.repository.StudentRepository;
import com.example.edutrack.service.StaffAttendanceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StaffAttendanceServiceImpl implements StaffAttendanceService {

    private static final Logger logger = LoggerFactory.getLogger(StaffAttendanceServiceImpl.class);

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SchoolClassRepository schoolClassRepository;

    @Override
    @Transactional(readOnly = true)
    public StaffAttendanceClassDto getStaffAttendanceClass(UUID institutionId, UUID staffId, String dateStr, Integer semester, Integer year, String section, String branch) {
        logger.info("[StaffAttendance] Fetching class list for staff: {}, date: {}, year: {}, section: {}, branch: {}", staffId, dateStr, year, section, branch);

        // Normalize filter values
        Integer lookupYear = (year != null && year > 0) ? year : null;
        String lookupSection = (section != null && !section.trim().isEmpty() && !section.equalsIgnoreCase("ALL")) ? section.trim() : null;
        String lookupBranch = (branch != null && !branch.trim().isEmpty() && !branch.equalsIgnoreCase("ALL")) ? branch.trim() : null;

        SchoolClass clazz;
        if (lookupYear != null || lookupSection != null || lookupBranch != null) {
            clazz = schoolClassRepository.findByLookupParamsNative(institutionId, lookupYear, lookupSection, lookupBranch)
                    .orElseGet(() -> schoolClassRepository.findByClassTeacherIdNative(staffId)
                            .orElseThrow(() -> new RuntimeException("No class assigned to this lecturer")));
        } else {
            clazz = schoolClassRepository.findByClassTeacherIdNative(staffId)
                    .orElseThrow(() -> new RuntimeException("No class assigned to this lecturer"));
        }

        LocalDate date;
        if (dateStr == null || dateStr.trim().isEmpty()) {
            date = LocalDate.now();
        } else {
            date = LocalDate.parse(dateStr);
        }

        int activeSemester = semester != null ? semester : (clazz.getBatchYear() != null ? clazz.getBatchYear() : 1);

        List<Student> students = studentRepository.findStudentsByClassIdNative(clazz.getId());
        List<Attendance> existingAttendance = attendanceRepository.findClassAttendanceByDateNative(clazz.getId(), date);

        Map<UUID, Attendance> attendanceMap = existingAttendance.stream()
                .collect(Collectors.toMap(a -> a.getStudent().getId(), a -> a, (a1, a2) -> a1));

        List<StaffAttendanceStudentDto> studentDtos = students.stream().map(s -> {
            Attendance att = attendanceMap.get(s.getId());
            String status = att != null && att.getAttendanceStatus() != null ? att.getAttendanceStatus().name() : null;
            String attId = att != null ? att.getId().toString() : null;

            String avatarUrl = s.getGender() != null && s.getGender().equalsIgnoreCase("FEMALE")
                    ? "/avatars/female.png"
                    : "/avatars/male.jpg";

            return StaffAttendanceStudentDto.builder()
                    .id(s.getId().toString())
                    .studentId(s.getStudentId())
                    .name(s.getFirstName() + " " + s.getLastName())
                    .gender(s.getGender())
                    .avatarUrl(avatarUrl)
                    .status(status)
                    .attendanceId(attId)
                    .build();
        }).collect(Collectors.toList());

        String classLabel = clazz.getDepartment().getName() + " (Grade " + clazz.getBatchYear() + "-" + clazz.getSection() + ")";

        return StaffAttendanceClassDto.builder()
                .classId(clazz.getId().toString())
                .classLabel(classLabel)
                .recordDate(date.toString())
                .semester(activeSemester)
                .students(studentDtos)
                .build();
    }

    @Override
    @Transactional
    public void submitStaffAttendance(UUID institutionId, UUID staffId, AttendanceSubmitRequest request) {
        logger.info("[StaffAttendance] Submitting attendance list for staff: {}, date: {}", staffId, request.getRecordDate());

        SchoolClass clazz = schoolClassRepository.findByClassTeacherIdNative(staffId)
                .orElseThrow(() -> new RuntimeException("No class assigned to this lecturer"));

        LocalDate date = LocalDate.parse(request.getRecordDate());
        int semester = request.getSemester() != null ? request.getSemester() : 1;

        for (StudentAttendanceRecordDto recordDto : request.getRecords()) {
            UUID studentId = UUID.fromString(recordDto.getStudentId());
            Student student = studentRepository.findActiveByIdOnlyNative(recordDto.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found: " + recordDto.getStudentId()));

            Optional<Attendance> existingOpt = attendanceRepository.findByStudentIdAndRecordDateNative(studentId, date);
            AttendanceStatus status = AttendanceStatus.valueOf(recordDto.getStatus().toUpperCase());

            Attendance attendance;
            if (existingOpt.isPresent()) {
                attendance = existingOpt.get();
                attendance.setAttendanceStatus(status);
                attendance.setSemester(semester);
            } else {
                attendance = new Attendance();
                attendance.setStudent(student);
                attendance.setRecordDate(date);
                attendance.setSemester(semester);
                attendance.setAttendanceStatus(status);
                // Assign institution from student relation to avoid null fields
                attendance.setInstitution(student.getInstitution());
            }
            attendanceRepository.save(attendance);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public StaffAttendanceHistoryDto getStaffAttendanceHistory(UUID institutionId, UUID staffId, int limit) {
        logger.info("[StaffAttendance] Fetching history log for staff: {}, limit: {}", staffId, limit);

        SchoolClass clazz = schoolClassRepository.findByClassTeacherIdNative(staffId)
                .orElseThrow(() -> new RuntimeException("No class assigned to this lecturer"));

        List<Object[]> rawLogs = attendanceRepository.findClassAttendanceHistoryLogsNative(clazz.getId(), limit);
        List<DailyAttendanceLogDto> logs = new ArrayList<>();

        for (Object[] row : rawLogs) {
            String date = row[0].toString();
            long total = ((Number) row[1]).longValue();
            long present = ((Number) row[2]).longValue();
            long absent = ((Number) row[3]).longValue();
            long late = ((Number) row[4]).longValue();
            double rate = total > 0 ? ((double) present / total) * 100.0 : 0.0;
            rate = Math.round(rate * 10.0) / 10.0;

            logs.add(DailyAttendanceLogDto.builder()
                    .date(date)
                    .totalStudents(total)
                    .presentCount(present)
                    .absentCount(absent)
                    .lateCount(late)
                    .presentRate(rate)
                    .build());
        }

        String classLabel = clazz.getDepartment().getName() + " (Grade " + clazz.getBatchYear() + "-" + clazz.getSection() + ")";

        return StaffAttendanceHistoryDto.builder()
                .classLabel(classLabel)
                .logs(logs)
                .build();
    }
}
