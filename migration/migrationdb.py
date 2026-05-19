import random
import uuid
import sys
from faker import Faker
import mysql.connector

fake = Faker()

# DB CONFIG
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Start#123",
    "database": "edutrack"
}

NUM_INSTITUTIONS = 10
RECORDS = 1000

institutions = []
departments_by_inst = {}
staffs_by_inst = {}
lecturers_by_inst = {}
buses_by_inst = {}
students_by_inst = {}
courses_by_inst = {}
guardians_by_inst = {}
classes_by_inst = {}
fees_all = []

# Enum choices based on DB schema
STATUS_CHOICES = ['AT_RISK', 'CRITICAL', 'GOOD']
STAFF_ROLES = ['Accountant','Administrator','Head_of_Department','Lab_Assistant','Lecturer','Librarian','Office_Staff','Sports_and_Discipline','Transport_Incharge']
FEE_TYPES = ['EXAM', 'HOSTEL', 'TRANSPORT', 'TUITION']
FEE_STATUS = ['DUE', 'PAID', 'PARTIAL']

def uuid_bin():
    return uuid.uuid4().bytes

def create_institutions(cursor):
    data = []
    for _ in range(NUM_INSTITUTIONS):
        inst_id = uuid_bin()
        name = fake.unique.company()
        slug = name.lower().replace(" ", "-") + "-" + fake.uuid4()[:8]
        address = fake.address()
        email = fake.company_email()
        phone = fake.phone_number()[:20]
        data.append((inst_id, address, email, 0, name, phone, slug))
        institutions.append(inst_id)
        departments_by_inst[inst_id] = []
        staffs_by_inst[inst_id] = []
        lecturers_by_inst[inst_id] = []
        buses_by_inst[inst_id] = []
        students_by_inst[inst_id] = []
        courses_by_inst[inst_id] = []
        
    cursor.executemany("""
        INSERT INTO institutions (id, created_at, address, email, is_deleted, name, phone, slug)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s)
    """, data)

def create_departments(cursor):
    data = []
    for inst in institutions:
        for _ in range(5):
            dept_id = uuid_bin()
            code = fake.word().upper()[:10]
            name = fake.job()[:50]
            data.append((dept_id, inst, 0, code, name))
            departments_by_inst[inst].append(dept_id)
            
    cursor.executemany("""
        INSERT INTO departments (id, created_at, institution_id, is_deleted, code, name)
        VALUES (%s, NOW(), %s, %s, %s, %s)
    """, data)

def create_staffs(cursor):
    data = []
    for inst in institutions:
        for i in range(20):
            staff_id = uuid_bin()
            fname = fake.first_name()
            lname = fake.last_name()
            email = fake.unique.email()
            password = "hashed_password"
            phone = fake.phone_number()[:20]
            role = 'Lecturer' if i < 12 else random.choice(STAFF_ROLES)
            data.append((staff_id, inst, 0, email, fname, lname, password, phone, role, 0))
            staffs_by_inst[inst].append(staff_id)
            if role == 'Lecturer':
                lecturers_by_inst[inst].append(staff_id)
            
    cursor.executemany("""
        INSERT INTO staffs (id, created_at, institution_id, is_deleted, email, first_name, last_name, password, phone, role, two_factor_enabled)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, data)

def create_guardians(cursor):
    data = []
    guardian_ids = []
    for inst in institutions:
        guardians_by_inst[inst] = []
        for _ in range(30):
            gid = uuid_bin()
            name = fake.name()
            email = fake.unique.email()
            phone = fake.phone_number()[:20]
            data.append((gid, inst, 0, email, name, phone))
            guardian_ids.append(gid)
            guardians_by_inst[inst].append(gid)
            
    cursor.executemany("""
        INSERT INTO guardians (id, created_at, institution_id, is_deleted, email, name, phone)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s)
    """, data)

def create_buses(cursor):
    data = []
    for inst in institutions:
        for _ in range(3):
            bus_id = uuid_bin()
            bus_num = fake.license_plate()
            driver = fake.name()
            route = fake.street_name()
            tot_students = random.randint(30, 50)
            incharge = random.choice(staffs_by_inst[inst])
            data.append((bus_id, inst, 0, bus_num, driver, route, tot_students, incharge))
            buses_by_inst[inst].append(bus_id)
            
    cursor.executemany("""
        INSERT INTO buses (id, created_at, institution_id, is_deleted, bus_number, driver_name, route, total_students, incharge_id)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s, %s)
    """, data)

def create_classes(cursor):
    data = []
    for inst in institutions:
        classes_by_inst[inst] = []
        lecturer_staffs = lecturers_by_inst.get(inst, [])
        if not lecturer_staffs:
            lecturer_staffs = staffs_by_inst.get(inst, [])
        
        for dept in departments_by_inst[inst]:
            for year in [2024, 2025, 2026]:
                for sec in ['A', 'B']:
                    class_id = uuid_bin()
                    teacher_id = random.choice(lecturer_staffs) if lecturer_staffs else None
                    data.append((class_id, inst, 0, year, sec, dept, teacher_id))
                    classes_by_inst[inst].append(class_id)
                    
    cursor.executemany("""
        INSERT INTO classes (id, created_at, institution_id, is_deleted, batch_year, section, department_id, class_teacher_id)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s)
    """, data)

def create_students(cursor):
    data = []
    for inst in institutions:
        for _ in range(RECORDS // NUM_INSTITUTIONS):
            sid = uuid_bin()
            fname = fake.first_name()
            lname = fake.last_name()
            email = fake.unique.email()
            clazz = random.choice(classes_by_inst[inst])
            bus = random.choice(buses_by_inst[inst])
            is_hosteller = random.choice([0, 1])
            status = random.choice(STATUS_CHOICES)
            student_id_str = fake.bothify(text='STU-####')
            cgpa = round(random.uniform(2.0, 4.0), 2)
            data.append((sid, inst, 0, cgpa, email, fname, lname, is_hosteller, status, student_id_str, bus, clazz))
            students_by_inst[inst].append(sid)
            
    cursor.executemany("""
        INSERT INTO students (id, created_at, institution_id, is_deleted, cgpa, email, first_name, last_name, is_hosteller, status, student_id, bus_id, class_id)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, data)

