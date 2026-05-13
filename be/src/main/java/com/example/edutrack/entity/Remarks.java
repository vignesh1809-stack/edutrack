package com.example.edutrack.entity;

import java.util.UUID;
import org.hibernate.annotations.UuidGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.example.edutrack.entity.enums.RemarkCategory;
import com.example.edutrack.entity.enums.RemarkTarget;
import com.example.edutrack.entity.enums.RemarkStatus;
import com.example.edutrack.entity.enums.RemarkPriority;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "remarks", indexes = {
    @Index(name = "idx_remarks_student", columnList = "institution_id, target_student_id")
})
@EqualsAndHashCode(callSuper = true)
public class Remarks extends BaseEntity {

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
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @JoinColumn(name = "target_student_id", referencedColumnName = "id", columnDefinition = "BINARY(16)")
    private Student targetStudent;

    @ManyToOne(fetch = FetchType.LAZY)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @JoinColumn(name = "target_staff_id", referencedColumnName = "id", columnDefinition = "BINARY(16)")
    private Staff targetStaff;

    @ManyToOne(fetch = FetchType.LAZY)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @JoinColumn(name = "author_staff_id", referencedColumnName = "id", columnDefinition = "BINARY(16)")
    private Staff authorStaff;

    @ManyToOne(fetch = FetchType.LAZY)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @JoinColumn(name = "author_student_id", referencedColumnName = "id", columnDefinition = "BINARY(16)")
    private Student authorStudent;

    @ManyToOne(fetch = FetchType.LAZY)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @JoinColumn(name = "author_guardian_id", referencedColumnName = "id", columnDefinition = "BINARY(16)")
    private Guardian authorGuardian;

    @Column(name = "ai_suggestion", length = 2000)
    private String aiSuggestion;

    @Column(name = "ai_suggestion_type", length = 50)
    private String aiSuggestionType;

    private String subject;
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "remark_target")
    private RemarkTarget target;

    @Enumerated(EnumType.STRING)
    @Column(name = "remark_category")
    private RemarkCategory category;

    @Enumerated(EnumType.STRING)
    @Column(name = "remark_status")
    private RemarkStatus status = RemarkStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "remark_priority")
    private RemarkPriority priority = RemarkPriority.LOW;

    @Column(length = 1000)
    private String principalAction;

    private LocalDateTime resolvedAt;
}
