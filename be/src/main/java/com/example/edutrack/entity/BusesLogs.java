package com.example.edutrack.entity;


import org.hibernate.annotations.UuidGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;
import java.time.LocalDateTime;

import lombok.EqualsAndHashCode;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "buses_logs", indexes = {
    @Index(name = "idx_bus_logs_time", columnList = "bus_id, arrivalTime")
})
@EqualsAndHashCode(callSuper = true)
public class BusesLogs extends BaseEntity {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", insertable = false, updatable = false)
    @JsonIgnore
    private Institution institution;
    
    @ManyToOne
    @JoinColumn(name = "bus_id", referencedColumnName = "id")
    private Buses bus;

    private LocalDateTime arrivalTime;
    private LocalDateTime departureTime;
}