def create_courses(cursor):
    data = []
    for inst in institutions:
        for _ in range(10):
            cid = uuid_bin()
            name = fake.job()[:50]
            sem = random.randint(1, 8)
            dept = random.choice(departments_by_inst[inst])
            data.append((cid, inst, 0, name, sem, dept))
            courses_by_inst[inst].append(cid)
            
    cursor.executemany("""
        INSERT INTO courses (id, created_at, institution_id, is_deleted, course_name, semester, department_id)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s)
    """, data)

def create_fees(cursor):
    data = []
    for inst in institutions:
        for _ in range(50):
            fid = uuid_bin()
            student = random.choice(students_by_inst[inst])
            total = round(random.uniform(1000, 5000), 2)
            f_type = random.choice(FEE_TYPES)
            f_status = random.choice(FEE_STATUS)
            term = "Fall 2026"
            ac_year = "2026-2027"
            data.append((fid, inst, 0, ac_year, f_type, f_status, term, total, student))
            fees_all.append((fid, inst, f_status, total))
            
    cursor.executemany("""
        INSERT INTO fees (id, created_at, institution_id, is_deleted, academic_year, fee_type, status, term, total_amount, student_id)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s, %s, %s)
    """, data)

def create_payments(cursor):
    data = []
    for fee in fees_all:
        fid, inst, f_status, total = fee
        if f_status != 'DUE':
            pid = uuid_bin()
            paid = total if f_status == 'PAID' else round(total / 2, 2)
            method = "Credit Card"
            p_status = 1
            data.append((pid, inst, 0, paid, method, p_status, fid))
            
    cursor.executemany("""
        INSERT INTO payments (id, created_at, institution_id, is_deleted, amount_paid, payment_method, payment_status, fee_id)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s)
    """, data)

def create_student_guardian_map(cursor):
    data = []
    for inst, students in students_by_inst.items():
        guardians = guardians_by_inst.get(inst, [])
        if not guardians:
            continue
        for s_id in students:
            num_guardians = random.choice([1, 1, 1, 2])
            assigned = random.sample(guardians, min(num_guardians, len(guardians)))
            for g_id in assigned:
                data.append((s_id, g_id))
    cursor.executemany("""
        INSERT INTO student_guardian_map (student_id, guardian_id)
        VALUES (%s, %s)
    """, data)

if __name__ == "__main__":
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()
    print("🚀 Generating dummy data...")
    try:
        create_institutions(cursor)
        create_departments(cursor)
        create_staffs(cursor)
        create_guardians(cursor)
        create_buses(cursor)
        create_classes(cursor)
        create_students(cursor)
        create_courses(cursor)
        create_fees(cursor)
        create_payments(cursor)
        create_student_guardian_map(cursor)
        conn.commit()
        print("🎉 SUCCESS: Data generated successfully!")
    except Exception as e:
        print("❌ ERROR:", e)
        conn.rollback()
    finally:
        cursor.close()
        conn.close()