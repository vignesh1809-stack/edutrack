package com.example.edutrack.entity;

import java.util.UUID;
import org.hibernate.annotations.UuidGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.example.edutrack.entity.enums.RemarkCategory;
import com.example.edutrack.entity.enums.RemarkTarget;
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
    @Index(name = "idx_remarks_student", columnList = "institution_id, student_id")
})
@EqualsAndHashCode(callSuper = true)
public class Remarks extends BaseEntity {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", insertable = false, updatable = false)
    @JsonIgnore
    private Institution institution;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_student_id", referencedColumnName = "id", columnDefinition = "BINARY(16)")
    private Student targetStudent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_staff_id", referencedColumnName = "id", columnDefinition = "BINARY(16)")
    private Staff targetStaff;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_staff_id", referencedColumnName = "id", columnDefinition = "BINARY(16)")
    private Staff authorStaff;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_student_id", referencedColumnName = "id", columnDefinition = "BINARY(16)")
    private Student authorStudent;

    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "remark_target")
    private RemarkTarget target;

    @Enumerated(EnumType.STRING)
    @Column(name = "remark_category")
    private RemarkCategory category;
}
