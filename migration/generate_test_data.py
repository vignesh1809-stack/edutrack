import mysql.connector
import uuid
import random
from datetime import datetime, timedelta

# DB CONFIG from your migrationdb.py
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Start#123",
    "database": "edutrack"
}

def uuid_bin():
    return uuid.uuid4().bytes

def generate_data():
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor(dictionary=True)
    
    print("🚀 Starting Test Data Generation...")

    try:
        # 1. Fetch Students
        cursor.execute("SELECT id, institution_id, department_id, current_semester FROM students WHERE is_deleted = 0")
        students = cursor.fetchall()
        print(f"Found {len(students)} students.")

        # 2. Fetch Courses for all departments
        cursor.execute("SELECT id, department_id, semester FROM courses WHERE is_deleted = 0")
        courses_all = cursor.fetchall()
        courses_by_dept = {}
        for c in courses_all:
            dept_id = c['department_id']
            if dept_id not in courses_by_dept:
                courses_by_dept[dept_id] = []
            courses_by_dept[dept_id].append(c)

        # 3. Fetch a staff member per institution for remarks
        cursor.execute("SELECT id, institution_id FROM staffs WHERE is_deleted = 0")
        staff_by_inst = {s['institution_id']: s['id'] for s in cursor.fetchall()}

        # Lists for batch inserts
        assessments_data = []
        attendance_data = []
        fees_data = []
        remarks_data = []

        # Date range for attendance (Last 8 months)
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=240)
        dates = []
        curr = start_date
        while curr <= end_date:
            dates.append(curr)
            curr += timedelta(days=1)

        print(f"Generating data for {len(dates)} days...")

        for s in students:
            sid = s['id']
            inst_id = s['institution_id']
            dept_id = s['department_id']
            current_sem = s['current_semester'] or 1

            # A. Assessments for completed semesters
            if dept_id in courses_by_dept:
                relevant_courses = [c for c in courses_by_dept[dept_id] if c['semester'] <= current_sem]
                for c in relevant_courses:
                    marks = round(random.uniform(70, 98), 2)
                    assessments_data.append((uuid_bin(), inst_id, sid, c['id'], 'EXAM', 100, marks, 0))

            # B. Attendance for 8 months
            if dept_id in courses_by_dept:
                course_id = courses_by_dept[dept_id][0]['id'] # Just pick first course for general attendance
                for dt in dates:
                    status = 'PRESENT' if random.random() > 0.12 else 'ABSENT'
                    attendance_data.append((uuid_bin(), inst_id, sid, course_id, dt, status, 0))

            # C. Pending Fee
            due_date = end_date + timedelta(days=30)
            fees_data.append((uuid_bin(), inst_id, sid, 'TUITION', '2024-25', 'TERM-1', 5000.00, 0.00, due_date, 'PENDING', 0))

            # D. Staff Remark
            if inst_id in staff_by_inst:
                remarks_data.append((uuid_bin(), inst_id, sid, staff_by_inst[inst_id], 'STUDENT', 'ACADEMIC', 
                                    'Showing consistent improvement in core concepts and laboratory performance.', 0))

        # Perform Batch Inserts
        if assessments_data:
            cursor.executemany("""
                INSERT IGNORE INTO assessments (id, institution_id, student_id, course_id, type, max_score, marks_obtained, created_at, is_deleted)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), %s)
            """, assessments_data)
            print(f"✅ Inserted {len(assessments_data)} assessment records.")

        if attendance_data:
            # Batching attendance as it can be very large
            batch_size = 5000
            for i in range(0, len(attendance_data), batch_size):
                cursor.executemany("""
                    INSERT IGNORE INTO attendances (id, institution_id, student_id, course_id, record_date, attendance_status, created_at, is_deleted)
                    VALUES (%s, %s, %s, %s, %s, %s, NOW(), %s)
                """, attendance_data[i:i+batch_size])
            print(f"✅ Inserted {len(attendance_data)} attendance records.")

        if fees_data:
            cursor.executemany("""
                INSERT IGNORE INTO fees (id, institution_id, student_id, fee_type, academic_year, term, total_amount, fine_amount, due_date, status, created_at, is_deleted)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), %s)
            """, fees_data)
            print(f"✅ Inserted {len(fees_data)} fee records.")

        if remarks_data:
            cursor.executemany("""
                INSERT IGNORE INTO remarks (id, institution_id, target_student_id, author_staff_id, remark_target, remark_category, content, created_at, is_deleted)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), %s)
            """, remarks_data)
            print(f"✅ Inserted {len(remarks_data)} remark records.")

        conn.commit()
        print("🎉 SUCCESS: All test data generated!")

    except Exception as e:
        print(f"❌ ERROR: {e}")
        conn.rollback()
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    generate_data()
