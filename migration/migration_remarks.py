import random
import uuid
import mysql.connector
from faker import Faker

fake = Faker()

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Start#123",
    "database": "edutrack"
}

def uuid_bin():
    return uuid.uuid4().bytes

def generate_remarks():
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor(dictionary=True)
    
    # Get all institutions
    cursor.execute("SELECT id FROM institutions")
    institutions = [row['id'] for row in cursor.fetchall()]
    
    # Get staffs by institution
    staffs_by_inst = {inst: [] for inst in institutions}
    cursor.execute("SELECT id, institution_id FROM staffs")
    for row in cursor.fetchall():
        staffs_by_inst[row['institution_id']].append(row['id'])
        
    # Get students by institution
    students_by_inst = {inst: [] for inst in institutions}
    cursor.execute("SELECT id, institution_id FROM students")
    for row in cursor.fetchall():
        students_by_inst[row['institution_id']].append(row['id'])

    data = []
    for inst in institutions:
        staffs = staffs_by_inst.get(inst, [])
        students = students_by_inst.get(inst, [])
        
        if not staffs:
            continue
            
        for _ in range(50): # 50 remarks per institution
            remark_id = uuid_bin()
            is_deleted = 0
            content = fake.sentence(nb_words=10)
            
            # Determine Author (50% staff, 50% student)
            author_is_staff = random.random() < 0.5
            
            author_staff_id = None
            author_student_id = None
            target_staff_id = None
            target_student_id = None
            category = None
            
            if author_is_staff and staffs and students:
                author_staff_id = random.choice(staffs)
                # Staff can ONLY add remark for student
                target = 'STUDENT'
                target_student_id = random.choice(students)
                category = random.choice(['ACADEMIC', 'BEHAVIORAL', 'ATTENDANCE', 'OTHER'])
            elif not author_is_staff and students and staffs:
                author_student_id = random.choice(students)
                # Student can add remark for campus or staff
                target = random.choice(['STAFF', 'CAMPUS'])
                if target == 'STAFF':
                    target_staff_id = random.choice(staffs)
                    category = random.choice(['ACADEMIC', 'BEHAVIORAL', 'ATTENDANCE', 'OTHER'])
                elif target == 'CAMPUS':
                    pass # category is null
            else:
                continue # Skip if no author/target available
                
            data.append((
                remark_id, inst, is_deleted, content,
                author_staff_id, author_student_id,
                target_staff_id, target_student_id,
                target, category
            ))

    if data:
        cursor.executemany("""
            INSERT INTO remarks (
                id, created_at, institution_id, is_deleted, content,
                author_staff_id, author_student_id,
                target_staff_id, target_student_id,
                remark_target, remark_category
            ) VALUES (
                %s, NOW(), %s, %s, %s,
                %s, %s,
                %s, %s,
                %s, %s
            )
        """, data)
        conn.commit()
        print(f"✅ Successfully inserted {len(data)} polymorphic remarks!")
    else:
        print("⚠️ No remarks generated. Ensure there are staffs and students in the DB.")
        
    cursor.close()
    conn.close()

if __name__ == "__main__":
    generate_remarks()
