package com.example.edutrack.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface StudentFinancialProjection {
    BigDecimal getPendingAmount();
    LocalDate getDueDate();
}
