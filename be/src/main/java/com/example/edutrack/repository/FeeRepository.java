package com.example.edutrack.repository;

import com.example.edutrack.entity.Fee;
import com.example.edutrack.entity.enums.FeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FeeRepository extends JpaRepository<Fee, UUID> {
    
    @Query("SELECT f FROM Fee f WHERE f.student.id = :studentId AND f.student.institution.id = :institutionId")
    List<Fee> findByStudentId(@Param("studentId") UUID studentId, @Param("institutionId") UUID institutionId);

    @Query("SELECT f FROM Fee f WHERE f.student.id = :studentId AND f.status != :status")
    List<Fee> findByStudentIdAndStatusNot(@Param("studentId") UUID studentId, @Param("status") FeeStatus status);

    @Query(value = """
            SELECT 
                COALESCE(SUM(CASE WHEN f.status IN ('DUE', 'PARTIAL', 'PENDING') THEN f.total_amount + COALESCE(f.fine_amount, 0) ELSE 0 END), 0) AS pendingAmount,
                MIN(CASE WHEN f.status IN ('DUE', 'PARTIAL', 'PENDING') THEN f.due_date END) AS dueDate
            FROM students s
            LEFT JOIN fees f ON s.id = f.student_id
            WHERE s.id = UUID_TO_BIN(:studentId) 
              AND s.institution_id = UUID_TO_BIN(:instId)
            GROUP BY s.id
            """, nativeQuery = true)
    com.example.edutrack.dto.StudentFinancialProjection findStudentFinancialSummary(@Param("studentId") String studentId, @Param("instId") String instId);
}
