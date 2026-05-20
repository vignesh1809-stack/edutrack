import mysql.connector
import uuid
import random
import sys
from datetime import datetime, timedelta

# ==============================================================================
# CONFIGURATION
# ==============================================================================
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Start#123",
    "database": "edutrack"
}

# High-Performance Toggle
# - False: Seeding will complete in ~20-30 seconds, generating attendance for the last 3 months only.
# - True: Seeding will take ~2-3 minutes, generating the full 6-month historical attendance per completed semester (~9 million rows).
GENERATE_FULL_ATTENDANCE = False

PASSWORD_HASH = "$2a$10$4I/gy5i78/bqhzf9omXftOUwnvB9b6pDx2uBJ79Ub9SGrJhuNLUaO"

NUM_INSTITUTES = 5
STAFF_PER_INST = 142  # 5 Admins, 120 Lecturers, 5 Transport Incharges, 12 others
BATCH_YEARS = [2020, 2021, 2022, 2023]
DEPARTMENTS = ["CSE", "ECE", "MECH", "CIVIL", "EEE"]
SECTIONS = ["A", "B", "C", "D"]
STUDENTS_PER_SECTION = 60
BUSES_PER_INST = 100

# ==============================================================================
# ANDHRA PRADESH CURATED NAMES DATASET
# ==============================================================================
TELUGU_SURNAMES = [
    "Reddy", "Naidu", "Chowdary", "Rao", "Raju", "Varma", "Kamma", "Guntur", 
    "Nellore", "Chittoor", "Rayapati", "Pasupuleti", "Konidela", "Allu", "Akkineni", 
    "Daggubati", "Nandamuri", "Penmetsa", "Kanneganti", "Boddu", "Maddipati", 
    "Yanamandra", "Vadlamudi", "Bhattiprolu", "Yerra", "Boya", "Balineni", 
    "Chevireddy", "Kotla", "Devineni", "Vallabhaneni", "Paritala", "Medasani",
    "Singamaneni", "Vangaveeti", "Duvvuri", "Tanguturi", "Potti", "Sirivennela",
    "Gattamaneni", "Kodialam", "Pendyala", "Sankuratri", "Yelamanchili"
]

TELUGU_MALE_NAMES = [
    "Srinivas", "Rajesh", "Venkata", "Satish", "Sai", "Rambabu", "Prasad", 
    "Kiran", "Pawan", "Naresh", "Kalyan", "Suresh", "Anil", "Ravi", "Chandrasekhar", 
    "Mahesh", "Gopala", "Siva", "Murali", "Jagadeesh", "Sudheer", "Mohan", 
    "Venkatesh", "Harish", "Gopi", "Bhaskar", "Raghava", "Ramakrishna", "Durga Prasad", 
    "Nagarjuna", "Balakrishna", "Chiranjeevi", "Tarun", "Sandeep", "Pradeep", "Rakesh",
    "Abhinav", "Nani", "Siddharth", "Vijay", "Chaitanya", "Akhil", "Kartik", "Kishore"
]

TELUGU_FEMALE_NAMES = [
    "Lakshmi", "Anusha", "Sravani", "Durga", "Sai Lakshmi", "Kavitha", "Priya", 
    "Divya", "Madhavi", "Swathi", "Jyothi", "Padmavathi", "Sirisha", "Kalyani", 
    "Geetha", "Sandhya", "Rama", "Hema", "Lalitha", "Kumari", "Sireesha", "Sailaja", 
    "Sunitha", "Yamini", "Harika", "Pranitha", "Anjali", "Sushma", "Ragini", "Lavanya",
    "Roopa", "Kavya", "Keerthi", "Mounika", "Sindhu", "Tejaswi", "Deepika", "Shalini"
]

AP_CITIES = [
    ("Visakhapatnam", "530016"),
    ("Vijayawada", "520010"),
    ("Guntur", "522002"),
    ("Nellore", "524001"),
    ("Tirupati", "517501"),
    ("Kakinada", "533001"),
    ("Kurnool", "518001"),
    ("Kadapa", "516001"),
    ("Eluru", "534005"),
    ("Rajahmundry", "533101"),
    ("Anantapur", "515001"),
    ("Ongole", "523002")
]

# Helper functions
def uuid_bin():
    return uuid.uuid4().bytes

def generate_telugu_name(gender="MALE"):
    fname = random.choice(TELUGU_MALE_NAMES) if gender == "MALE" else random.choice(TELUGU_FEMALE_NAMES)
    lname = random.choice(TELUGU_SURNAMES)
    return fname, lname

def generate_ap_address():
    city, pin = random.choice(AP_CITIES)
    door_no = f"{random.randint(1, 99)}-{random.randint(1, 99)}/{random.randint(1, 9)}"
    street = random.choice(["Dwaraka Nagar", "Benz Circle", "Brodipet", "Gandhi Road", "RTC Complex Area", "Main Bazar Road"])
    return f"D.No. {door_no}, {street}, {city}, Andhra Pradesh - {pin}"

def generate_indian_phone():
    return f"+91-{random.choice([7, 8, 9])}{random.randint(10, 99)}{random.randint(100, 999)}{random.randint(100, 999)}"

