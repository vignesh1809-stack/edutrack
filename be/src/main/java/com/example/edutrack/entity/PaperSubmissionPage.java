package com.example.edutrack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "paper_submission_pages")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PaperSubmissionPage {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @JoinColumn(name = "submission_id", nullable = false, columnDefinition = "BINARY(16)")
    @JsonIgnore
    private PaperSubmission submission;

    @Column(name = "page_number")
    private Integer pageNumber;

    @Column(name = "image_url", length = 512)
    private String imageUrl;

    @Column(name = "md5_hash", length = 32)
    private String md5Hash;

    @Column(name = "ocr_text", columnDefinition = "TEXT")
    private String ocrText;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
