-- 1. POPULATE ASSESSMENTS
-- Creates records for each completed semester for every student
INSERT INTO assessments (id, institution_id, student_id, course_id, type, max_score, marks_obtained, created_at, is_deleted)
SELECT 
    UUID_TO_BIN(UUID()), 
    s.institution_id, 
    s.id, 
    c.id, 
    'EXAM', 
    100.00, 
    (70 + (RAND() * 25)), -- Random score between 70 and 95
    NOW(), 
    0
FROM students s
JOIN courses c ON s.department_id = c.department_id
WHERE c.semester <= s.current_semester
AND NOT EXISTS (SELECT 1 FROM assessments a WHERE a.student_id = s.id AND a.course_id = c.id);

-- 2. POPULATE ATTENDANCE (Last 8 Months / 240 Days)
-- Uses a Recursive CTE to generate all dates from 8 months ago until today
INSERT INTO attendances (id, institution_id, student_id, course_id, record_date, attendance_status, created_at, is_deleted)
WITH RECURSIVE date_range AS (
    SELECT CURDATE() - INTERVAL 8 MONTH AS dt
    UNION ALL
    SELECT dt + INTERVAL 1 DAY FROM date_range WHERE dt < CURDATE()
)
SELECT 
    UUID_TO_BIN(UUID()), 
    s.institution_id, 
    s.id, 
    (SELECT id FROM courses WHERE department_id = s.department_id LIMIT 1), 
    dr.dt,
    IF(RAND() > 0.12, 'PRESENT', 'ABSENT'), -- ~88% attendance rate
    NOW(),
    0
FROM students s
CROSS JOIN date_range dr
WHERE NOT EXISTS (
    SELECT 1 FROM attendances a 
    WHERE a.student_id = s.id 
    AND a.record_date = dr.dt
);

-- 3. POPULATE PENDING FEES
INSERT INTO fees (id, institution_id, student_id, fee_type, academic_year, term, total_amount, fine_amount, due_date, status, created_at, is_deleted)
SELECT 
    UUID_TO_BIN(UUID()), 
    s.institution_id, 
    s.id, 
    'TUITION', 
    '2024-25', 
    'TERM-1', 
    5000.00, 
    0.00, 
    CURDATE() + INTERVAL 30 DAY, 
    'PENDING', 
    NOW(), 
    0
FROM students s
WHERE NOT EXISTS (SELECT 1 FROM fees f WHERE f.student_id = s.id AND f.status = 'PENDING');

-- 4. POPULATE REMARKS
INSERT INTO remarks (id, institution_id, target_student_id, author_staff_id, remark_target, remark_category, content, created_at, is_deleted)
SELECT 
    UUID_TO_BIN(UUID()), 
    s.institution_id, 
    s.id, 
    (SELECT id FROM staff WHERE institution_id = s.institution_id LIMIT 1),
    'STUDENT',
    'ACADEMIC',
    'Student is showing consistent improvement in technical labs and theory.',
    NOW(),
    0
FROM students s
WHERE NOT EXISTS (SELECT 1 FROM remarks r WHERE r.target_student_id = s.id);
