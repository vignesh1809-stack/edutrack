package com.example.edutrack.entity;

import org.hibernate.annotations.UuidGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
import lombok.EqualsAndHashCode;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "guardians", indexes = {
    @Index(name = "idx_guardians_institution", columnList = "institution_id, id")
})
@EqualsAndHashCode(callSuper = true)
public class Guardian extends BaseEntity {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.BINARY)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", insertable = false, updatable = false)
    @JsonIgnore
    private Institution institution;

    private String name;

    private String phone;
    private String email;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    
    private String address;
    private String occupation;
    private String relation;

    @ManyToMany(mappedBy = "guardians")
    private java.util.List<Student> students;
}
