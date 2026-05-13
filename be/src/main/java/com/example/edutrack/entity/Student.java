package com.example.edutrack.entity;

import java.time.LocalDate;
import java.util.UUID;
import java.util.List;
import java.math.BigDecimal;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.edutrack.entity.enums.StudentStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.type.SqlTypes;

import lombok.EqualsAndHashCode;

@Entity
@Table(name = "students", indexes = {
    @Index(name = "idx_student_lookup", columnList = "institution_id, id"),
    // email dropped from search index — combined UTF8MB4 key would exceed MySQL's 3072-byte limit.
    // Email lookups use a separate query with findByInstitutionIdAndPhone.
    @Index(name = "idx_student_search", columnList = "institution_id, firstName, lastName")
})
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class Student extends BaseEntity {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @JdbcTypeCode(SqlTypes.BINARY)
    @Column(columnDefinition = "BINARY(16)", nullable = false, updatable = false)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", insertable = false, updatable = false)
    @JsonIgnore
    private Institution institution;

    private String studentId;
    private String firstName;
    private String lastName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JdbcTypeCode(SqlTypes.BINARY)
    @JoinColumn(name = "department_id", nullable = false, columnDefinition = "BINARY(16)")
    private Department department;

    @Enumerated(EnumType.STRING)   
    private StudentStatus status;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String avatarUrl;
    private String phone;
    private String address;
    private String email;
    private String gender;
    private LocalDate dateOfBirth;
    private String bloodGroup;
    @Column(columnDefinition = "TINYINT(1) DEFAULT 0")
    private boolean isHosteller;
    @Column(columnDefinition = "TINYINT(1) DEFAULT 0")
    private boolean twoFactorEnabled;

    private BigDecimal CGPA;
    @Column(columnDefinition = "YEAR")
    private Integer batchYear;
    private String section;
    private int currentSemester;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "student_guardian_map",
        joinColumns = @JoinColumn(name = "student_id", columnDefinition = "BINARY(16)"),
        inverseJoinColumns = @JoinColumn(name = "guardian_id", columnDefinition = "BINARY(16)")
    )
    private List<Guardian> guardians;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bus_id", nullable = true)
    private Buses bus;

    @OneToMany(mappedBy = "targetStudent", cascade = CascadeType.ALL)
    private List<Remarks> remarksTargeted;

    @OneToMany(mappedBy = "authorStudent", cascade = CascadeType.ALL)
    private List<Remarks> remarksAuthored;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Fee> fees;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Assessment> assessments;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Attendance> attendance;
    
}
