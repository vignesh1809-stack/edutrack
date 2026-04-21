package com.example.edutrack.entity;

import com.example.edutrack.entity.enums.AttendanceStatus;
import org.hibernate.annotations.UuidGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;


import lombok.EqualsAndHashCode;
import jakarta.persistence.Index;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "attendances", indexes = {
    @Index(name = "idx_attendance_main", columnList = "institution_id, student_id, recordDate"),
    @Index(name = "idx_attendance_date", columnList = "institution_id, recordDate")
})
@EqualsAndHashCode(callSuper = true)
public class Attendance extends BaseEntity {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", insertable = false, updatable = false)
    @JsonIgnore
    private Institution institution;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false, columnDefinition = "BINARY(16)")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false, columnDefinition = "BINARY(16)")
    private Courses course;

    private LocalDate recordDate;
    private AttendanceStatus attendanceStatus;
    
}
