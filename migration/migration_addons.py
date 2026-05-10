import random
import uuid
import sys
from faker import Faker
import mysql.connector

fake = Faker()

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Start#123",
    "database": "edutrack"
}

def uuid_bin():
    return uuid.uuid4().bytes

def generate_addons(cursor):
    print("Fetching existing data from DB...")
    
    # Fetch institutions
    cursor.execute("SELECT id FROM institutions")
    institutions = [r[0] for r in cursor.fetchall()]

    if not institutions:
        print("No institutions found. Please run migrationdb.py first.")
        return

    # Fetch students
    cursor.execute("SELECT id, institution_id FROM students")
    students = cursor.fetchall()
    
    # Fetch courses
    cursor.execute("SELECT id, institution_id FROM courses")
    courses = cursor.fetchall()
    courses_by_inst = {}
    for c_id, inst_id in courses:
        courses_by_inst.setdefault(inst_id, []).append(c_id)

    # Fetch staffs
    cursor.execute("SELECT id, institution_id FROM staffs")
    staffs = cursor.fetchall()
    staffs_by_inst = {}
    for s_id, inst_id in staffs:
        staffs_by_inst.setdefault(inst_id, []).append(s_id)
        
    # Fetch fees
    cursor.execute("SELECT id, institution_id, total_amount, status FROM fees")
    fees_all = cursor.fetchall()

    # Fetch buses
    cursor.execute("SELECT id, institution_id FROM buses")
    buses = cursor.fetchall()
    
    # 1. Attendances
    print("Generating attendances...")
    attn_data = []
    for s_id, inst_id in students:
        inst_courses = courses_by_inst.get(inst_id, [])
        if not inst_courses: continue
        # 10 random attendances per student
        for _ in range(10):
            a_id = uuid_bin()
            status = random.choice([0, 1, 2]) # e.g. Present, Absent, Late
            record_date = fake.date_between(start_date='-30d', end_date='today')
            c_id = random.choice(inst_courses)
            attn_data.append((a_id, inst_id, 0, status, record_date, c_id, s_id))
            
    if attn_data:
        cursor.executemany("""
            INSERT INTO attendances (id, created_at, institution_id, is_deleted, attendance_status, record_date, course_id, student_id)
            VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s)
        """, attn_data)

    # 2. Assessments
    print("Generating assessments...")
    ass_data = []
    for s_id, inst_id in students:
        inst_courses = courses_by_inst.get(inst_id, [])
        if not inst_courses: continue
        for _ in range(5):
            ass_id = uuid_bin()
            a_type = random.choice(["ASSIGNMENT", "MID_TERM", "FINAL", "QUIZ"])
            max_s = float(random.choice([20, 50, 100]))
            marks = float(round(random.uniform(0.4 * max_s, max_s), 2))
            c_id = random.choice(inst_courses)
            ass_data.append((ass_id, inst_id, 0, marks, max_s, a_type, c_id, s_id))
            
    if ass_data:
        cursor.executemany("""
            INSERT INTO assessments (id, created_at, institution_id, is_deleted, marks_obtained, max_score, type, course_id, student_id)
            VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s, %s)
        """, ass_data)

    # 3. Remarks
    print("Generating remarks...")
    rem_data = []
    for s_id, inst_id in students:
        inst_staffs = staffs_by_inst.get(inst_id, [])
        if not inst_staffs: continue
        for _ in range(3):
            r_id = uuid_bin()
            content = fake.sentence(nb_words=10)
            staff = random.choice(inst_staffs)
            rem_data.append((r_id, inst_id, 0, content, staff, s_id))
            
    if rem_data:
        cursor.executemany("""
            INSERT INTO remarks (id, created_at, institution_id, is_deleted, content, author_staff_id, target_student_id, remark_target)
            VALUES (%s, NOW(), %s, %s, %s, %s, %s, 'STUDENT')
        """, rem_data)


    # 4. Extra Fee Payments
    print("Generating extra fee payments...")
    pay_data = []
    for fee in fees_all:
        f_id, inst_id, total, f_status = fee
        # Let's add partial payments or additional payments
        if random.random() > 0.5:
            p_id = uuid_bin()
            paid = round(float(total) * random.uniform(0.1, 0.5), 2)
            method = random.choice(["Credit Card", "Bank Transfer", "Cash", "UPI"])
            p_status = random.choice(['PAID', 'PARTIAL', 'REFUNDED'])

            pay_date = fake.date_between(start_date='-60d', end_date='today')
            tx_id = fake.uuid4()[:16]
            pay_data.append((p_id, inst_id, 0, paid, pay_date, method, p_status, tx_id, f_id))
            
    if pay_data:
        cursor.executemany("""
            INSERT INTO payments (id, created_at, institution_id, is_deleted, amount_paid, payment_date, payment_method, payment_status, transaction_id, fee_id)
            VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s, %s, %s)
        """, pay_data)

    # 5. Buses Logs
    print("Generating buses logs...")
    log_data = []
    for b_id, inst_id in buses:
        for _ in range(15): # 15 travel logs per bus
            l_id = uuid_bin()
            arrival = fake.date_time_between(start_date='-30d', end_date='now')
            # Departure is usually some hours before arrival
            departure = fake.date_time_between_dates(datetime_start=arrival.replace(hour=max(0, arrival.hour-3)), datetime_end=arrival)
            log_data.append((l_id, inst_id, 0, arrival, departure, b_id))
            
    if log_data:
        cursor.executemany("""
            INSERT INTO buses_logs (id, created_at, institution_id, is_deleted, arrival_time, departure_time, bus_id)
            VALUES (%s, NOW(), %s, %s, %s, %s, %s)
        """, log_data)

if __name__ == "__main__":
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()
    try:
        generate_addons(cursor)
        conn.commit()
        print("🎉 SUCCESS: Addon data for existing records generated successfully!")
    except Exception as e:
        print("❌ ERROR:", e)
        conn.rollback()
    finally:
        cursor.close()
        conn.close()
