package com.example.edutrack.entity;

import org.hibernate.annotations.UuidGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "classes", indexes = {
    @Index(name = "idx_classes_lookup", columnList = "institution_id, department_id, batch_year, section")
})
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SchoolClass extends BaseEntity {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", insertable = false, updatable = false)
    @JsonIgnore
    private Institution institution;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    @JsonIgnoreProperties({"students", "courses"})
    private Department department;

    @Column(columnDefinition = "YEAR")
    private Integer batchYear;

    private String section;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_teacher_id")
    @JsonIgnoreProperties({"buses", "remarks", "courses", "department"})
    private Staff classTeacher;

    @OneToMany(mappedBy = "schoolClass", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Student> students;
}
