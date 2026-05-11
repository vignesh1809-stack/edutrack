package com.example.edutrack.entity;

import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import com.example.edutrack.entity.enums.StaffRoles;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import java.util.*;

import lombok.EqualsAndHashCode;
import jakarta.persistence.Index;

@Entity
@Table(name = "staffs", indexes = {
    @Index(name = "idx_staff_institution", columnList = "institution_id, id")
})
@AllArgsConstructor
@NoArgsConstructor
@Data  
@EqualsAndHashCode(callSuper = true)
public class Staff extends BaseEntity {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", insertable = false, updatable = false)
    @JsonIgnore
    private Institution institution;

    private String firstName;
    private String lastName;

    @Enumerated(EnumType.STRING)   
    private StaffRoles role;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String email;
    private String phone;
    private String avatarUrl;
    private String responsibilities;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 0")
    private boolean twoFactorEnabled;

    private LocalDateTime lastLogin;
    

    @OneToMany(mappedBy = "incharge", cascade = CascadeType.ALL)
    @JsonIgnore   
    private List<Buses> buses;

    @OneToMany(mappedBy = "authorStaff", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Remarks> remarks;

    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Courses> courses;



    
    
}
