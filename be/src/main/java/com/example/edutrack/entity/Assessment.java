package com.example.edutrack.entity;

import org.hibernate.annotations.UuidGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
import java.math.BigDecimal;
import lombok.EqualsAndHashCode;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "assessments", indexes = {
    @Index(name = "idx_assessment_main", columnList = "institution_id, student_id, course_id")
})
@EqualsAndHashCode(callSuper = true)
public class Assessment extends BaseEntity {

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
    @JoinColumn(name = "course_id", nullable = false, columnDefinition = "BINARY(16)")
    private Courses course;

    @Column(length = 20)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false, columnDefinition = "BINARY(16)")
    private Student student;

    private BigDecimal maxScore;
    private BigDecimal marksObtained;

    
}
