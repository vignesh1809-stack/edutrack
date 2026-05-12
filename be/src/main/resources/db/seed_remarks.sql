    -- SQL Script to fill dummy remarks data for testing Principal Remarks Suite
    USE edutrack;

    -- 1. Clear existing remarks (optional, for clean testing)
    -- DELETE FROM remarks;

    -- 2. Insert Campus Remarks (Posted by Students)
    INSERT INTO remarks (id, created_at, institution_id, is_deleted, content, author_student_id, remark_target, remark_status, remark_priority, remark_category)
    SELECT 
        UNHEX(REPLACE(UUID(), '-', '')),
        DATE_SUB(NOW(), INTERVAL (FLOOR(RAND() * 30)) DAY),
        institution_id,
        0,
        CASE FLOOR(RAND() * 5)
            WHEN 0 THEN 'Library AC is not working properly in the south wing.'
            WHEN 1 THEN 'Cafeteria food quality has declined this week.'
            WHEN 2 THEN 'More sports equipment needed in the gymnasium.'
            WHEN 3 THEN 'Parking lot lights are flickering, feels unsafe at night.'
            ELSE 'Wi-Fi signal is very weak in the common rooms.'
        END,
        id,
        'CAMPUS',
        CASE FLOOR(RAND() * 3)
            WHEN 0 THEN 'PENDING'
            WHEN 1 THEN 'REVIEWED'
            ELSE 'RESOLVED'
        END,
        CASE FLOOR(RAND() * 4)
            WHEN 0 THEN 'LOW'
            WHEN 1 THEN 'MEDIUM'
            WHEN 2 THEN 'HIGH'
            ELSE 'CRITICAL'
        END,
        'CAMPUS_LIFE'
    FROM students
    ORDER BY RAND()
    LIMIT 50;

    -- 3. Insert Staff Remarks (Posted by Students)
    INSERT INTO remarks (id, created_at, institution_id, is_deleted, content, author_student_id, target_staff_id, remark_target, remark_status, remark_priority, remark_category)
    SELECT 
        UNHEX(REPLACE(UUID(), '-', '')),
        DATE_SUB(NOW(), INTERVAL (FLOOR(RAND() * 30)) DAY),
        s.institution_id,
        0,
        CASE FLOOR(RAND() * 3)
            WHEN 0 THEN 'The teaching methodology for this subject is very effective and engaging.'
            WHEN 1 THEN 'Assignments are being returned quite late, making it hard to track progress.'
            ELSE 'Professor is always available for doubt clearing after classes. Very helpful.'
        END,
        s.id,
        (SELECT id FROM staffs WHERE institution_id = s.institution_id ORDER BY RAND() LIMIT 1),
        'STAFF',
        CASE FLOOR(RAND() * 3)
            WHEN 0 THEN 'PENDING'
            WHEN 1 THEN 'REVIEWED'
            ELSE 'RESOLVED'
        END,
        CASE FLOOR(RAND() * 3)
            WHEN 0 THEN 'LOW'
            WHEN 1 THEN 'MEDIUM'
            ELSE 'HIGH'
        END,
        'ACADEMIC'
    FROM students s
    ORDER BY RAND()
    LIMIT 50;

    -- 4. Update resolved remarks to have a resolved_at date
    UPDATE remarks 
    SET resolved_at = DATE_ADD(created_at, INTERVAL (FLOOR(RAND() * 48)) HOUR)
    WHERE remark_status = 'RESOLVED' AND resolved_at IS NULL;