# Course catalog per department per semester (5 courses per semester)
COURSE_TEMPLATES = {
    "CSE": {
        1: ["Introduction to Programming", "Mathematics I", "Physics for Engineers", "Communication Skills", "Engineering Graphics"],
        2: ["Data Structures & Algorithms", "Mathematics II", "Basic Electrical Engineering", "Digital Logic Design", "Basic Electronics"],
        3: ["Object-Oriented Programming", "Discrete Mathematics", "Computer Organization", "Database Systems", "Data Communications"],
        4: ["Operating Systems", "Design & Analysis of Algorithms", "Theory of Computation", "Software Engineering", "Environmental Science"],
        5: ["Computer Networks", "Database Management Systems", "Artificial Intelligence", "Web Technologies", "Formal Languages & Automata"],
        6: ["Compiler Design", "Machine Learning", "Cryptography & Network Security", "Cloud Computing", "Software Project Management"],
        7: ["Deep Learning", "Internet of Things", "Distributed Systems", "Object Oriented Analysis & Design", "Mobile Application Development"],
        8: ["Project Management", "Big Data Analytics", "Cyber Security", "Blockchain Seminar", "Data Science Specialization"]
    },
    "ECE": {
        1: ["Network Analysis", "Mathematics I", "Chemistry for Engineers", "Engineering Drawing", "Basic Mechanical Engineering"],
        2: ["Electronic Devices & Circuits", "Mathematics II", "Basic Computer Science", "Signals & Systems", "Environmental Studies"],
        3: ["Analog Circuits", "Switching Theory & Logic Design", "Probability & Stochastic Processes", "Electromagnetic Waves", "Electronic Circuits Lab"],
        4: ["Digital System Design", "Analog Communications", "Control Systems", "Microprocessors & Microcontrollers", "Computer Organization"],
        5: ["Digital Communications", "Linear Integrated Circuits", "Antennas & Wave Propagation", "Computer Architecture", "Digital Signal Processing Lab"],
        6: ["Digital Signal Processing", "VLSI Design", "Microwave Engineering", "Information Theory & Coding", "Management Science"],
        7: ["Embedded Systems", "Optical Communications", "Cellular & Mobile Communications", "DSP Processors", "Real Time Operating Systems"],
        8: ["Satellite Communications", "Radar Systems", "Wireless Networks", "Professional Ethics", "AI for Communications"]
    },
    "MECH": {
        1: ["Engineering Mechanics", "Mathematics I", "Physics for Engineers", "Basic Workshop", "Basic Electrical Engineering"],
        2: ["Engineering Graphics", "Mathematics II", "Material Science & Metallurgy", "Thermodynamics", "Environmental Science"],
        3: ["Strength of Materials", "Fluid Mechanics & Hydraulic Machinery", "Kinematics of Machinery", "Manufacturing Processes", "Mechanics of Solids"],
        4: ["Dynamics of Machinery", "Applied Thermodynamics", "Machine Drawing", "Electrical Technology", "Fluid Mechanics Lab"],
        5: ["Design of Machine Elements I", "Heat & Mass Transfer", "Metal Cutting & Machine Tools", "Industrial Engineering", "Machine Tools Lab"],
        6: ["Design of Machine Elements II", "Thermal Engineering", "CAD/CAM", "Metrology & Instrumentation", "Metrology Lab"],
        7: ["Operations Research", "Finite Element Methods", "Automobile Engineering", "Power Plant Engineering", "Instrumentation & Control Systems"],
        8: ["Robotics & Automation", "Unconventional Machining", "Additive Manufacturing", "Entrepreneurship", "Design Project Seminar"]
    },
    "CIVIL": {
        1: ["Surveying I", "Mathematics I", "Chemistry for Engineers", "Basic Engineering Drawing", "Basic Mechanical Engineering"],
        2: ["Strength of Materials I", "Mathematics II", "Building Materials & Construction", "Fluid Mechanics", "Environmental Science"],
        3: ["Strength of Materials II", "Surveying II", "Engineering Geology", "Hydraulics & Hydraulic Machinery", "Surveying Lab I"],
        4: ["Structural Analysis I", "Concrete Technology", "Transportation Engineering I", "Environmental Engineering I", "Strength of Materials Lab"],
        5: ["Structural Analysis II", "Design of Reinforced Concrete Structures", "Environmental Engineering II", "Geotechnical Engineering I", "Geotechnical Engineering Lab"],
        6: ["Design of Steel Structures", "Geotechnical Engineering II", "Transportation Engineering II", "Water Resources Engineering I", "Concrete & Highway Lab"],
        7: ["Estimation & Costing", "Water Resources Engineering II", "Prestressed Concrete", "Bridge Engineering", "CAD Lab for Structures"],
        8: ["Construction Technology & Management", "Ground Improvement Techniques", "Disaster Management", "Seminar", "Advanced Structural Design"]
    },
    "EEE": {
        1: ["Circuit Theory", "Mathematics I", "Physics for Engineers", "Engineering Graphics", "Mathematics for Electrical Engineers"],
        2: ["Electrical Circuit Analysis", "Mathematics II", "Applied Thermodynamics", "Electronic Devices", "Environmental Studies"],
        3: ["Electrical Machines I", "Electromagnetic Fields", "Analog Electronics", "Digital Electronics & Logic Design", "Electric Circuits Lab"],
        4: ["Electrical Machines II", "Power Systems I", "Control Systems", "Electrical Measurements & Instrumentation", "Electrical Machines Lab I"],
        5: ["Power Electronics", "Power Systems II", "Linear IC Applications", "Microprocessors & Microcontrollers", "Electrical Machines Lab II"],
        6: ["Electrical Machine Design", "Power Semiconductor Drives", "Renewable Energy Sources", "Switchgear & Protection", "Power Electronics Lab"],
        7: ["Power System Analysis", "Utilization of Electrical Energy", "High Voltage Engineering", "Distributed Generation", "Power Systems Lab"],
        8: ["Power System Operation & Control", "Advanced Power Electronics", "Smart Grid Technologies", "Project Viva", "Advanced Control Theory"]
    }
}

