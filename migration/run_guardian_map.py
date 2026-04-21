import mysql.connector
import random

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Start#123",
    "database": "edutrack"
}

def generate_guardian_map():
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()
    
    # Fetch students
    cursor.execute("SELECT id, institution_id FROM students")
    students = cursor.fetchall()
    
    # Fetch guardians
    cursor.execute("SELECT id, institution_id FROM guardians")
    guardians = cursor.fetchall()
    
    guardians_by_inst = {}
    for g_id, inst_id in guardians:
        guardians_by_inst.setdefault(inst_id, []).append(g_id)
    
    map_data = []
    for s_id, inst_id in students:
        inst_guardians = guardians_by_inst.get(inst_id, [])
        if not inst_guardians: continue
        
        # Assign 1 to 2 guardians per student
        num_guardians = random.choice([1, 1, 1, 2])
        assigned = random.sample(inst_guardians, min(num_guardians, len(inst_guardians)))
        for g_id in assigned:
            map_data.append((s_id, g_id))
            
    if map_data:
        cursor.executemany("""
            INSERT IGNORE INTO student_guardian_map (student_id, guardian_id)
            VALUES (%s, %s)
        """, map_data)
        
    conn.commit()
    print(f"🎉 Generated {len(map_data)} student-guardian mappings!")
    
    cursor.close()
    conn.close()

if __name__ == '__main__':
    generate_guardian_map()
