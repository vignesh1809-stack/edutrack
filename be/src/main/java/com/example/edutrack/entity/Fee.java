package com.example.edutrack.entity;

import com.example.edutrack.entity.enums.FeeType;
import com.example.edutrack.entity.enums.FeeStatus;

import org.hibernate.annotations.UuidGenerator;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.*;

import java.math.BigDecimal;
import lombok.EqualsAndHashCode;
import jakarta.persistence.Index;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "fees", indexes = {
    @Index(name = "idx_fees_student", columnList = "institution_id, student_id")
})
@EqualsAndHashCode(callSuper = true)
public class Fee extends BaseEntity {


    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    
    @ManyToOne
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @JoinColumn(name = "student_id", nullable = false, columnDefinition = "BINARY(16)")
    private Student student;

    @Enumerated(EnumType.STRING)
    private FeeType feeType;

    private String academicYear;
    private String term;
    private BigDecimal fineAmount; 
    private BigDecimal totalAmount;
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private FeeStatus status; 

}
