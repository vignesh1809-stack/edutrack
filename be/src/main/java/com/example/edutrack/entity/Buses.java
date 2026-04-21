package com.example.edutrack.entity;

import java.util.UUID;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "buses", indexes = {
    @Index(name = "idx_buses_institution", columnList = "institution_id, id")
})
@EqualsAndHashCode(callSuper = true)
public class Buses extends BaseEntity {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", insertable = false, updatable = false)
    @JsonIgnore
    private Institution institution;

    private String busNumber;
    private String driverName;
    private String route;
    private int totalStudents;
    
    @ManyToOne
    @JoinColumn(name = "incharge_id", referencedColumnName = "id", columnDefinition = "BINARY(16)")
    private Staff incharge;
    
}
