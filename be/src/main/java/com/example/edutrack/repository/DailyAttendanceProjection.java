package com.example.edutrack.repository;

import java.time.LocalDate;

public interface DailyAttendanceProjection {
    LocalDate getRecordDate();
    Long getPresentCount();
    Long getTotalCount();
}