# ==============================================================================
# MAIN EXECUTION SEEDER
# ==============================================================================
def main():
    print("🚀 Starting EduTrack High-Performance Enterprise Data Seeder...")
    print(f"Daily Attendance Full History: {'ENABLED (takes ~2 mins)' if GENERATE_FULL_ATTENDANCE else 'DISABLED (3 months log only, takes ~20s)'}")
    
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()
    
    # --------------------------------------------------------------------------
    # STEP 1: TRUNCATE ALL TABLES
    # --------------------------------------------------------------------------
    print("\n🧹 Truncating all existing tables...")
    cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
    
    tables_to_truncate = [
        "paper_submission_questions",
        "paper_submission_pages",
        "paper_submissions",
        "remarks",
        "assessments",
        "payments",
        "fees",
        "attendances",
        "buses_logs",
        "student_guardian_map",
        "students",
        "guardians",
        "transport_staffs",
        "buses",
        "bus_routes",
        "courses",
        "classes",
        "staffs",
        "departments",
        "institutions"
    ]
    
    for tbl in tables_to_truncate:
        try:
            cursor.execute(f"TRUNCATE TABLE {tbl}")
            print(f"   ✓ Truncated {tbl}")
        except Exception as e:
            # Table might not exist or failed, fallback to DELETE
            try:
                cursor.execute(f"DELETE FROM {tbl}")
                print(f"   ✓ Cleared {tbl} using DELETE")
            except Exception as ex:
                print(f"   ⚠️ Could not clear {tbl}: {ex}")
                
    cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")
    conn.commit()
    print("✓ All tables cleared successfully.")

    # Containers for seeded mappings
    inst_ids = []
    dept_ids_by_inst = {}  # inst_id -> list of dept_ids
    lecturers_by_dept = {} # dept_id -> list of lecturer_ids
    staffs_by_inst = {}    # inst_id -> list of staff_ids
    classes_by_inst_batch_dept_sec = {} # inst_id -> { (batch, dept, sec): class_id }
    courses_by_dept_sem = {} # dept_id -> { sem: [course_ids] }
    buses_by_inst = {}     # inst_id -> list of bus_ids
    students_by_inst = {}  # inst_id -> list of student_ids

    # --------------------------------------------------------------------------
    # STEP 2: SEED INSTITUTIONS (5)
    # --------------------------------------------------------------------------
    print("\n🏢 Seeding 5 Institutions...")
    institutions_data = []
    inst_names = [
        "Sri Venkateswara Institute of Technology (SVIT)",
        "Andhra Loyola Academy (ALA)",
        "Gayatri Vidya Parishad College of Engineering (GVPCE)",
        "JNTU College of Engineering, Anantapur (JNTUA)",
        "KL Deemed to be University, Guntur (KLU)"
    ]
    inst_slugs = ["svit-ap", "ala-ap", "gvp-ap", "jntua-ap", "klu-ap"]
    
    for idx in range(NUM_INSTITUTES):
        i_id = uuid_bin()
        name = inst_names[idx]
        slug = inst_slugs[idx]
        addr = generate_ap_address()
        email = f"info@{slug}.edu.in"
        phone = generate_indian_phone()
        level = "COLLEGE" if idx != 4 else "UNIVERSITY"
        
        institutions_data.append((i_id, addr, email, 0, name, phone, slug, level))
        inst_ids.append(i_id)
        
    cursor.executemany("""
        INSERT INTO institutions (id, created_at, address, email, is_deleted, name, phone, slug, level)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s, %s)
    """, institutions_data)
    print(f"✓ Seeded {len(inst_ids)} institutions.")

    # --------------------------------------------------------------------------
    # STEP 3: SEED DEPARTMENTS & STAFFS
    # --------------------------------------------------------------------------
    print("\n🎓 Seeding Departments and Staffs (142 staffs per institution)...")
    departments_data = []
    staff_data = []
    
    for inst_id in inst_ids:
        dept_ids_by_inst[inst_id] = []
        staffs_by_inst[inst_id] = []
        
        # A. Departments (5: CSE, ECE, MECH, CIVIL, EEE)
        dept_map = {} # Code -> id
        for code in DEPARTMENTS:
            d_id = uuid_bin()
            dept_map[code] = d_id
            dept_ids_by_inst[inst_id].append(d_id)
            lecturers_by_dept[d_id] = []
            
            name = f"Department of {code}"
            departments_data.append((d_id, inst_id, 0, code, name))
            
        # B. Staff members (142 total per institution)
        # Roles breakout: 5 Admins, 120 Lecturers, 5 Transport Incharges, 2 each of 6 remaining roles
        staff_roles = (
            ["Administrator"] * 5 + 
            ["Lecturer"] * 120 + 
            ["Transport_Incharge"] * 5 + 
            ["Accountant"] * 2 + 
            ["Head_of_Department"] * 2 + 
            ["Lab_Assistant"] * 2 + 
            ["Librarian"] * 2 + 
            ["Office_Staff"] * 2 + 
            ["Sports_and_Discipline"] * 2
        )
        
        for s_idx, role in enumerate(staff_roles):
            s_id = uuid_bin()
            gender = "FEMALE" if s_idx % 3 == 0 else "MALE"
            fname, lname = generate_telugu_name(gender)
            email = f"{fname.lower()}.{lname.lower()}_{s_idx}@{random.choice(['SVIT', 'ALA', 'GVP', 'JNTUA', 'KLU'])}.edu.in"
            phone = generate_indian_phone()
            
            # Map Lecturer to a department
            dept_id = None
            if role == "Lecturer":
                dept_code = DEPARTMENTS[s_idx % len(DEPARTMENTS)]
                dept_id = dept_map[dept_code]
                lecturers_by_dept[dept_id].append(s_id)
                
            staff_data.append((s_id, inst_id, 0, email, fname, lname, PASSWORD_HASH, phone, role, dept_id, 0))
            staffs_by_inst[inst_id].append(s_id)

    # Insert Departments
    cursor.executemany("""
        INSERT INTO departments (id, created_at, institution_id, is_deleted, code, name)
        VALUES (%s, NOW(), %s, %s, %s, %s)
    """, departments_data)
    
    # Insert Staffs
    cursor.executemany("""
        INSERT INTO staffs (id, created_at, institution_id, is_deleted, email, first_name, last_name, password, phone, role, department_id, two_factor_enabled)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, staff_data)
    print(f"✓ Seeded {len(departments_data)} departments and {len(staff_data)} staff members across all institutions.")

    # --------------------------------------------------------------------------
    # STEP 4: SEED COURSES (40 per department, 200 per institution)
    # --------------------------------------------------------------------------
    print("\n📚 Seeding 200 Courses per Institution (5 per semester)...")
    courses_data = []
    
    for inst_id in inst_ids:
        for dept_code in DEPARTMENTS:
            dept_id = dept_map[dept_code]
            courses_by_dept_sem[dept_id] = {}
            
            # Fetch lecturers for this department in this institution
            dept_lecturers = lecturers_by_dept[dept_id]
            
            for sem in range(1, 9):
                courses_by_dept_sem[dept_id][sem] = []
                templates = COURSE_TEMPLATES[dept_code][sem]
                
                for c_idx, name in enumerate(templates):
                    c_id = uuid_bin()
                    courses_by_dept_sem[dept_id][sem].append(c_id)
                    
                    # Assign a random lecturer from the department
                    staff_id = random.choice(dept_lecturers) if dept_lecturers else None
                    courses_data.append((c_id, inst_id, dept_id, name, sem, staff_id))
                    
    cursor.executemany("""
        INSERT INTO courses (id, created_at, institution_id, department_id, course_name, semester, staff_id, is_deleted)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s, 0)
    """, courses_data)
    print(f"✓ Seeded {len(courses_data)} courses total.")

    # --------------------------------------------------------------------------
    # STEP 5: SEED CLASSES (80 per institution, 400 total)
    # --------------------------------------------------------------------------
    print("\n🏫 Seeding Classes (80 per institution: 4 batches × 5 departments × 4 sections)...")
    classes_data = []
    
    for inst_id in inst_ids:
        classes_by_inst_batch_dept_sec[inst_id] = {}
        for batch in BATCH_YEARS:
            for dept_code in DEPARTMENTS:
                dept_id = dept_map[dept_code]
                dept_lecturers = lecturers_by_dept[dept_id]
                
                for sec in SECTIONS:
                    cl_id = uuid_bin()
                    classes_by_inst_batch_dept_sec[inst_id][(batch, dept_id, sec)] = cl_id
                    
                    # Assign a class teacher from the same department
                    teacher_id = random.choice(dept_lecturers) if dept_lecturers else None
                    classes_data.append((cl_id, inst_id, dept_id, batch, sec, teacher_id))
                    
    cursor.executemany("""
        INSERT INTO classes (id, created_at, institution_id, department_id, batch_year, section, class_teacher_id, is_deleted)
        VALUES (%s, NOW(), %s, %s, %s, %s, %s, 0)
    """, classes_data)
    print(f"✓ Seeded {len(classes_data)} classes total.")

    # --------------------------------------------------------------------------
    # STEP 6: SEED BUSES, ROUTES, & STAFFS (100 per institution)
    # --------------------------------------------------------------------------
    print("\n🚌 Seeding 100 Buses and Routes per Institution...")
    routes_data = []
    buses_data = []
    trans_staff_data = []
    
    ap_route_names = [
        "Vizag Beach Road Link", "Tirupati Alipiri Expressway", "Vijayawada Benz Circle Loop", 
        "Guntur Brodipet Feeder", "Nellore Town Bypass", "Kakinada Port Express", 
        "Kurnool Municipal Line", "Kadapa City Loop", "Eluru Bypass Connector", 
        "Rajahmundry Godavari Bridge Line", "Anantapur JNTU Express", "Ongole Town Shuttle",
        "Tenali Local Loop", "Chittoor Highway Link", "Vizianagaram Fort Line",
        "Srikakulam River Road Feeder", "Bhimavaram Canal Line", "Machilipatnam Coast Link",
        "Proddatur Express", "Hindupur Town Line"
    ]
    
    for inst_id in inst_ids:
        buses_by_inst[inst_id] = []
        inst_routes = []
        
        # A. Create 20 Routes for this institution
        for r_idx, r_name in enumerate(ap_route_names):
            r_id = uuid_bin()
            inst_routes.append(r_id)
            path = f"{r_name} Stop A -> Stop B -> Stop C -> Institution Main Gate"
            routes_data.append((r_id, inst_id, r_name, path))
            
        cursor.executemany("""
            INSERT INTO bus_routes (id, institution_id, route_name, path_summary, created_at, updated_at, is_deleted)
            VALUES (%s, %s, %s, %s, NOW(), NOW(), 0)
        """, routes_data)
        routes_data = [] # clear for next inst
        
        # B. Create 100 Buses for this institution
        statuses = ['ON_ROUTE'] * 60 + ['IDLE'] * 35 + ['MAINTENANCE'] * 5
        random.shuffle(statuses)
        
        for b_idx in range(1, BUSES_PER_INST + 1):
            b_id = uuid_bin()
            buses_by_inst[inst_id].append(b_id)
            bus_num = f"AP-{random.randint(10, 39)}-{chr(random.randint(65, 90))}{chr(random.randint(65, 90))}-{random.randint(1000, 9999)}"
            capacity = random.choice([30, 40, 50, 60])
            route_id = random.choice(inst_routes)
            status = statuses[b_idx - 1]
            buses_data.append((b_id, inst_id, bus_num, capacity, route_id, status))
            
            # C. Create 1 DRIVER and 1 CLEANER for each bus
            # Driver
            dfname, dlname = generate_telugu_name("MALE")
            d_id = uuid_bin()
            dphone = generate_indian_phone()
            d_avatar = f"https://ui-avatars.com/api/?name={dfname}+{dlname}&background=random&color=fff&size=150"
            is_active = 1 if status != 'MAINTENANCE' else 0
            trans_staff_data.append((d_id, inst_id, b_id, dfname, dlname, 'DRIVER', dphone, d_avatar, is_active))
            
            # Cleaner
            cfname, clname = generate_telugu_name("MALE")
            c_id = uuid_bin()
            cphone = generate_indian_phone()
            c_avatar = f"https://ui-avatars.com/api/?name={cfname}+{clname}&background=random&color=fff&size=150"
            trans_staff_data.append((c_id, inst_id, b_id, cfname, clname, 'CLEANER', cphone, c_avatar, is_active))

        cursor.executemany("""
            INSERT INTO buses (id, institution_id, bus_number, total_students, route_id, fleet_status, created_at, updated_at, is_deleted)
            VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
        """, buses_data)
        buses_data = [] # clear
        
        cursor.executemany("""
            INSERT INTO transport_staffs (id, institution_id, bus_id, first_name, last_name, role, phone, avatar_url, is_active, created_at, updated_at, is_deleted)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
        """, trans_staff_data)
        trans_staff_data = [] # clear

    print(f"✓ Seeded 100 bus routes, 500 buses, and 1,000 transport staff members.")

    # --------------------------------------------------------------------------
    # STEP 7: SEED STUDENTS, GUARDIANS & MAPS (24,000 total)
    # --------------------------------------------------------------------------
    print("\n👨‍🎓 Seeding 24,000 Students & Guardians (4,800 per institution)...")
    
    # Pre-allocate collections for faster loops
    students_batch = []
    guardians_batch = []
    map_batch = []
    
    # We will generate and execute in chunk size of 5000 to keep memory low and inserts fast
    chunk_size = 5000
    student_count = 0
    guardian_count = 0
    
    for inst_id in inst_ids:
        students_by_inst[inst_id] = []
        buses = buses_by_inst[inst_id]
        
        # Loops across batches, depts, sections, and 60 students per section
        for batch in BATCH_YEARS:
            # Map batch to completed sems and current sem
            # 2023 -> sem 1 (0 completed)
            # 2022 -> sem 3 (2 completed)
            # 2021 -> sem 5 (4 completed)
            # 2020 -> sem 7 (6 completed)
            current_sem = 1 if batch == 2023 else (3 if batch == 2022 else (5 if batch == 2021 else 7))
            
            for dept_code in DEPARTMENTS:
                dept_id = dept_map[dept_code]
                
                for sec in SECTIONS:
                    class_id = classes_by_inst_batch_dept_sec[inst_id][(batch, dept_id, sec)]
                    
                    # Split 60 students into 80% bus riders (48) and 20% hostlers (12)
                    for s_in_sec in range(1, STUDENTS_PER_SECTION + 1):
                        gender = "FEMALE" if s_in_sec % 2 == 0 else "MALE"
                        sfname, slname = generate_telugu_name(gender)
                        s_id = uuid_bin()
                        students_by_inst[inst_id].append(s_id)
                        
                        student_count += 1
                        stu_id_str = f"STU-{student_count:05d}"
                        semail = f"{sfname.lower()}.{slname.lower()}@{inst_slugs[inst_ids.index(inst_id)]}.edu.in"
                        sphone = generate_indian_phone()
                        saddr = generate_ap_address()
                        scgpa = round(random.uniform(6.5, 9.8), 2) # CGPA in 10-point scale
                        s_dob = (datetime.now() - timedelta(days=365 * random.randint(18, 22))).date()
                        s_blood = random.choice(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"])
                        
                        # Bus Ride allocation: 80% bus riders, 20% hostlers
                        is_hosteller = 0
                        bus_id = None
                        if s_in_sec <= 48:
                            bus_id = random.choice(buses)
                        else:
                            is_hosteller = 1
                            
                        # Append Student Data
                        students_batch.append((
                            s_id, inst_id, stu_id_str, sfname, slname, 'GOOD', 
                            PASSWORD_HASH, semail, sphone, saddr, gender, s_dob, 
                            is_hosteller, scgpa, current_sem, bus_id, class_id, 
                            s_blood, 0
                        ))
                        
                        # Create 1 Guardian per student (sharing same last name/surname)
                        g_id = uuid_bin()
                        g_gender = "MALE" if s_in_sec % 5 != 0 else "FEMALE" # mostly fathers, some mothers
                        g_relation = "FATHER" if g_gender == "MALE" else "MOTHER"
                        gfname, glname = generate_telugu_name(g_gender)
                        # Keep the student's surname for realistic family mapping
                        glname = slname 
                        
                        gemail = f"{gfname.lower()}.{glname.lower()}_parent@gmail.com"
                        gphone = generate_indian_phone()
                        gaddr = saddr # live in the same place
                        g_occup = random.choice(["Software Engineer", "Business Executive", "Agriculturist", "Doctor", "Teacher", "Government Officer", "Merchant"])
                        
                        # Append Guardian Data
                        guardians_batch.append((
                            g_id, inst_id, f"{gfname} {glname}", gphone, gemail, 
                            PASSWORD_HASH, gaddr, g_occup, g_relation
                        ))
                        
                        # Map Student to Guardian
                        map_batch.append((s_id, g_id))
                        
                        # Optimized Batch Insert Execution
                        if len(students_batch) >= chunk_size:
                            cursor.executemany("""
                                INSERT INTO guardians (id, institution_id, name, phone, email, password, address, occupation, relation, created_at, updated_at, is_deleted)
                                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
                            """, guardians_batch)
                            
                            cursor.executemany("""
                                INSERT INTO students (id, institution_id, student_id, first_name, last_name, status, password, email, phone, address, gender, date_of_birth, is_hosteller, cgpa, current_semester, bus_id, class_id, blood_group, two_factor_enabled, created_at, updated_at, is_deleted)
                                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
                            """, students_batch)
                            
                            cursor.executemany("""
                                INSERT INTO student_guardian_map (student_id, guardian_id)
                                VALUES (%s, %s)
                            """, map_batch)
                            
                            conn.commit()
                            print(f"   ↳ Seeded {student_count} / 24,000 students and parents...")
                            
                            students_batch = []
                            guardians_batch = []
                            map_batch = []

    # Final sweep of remaining items in batch
    if students_batch:
        cursor.executemany("""
            INSERT INTO guardians (id, institution_id, name, phone, email, password, address, occupation, relation, created_at, updated_at, is_deleted)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
        """, guardians_batch)
        
        cursor.executemany("""
            INSERT INTO students (id, institution_id, student_id, first_name, last_name, status, password, email, phone, address, gender, date_of_birth, is_hosteller, cgpa, current_semester, bus_id, class_id, blood_group, two_factor_enabled, created_at, updated_at, is_deleted)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
        """, students_batch)
        
        cursor.executemany("""
            INSERT INTO student_guardian_map (student_id, guardian_id)
            VALUES (%s, %s)
        """, map_batch)
        
        conn.commit()
        print(f"   ↳ Completed seeding all {student_count} students and parents successfully!")

    # --------------------------------------------------------------------------
    # STEP 8: SEED FEES & PAYMENTS
    # --------------------------------------------------------------------------
    print("\n💰 Seeding Fees & Payments (Paid for past sems, Due for current sem)...")
    fees_batch = []
    payments_batch = []
    
    # Batch select for student processing
    cursor.execute("SELECT id, institution_id, current_semester, created_at FROM students")
    db_students = cursor.fetchall()
    
    fee_total = 100000.00
    
    for s_idx, (s_id, inst_id, current_sem, s_created) in enumerate(db_students):
        # A. PAID Fees for all past semesters
        for past_sem in range(1, current_sem):
            f_id = uuid_bin()
            ay_year = 2026 - (current_sem - past_sem) // 2
            ay_str = f"{ay_year}-{ay_year + 1}"
            term_str = f"SEM-{past_sem}"
            due_dt = s_created.date() - timedelta(days=180 * (current_sem - past_sem))
            
            # Create PAID Fee
            fees_batch.append((f_id, inst_id, s_id, 'TUITION', ay_str, term_str, 0.00, fee_total, due_dt, 'PAID'))
            
            # Create corresponding PAID Payment
            p_id = uuid_bin()
            pay_method = random.choice(['UPI', 'Net Banking', 'Credit Card', 'Cash'])
            tx_id = f"TXN{random.randint(100000, 999999)}{random.randint(100000, 999999)}"
            pay_dt = due_dt - timedelta(days=random.randint(1, 10)) # paid before due date
            
            payments_batch.append((p_id, inst_id, f_id, fee_total, pay_dt, pay_method, tx_id, 'PAID'))
            
        # B. DUE (Pending) Fee for the current semester
        f_id = uuid_bin()
        ay_str = "2025-2026"
        term_str = f"SEM-{current_sem}"
        due_dt = datetime.now().date() + timedelta(days=45) # due in 45 days
        
        fees_batch.append((f_id, inst_id, s_id, 'TUITION', ay_str, term_str, 0.00, fee_total, due_dt, 'DUE'))
        
        # Chunk insert
        if len(fees_batch) >= chunk_size:
            cursor.executemany("""
                INSERT INTO fees (id, institution_id, student_id, fee_type, academic_year, term, fine_amount, total_amount, due_date, status, created_at, updated_at, is_deleted)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
            """, fees_batch)
            
            cursor.executemany("""
                INSERT INTO payments (id, institution_id, fee_id, amount_paid, payment_date, payment_method, transaction_id, payment_status, created_at, updated_at, is_deleted)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
            """, payments_batch)
            
            conn.commit()
            fees_batch = []
            payments_batch = []

    # Sweep remaining fees
    if fees_batch:
        cursor.executemany("""
            INSERT INTO fees (id, institution_id, student_id, fee_type, academic_year, term, fine_amount, total_amount, due_date, status, created_at, updated_at, is_deleted)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
        """, fees_batch)
        
        if payments_batch:
            cursor.executemany("""
                INSERT INTO payments (id, institution_id, fee_id, amount_paid, payment_date, payment_method, transaction_id, payment_status, created_at, updated_at, is_deleted)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
            """, payments_batch)
        
        conn.commit()
    print("✓ Successfully seeded all Student Financial Fee and Payment history records.")

    # --------------------------------------------------------------------------
    # STEP 9: DAILY ATTENDANCE (Massive performance seeding)
    # --------------------------------------------------------------------------
    print("\n📅 Seeding Daily Attendance records (High performance optimized)...")
    attendance_batch = []
    
    # We will fetch students with their department details to match course IDs
    cursor.execute("""
        SELECT s.id, s.institution_id, c.department_id, s.current_semester 
        FROM students s
        JOIN classes c ON s.class_id = c.id
    """)
    students_list = cursor.fetchall()
    
    total_attn_count = 0
    
    # Establish academic semesters dates
    # To generate daily attendance, we map out the dates of completed semesters relative to today
    today_date = datetime.now().date()
    
    # Helper to generate weekdays in a range
    def get_weekdays(start, end):
        res = []
        curr = start
        while curr <= end:
            if curr.weekday() < 5:  # Monday to Friday
                res.append(curr)
            curr += timedelta(days=1)
        return res

    # Generate weekdays for past sems
    # Let's say:
    # Sem 1: Oct 2023 - Mar 2024
    # Sem 2: Apr 2024 - Sep 2024
    # Sem 3: Oct 2024 - Mar 2025
    # Sem 4: Apr 2025 - Sep 2025
    # Sem 5: Oct 2025 - Mar 2026
    # Sem 6: Apr 2026 - Present (or completed)
    sem_dates = {
        1: (today_date - timedelta(days=900), today_date - timedelta(days=730)),
        2: (today_date - timedelta(days=729), today_date - timedelta(days=550)),
        3: (today_date - timedelta(days=549), today_date - timedelta(days=370)),
        4: (today_date - timedelta(days=369), today_date - timedelta(days=190)),
        5: (today_date - timedelta(days=189), today_date - timedelta(days=10)),
        6: (today_date - timedelta(days=9), today_date)
    }

    # Restrict to last 3 months if High-Performance Toggle is false
    if not GENERATE_FULL_ATTENDANCE:
        print("💡 Capping attendance records to active semester last 3 months for high speed...")
        active_weekdays = get_weekdays(today_date - timedelta(days=90), today_date)
    else:
        print("🔥 Seeding complete multi-year history (~9 million rows)...")

    for s_idx, (s_id, inst_id, dept_id, current_sem) in enumerate(students_list):
        # Fetch course mappings
        # If courses don't exist for the sem, we choose a fallback course or create list
        if not GENERATE_FULL_ATTENDANCE:
            # Only current semester, last 3 months
            course_ids = courses_by_dept_sem.get(dept_id, {}).get(current_sem, [])
            if not course_ids:
                # Fallback to any course in department
                flat_courses = []
                for s_courses in courses_by_dept_sem.get(dept_id, {}).values():
                    flat_courses.extend(s_courses)
                course_ids = flat_courses[:1]
                
            if course_ids:
                for dt in active_weekdays:
                    c_id = random.choice(course_ids)
                    status = 'PRESENT' if random.random() > 0.08 else 'ABSENT'
                    a_id = uuid_bin()
                    attendance_batch.append((a_id, inst_id, s_id, c_id, dt, status))
        else:
            # Full multi-year history for all completed semesters
            for past_sem in range(1, current_sem):
                course_ids = courses_by_dept_sem.get(dept_id, {}).get(past_sem, [])
                if not course_ids:
                    continue
                    
                # We generate weekdays for this completed semester
                sem_range = sem_dates.get(past_sem, (today_date - timedelta(days=180), today_date))
                weekdays = get_weekdays(sem_range[0], sem_range[1])
                
                # Pick a course from this semester
                c_id = random.choice(course_ids)
                
                for dt in weekdays:
                    status = 'PRESENT' if random.random() > 0.08 else 'ABSENT'
                    a_id = uuid_bin()
                    attendance_batch.append((a_id, inst_id, s_id, c_id, dt, status))

        # Chunk insert execution
        if len(attendance_batch) >= 10000:
            cursor.executemany("""
                INSERT INTO attendances (id, institution_id, student_id, course_id, record_date, attendance_status, created_at, updated_at, is_deleted)
                VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
            """, attendance_batch)
            total_attn_count += len(attendance_batch)
            conn.commit()
            attendance_batch = []
            
            # Print feedback progress
            if total_attn_count % 200000 == 0:
                print(f"   ↳ Inserted {total_attn_count} attendance records...")

    # Sweep remaining attendance
    if attendance_batch:
        cursor.executemany("""
            INSERT INTO attendances (id, institution_id, student_id, course_id, record_date, attendance_status, created_at, updated_at, is_deleted)
            VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
        """, attendance_batch)
        total_attn_count += len(attendance_batch)
        conn.commit()
        
    print(f"✓ Seeded a total of {total_attn_count} daily attendance logs successfully.")

    # --------------------------------------------------------------------------
    # STEP 10: SEED SUB-COMPONENTS (Remarks, Assessments, Bus Logs)
    # --------------------------------------------------------------------------
    print("\n📝 Seeding dashboard remarks, assessments, and bus travel logs...")
    remarks_data = []
    assessments_data = []
    bus_logs_data = []
    
    # Pick a random Lecturer from the institution to author student Remarks
    for inst_id in inst_ids:
        # Remarks: Seed exactly 200 random student remarks per institution (at least 100 per user request)
        students = students_by_inst[inst_id]
        inst_staffs = staffs_by_inst[inst_id]
        
        # Filter lecturers for this institution
        lecturers = [s_id for s_id in inst_staffs if s_id in lecturers_by_dept.get(dept_ids_by_inst[inst_id][0], [])]
        if not lecturers:
            lecturers = inst_staffs[:10]
            
        remark_content_templates = [
            "Consistent performer. Displays outstanding academic rigor and participates actively in class discussions.",
            "Needs to improve focus in analytical labs. Showing positive development but requires further work.",
            "Excellent understanding of fundamental engineering principles. Submissions are comprehensive and accurate.",
            "Maintains high attendance and strong laboratory performance. A very proactive learner in all team tasks.",
            "Needs to concentrate more on homework assignments to bridge conceptual gaps in core subjects.",
            "Outstanding analytical problem-solving abilities. Represents the department beautifully."
        ]
        
        # Pick 200 random students to author a remark for
        sampled_students = random.sample(students, min(200, len(students)))
        for s_id in sampled_students:
            rem_id = uuid_bin()
            content = random.choice(remark_content_templates)
            author = random.choice(lecturers)
            category = random.choice(["ACADEMIC", "DISCIPLINE", "SPORTS", "OTHER"])
            remarks_data.append((rem_id, inst_id, s_id, author, 'STUDENT', category, content))
            
        # Bus Logs: Seeding logs for the 100 buses (15 logs each for past 15 days)
        buses = buses_by_inst[inst_id]
        today = datetime.now()
        for b_id in buses:
            for day_offset in range(15):
                log_dt = today - timedelta(days=day_offset)
                if log_dt.weekday() >= 5: # skip weekends
                    continue
                l_id = uuid_bin()
                arrival = datetime.combine(log_dt.date(), datetime.min.time().replace(hour=8, minute=random.randint(15, 55)))
                departure = datetime.combine(log_dt.date(), datetime.min.time().replace(hour=16, minute=random.randint(10, 45)))
                bus_logs_data.append((l_id, inst_id, b_id, arrival, departure))

    # Assessments: Seed MID_TERM & SEMESTER FINAL marks for all 5 courses of completed semesters
    print("✍️ Generating 5 courses mid-sem and semester final marks for completed student semesters...")
    for s_idx, (s_id, inst_id, dept_id, current_sem) in enumerate(students_list):
        # Completed semesters: 1 to current_sem - 1
        for past_sem in range(1, current_sem):
            course_ids = courses_by_dept_sem.get(dept_id, {}).get(past_sem, [])
            for c_id in course_ids:
                # 1. Mid-Term Mark
                mid_id = uuid_bin()
                max_mid = 30.00
                obtained_mid = round(random.uniform(12.00, 30.00), 2)
                assessments_data.append((mid_id, inst_id, c_id, s_id, 'MID_TERM', max_mid, obtained_mid))
                
                # 2. Semester Final Mark
                final_id = uuid_bin()
                max_final = 100.00
                obtained_final = round(random.uniform(40.00, 100.00), 2)
                assessments_data.append((final_id, inst_id, c_id, s_id, 'FINAL', max_final, obtained_final))
                
                # Chunk write to keep memory clean
                if len(assessments_data) >= 10000:
                    cursor.executemany("""
                        INSERT INTO assessments (id, institution_id, course_id, student_id, type, max_score, marks_obtained, created_at, updated_at, is_deleted)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
                    """, assessments_data)
                    assessments_data = []

    # Batch Insert Remarks
    if remarks_data:
        cursor.executemany("""
            INSERT INTO remarks (id, institution_id, target_student_id, author_staff_id, remark_target, remark_category, content, created_at, updated_at, is_deleted)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
        """, remarks_data)
        
    # Batch Insert remaining Assessments
    if assessments_data:
        cursor.executemany("""
            INSERT INTO assessments (id, institution_id, course_id, student_id, type, max_score, marks_obtained, created_at, updated_at, is_deleted)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
        """, assessments_data)
        
    # Batch Insert Bus Logs
    if bus_logs_data:
        cursor.executemany("""
            INSERT INTO buses_logs (id, institution_id, bus_id, arrival_time, departure_time, created_at, updated_at, is_deleted)
            VALUES (%s, %s, %s, %s, %s, NOW(), NOW(), 0)
        """, bus_logs_data)
        
    conn.commit()
    print("✓ Remarks, Assessments, and Bus travel logs seeded successfully!")

    # --------------------------------------------------------------------------
    # DATABASE INTEGRITY RUN STATS
    # --------------------------------------------------------------------------
    print("\n🏁 Database Seeding Completed successfully!")
    print("=========================================================")
    print("DATA RECORD QUANTITIES SEEDED SUMMARY:")
    print("=========================================================")
    
    cursor.execute("SELECT COUNT(*) FROM institutions")
    print(f"Institutions:     {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM departments")
    print(f"Departments:      {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM staffs")
    print(f"Staff Members:    {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM courses")
    print(f"Courses:          {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM classes")
    print(f"Classes:          {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM buses")
    print(f"Buses:            {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM transport_staffs")
    print(f"Transport Staff:  {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM students")
    print(f"Students:         {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM guardians")
    print(f"Guardians:        {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM fees")
    print(f"Fee Records:      {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM payments")
    print(f"Payment Records:  {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM attendances")
    print(f"Attendance Logs:  {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM remarks")
    print(f"Remarks:          {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM assessments")
    print(f"Assessments:      {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM buses_logs")
    print(f"Bus Logs:         {cursor.fetchone()[0]}")
    print("=========================================================")
    
    cursor.close()
    conn.close()

if __name__ == "__main__":
    main()
