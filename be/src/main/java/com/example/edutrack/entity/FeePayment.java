package com.example.edutrack.entity;

import com.example.edutrack.entity.enums.PaymentStatus;
import java.time.LocalDate;
import java.util.UUID;
import org.hibernate.annotations.UuidGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "payments", indexes = {
    @Index(name = "idx_payments_fee", columnList = "institution_id, fee_id")
})
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class FeePayment extends BaseEntity {
    
    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", insertable = false, updatable = false)
    @JsonIgnore
    private Institution institution;

    @ManyToOne
    @JoinColumn(name = "fee_id", nullable = false, columnDefinition = "BINARY(16)")
    private Fee fee;

    private BigDecimal amountPaid;
    private LocalDate paymentDate;
    private String paymentMethod;
    private String transactionId;
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

}
