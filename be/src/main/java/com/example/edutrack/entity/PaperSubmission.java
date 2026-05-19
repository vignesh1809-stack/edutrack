package com.example.edutrack.entity;

import com.example.edutrack.entity.enums.SubmissionStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "paper_submissions")
@EqualsAndHashCode(callSuper = true)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PaperSubmission extends BaseEntity {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @JoinColumn(name = "student_id", nullable = false, columnDefinition = "BINARY(16)")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "department", "guardians", "bus", "remarksTargeted", "remarksAuthored", "fees", "assessments", "attendance"})
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @JoinColumn(name = "course_id", columnDefinition = "BINARY(16)")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "department", "staff", "assessments"})
    private Courses course;

    @Column(name = "exam_type", length = 100)
    private String examType;

    @Column(name = "academic_year", length = 50)
    private String academicYear;

    @Column(length = 20)
    private String section;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private SubmissionStatus status;

    @Column(name = "max_score")
    private BigDecimal maxScore;

    @Column(name = "marks_obtained")
    private BigDecimal marksObtained;

    @Column(name = "overall_feedback", columnDefinition = "TEXT")
    private String overallFeedback;

    @Column(name = "question_paper_url", length = 512)
    private String questionPaperUrl;

    @Column(name = "answer_key_url", length = 512)
    private String answerKeyUrl;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PaperSubmissionPage> pages = new ArrayList<>();

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PaperSubmissionQuestion> questions = new ArrayList<>();
}
