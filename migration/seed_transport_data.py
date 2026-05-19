import mysql.connector
import uuid
import datetime
import random

# Database configuration matching application.properties
DB_CONFIG = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'Start#123',
    'database': 'edutrack'
}

def generate_uuid_bin():
    """Generate a UUID in binary(16) format for MySQL"""
    return uuid.uuid4().bytes

def generate_avatar(first, last):
    """Generate a realistic UI Avatar"""
    return f"https://ui-avatars.com/api/?name={first}+{last}&background=random&color=fff&size=150"

def main():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        print("Connected to edutrack database. Beginning real-world data generation...")

        # --- 0. CLEANUP EXISTING DATA ---
        print("Cleaning up existing transport data to prevent duplicates...")
        cursor.execute("DELETE FROM buses_logs")
        cursor.execute("DELETE FROM transport_staffs")
        cursor.execute("UPDATE students SET bus_id = NULL") # Unlink students to prevent FK errors
        cursor.execute("DELETE FROM buses")
        cursor.execute("DELETE FROM bus_routes")
        conn.commit()
        
        # --- 1. GET ALL INSTITUTIONS ---
        cursor.execute("SELECT id, name FROM institutions")
        institutions = cursor.fetchall()
        
        if not institutions:
            print("No institutions found! Creating one...")
            inst_id = generate_uuid_bin()
            cursor.execute("""
                INSERT INTO institutions (id, name, slug, email, phone, address, level, created_at, updated_at, is_deleted)
                VALUES (%s, 'EduTrack International Academy', 'edutrack-intl', 'admin@edutrack.edu', '+1-800-555-0199', '100 Innovation Drive, Tech City', 'UNIVERSITY', NOW(), NOW(), 0)
            """, (inst_id,))
            institutions = [(inst_id, 'EduTrack International Academy')]
            conn.commit()

        print(f"Found {len(institutions)} institutions. Seeding data for all of them...")

        for inst_id, inst_name in institutions:
            print(f"\n--- Seeding for {inst_name} ---")
            
            # --- 2. BUS ROUTES (15 Real-World Routes) ---
            route_templates = [
                ('Morning Express (North)', 'City Center Station -> Oakwood Residential -> Tech Park -> Main Campus'),
                ('Silver Loop', 'Suburban Hub -> Maple Ave -> Science Museum -> Engineering Block'),
                ('Downtown Link', 'Grand Central -> Financial District -> Arts College -> Main Campus'),
                ('Suburban Shuttle A', 'Westend Mall -> Sunset Boulevard -> Sports Complex -> Campus Gates'),
                ('Suburban Shuttle B', 'Eastside Hospital -> Pine Street -> Student Village -> Main Campus'),
                ('Green Line (Eco)', 'Botanical Gardens -> Riverside Drive -> Bio-Tech Hub -> Main Campus'),
                ('Red Line (Rapid)', 'Airport Terminal 2 -> Highway Expressway -> Main Campus'),
                ('Blue Line (Coastal)', 'Marina Bay -> Oceanfront Condo -> Lighthouse Point -> Main Campus'),
                ('Evening Drop-off', 'Main Campus -> Tech Park -> City Center Station -> Suburban Hub'),
                ('Weekend Special', 'Main Campus -> Downtown Mall -> Central Theater -> Student Village'),
                ('Faculty Express', 'Faculty Housing -> Research Lab -> Administrative Block -> Main Campus'),
                ('Medical Wing Link', 'Main Campus -> Eastside Hospital -> Medical College -> Pharmacy Hub'),
                ('Inter-Campus Loop', 'Main Campus -> South Campus -> Business School -> North Campus'),
                ('Night Owl (Library)', 'Library Complex -> Student Village -> Oakwood Residential -> Suburbs'),
                ('Metro Feeder', 'Main Campus -> Metro Station Line 1 -> Metro Station Line 4 -> City Center')
            ]
            
            routes = []
            for name, path in route_templates:
                routes.append((generate_uuid_bin(), name, path))
                
            cursor.executemany("""
                INSERT INTO bus_routes (id, institution_id, route_name, path_summary, created_at, updated_at, is_deleted)
                VALUES (%s, %s, %s, %s, NOW(), NOW(), 0)
            """, [(r[0], inst_id, r[1], r[2]) for r in routes])
            
            # --- 3. BUSES (25 Real-World Buses) ---
            statuses = ['ON_ROUTE'] * 12 + ['IDLE'] * 10 + ['MAINTENANCE'] * 3
            random.shuffle(statuses)
            
            buses = []
            for i in range(1, 26):
                bus_num = f"EDU-{random.randint(1000, 9999)}-{chr(random.randint(65, 90))}"
                capacity = random.choice([30, 40, 50, 60])
                route_id = random.choice(routes)[0]
                status = statuses[i-1]
                buses.append((generate_uuid_bin(), bus_num, capacity, route_id, status))
                
            cursor.executemany("""
                INSERT INTO buses (id, institution_id, bus_number, total_students, route_id, fleet_status, created_at, updated_at, is_deleted)
                VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
            """, [(b[0], inst_id, b[1], b[2], b[3], b[4]) for b in buses])
            
            # --- 4. TRANSPORT STAFF (45 Staff Members) ---
            first_names = ["James", "Maria", "David", "Sarah", "Michael", "Linda", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Margaret", "Charles", "Emily", "Daniel", "Elizabeth", "Matthew", "Jennifer", "Anthony", "Patricia", "Mark", "Mary", "Donald"]
            last_names = ["Smith", "Garcia", "Johnson", "Martinez", "Brown", "Williams", "Jones", "Davis", "Miller", "Wilson", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Wood", "Lewis", "Scott", "Walker", "Payne", "Chen", "Lee"]
            
            staffs = []
            
            # Assign at least 1 Driver and 1 Cleaner to each bus
            for bus in buses:
                f_name, l_name = random.choice(first_names), random.choice(last_names)
                phone = f"+1-555-{random.randint(100,999)}-{random.randint(1000,9999)}"
                is_active = 1 if bus[4] != 'MAINTENANCE' else random.choice([1, 0])
                staffs.append((generate_uuid_bin(), bus[0], f_name, l_name, 'DRIVER', phone, generate_avatar(f_name, l_name), is_active))
                
                f_name, l_name = random.choice(first_names), random.choice(last_names)
                phone = f"+1-555-{random.randint(100,999)}-{random.randint(1000,9999)}"
                staffs.append((generate_uuid_bin(), bus[0], f_name, l_name, 'CLEANER', phone, generate_avatar(f_name, l_name), is_active))

            # Add some unassigned standby staff
            for _ in range(5):
                f_name, l_name = random.choice(first_names), random.choice(last_names)
                phone = f"+1-555-{random.randint(100,999)}-{random.randint(1000,9999)}"
                staffs.append((generate_uuid_bin(), None, f_name, l_name, random.choice(['DRIVER', 'CLEANER']), phone, generate_avatar(f_name, l_name), 1))

            cursor.executemany("""
                INSERT INTO transport_staffs (id, institution_id, bus_id, first_name, last_name, role, phone, avatar_url, is_active, created_at, updated_at, is_deleted)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
            """, [(s[0], inst_id, s[1], s[2], s[3], s[4], s[5], s[6], s[7]) for s in staffs])
            
            # --- 5. BUSES LOGS (Past 14 Days Historical Data) ---
            today = datetime.date.today()
            logs = []
            
            for day_offset in range(14):
                current_date = today - datetime.timedelta(days=day_offset)
                
                # Skip weekends
                if current_date.weekday() >= 5:
                    continue
                    
                for bus in buses:
                    if random.random() < 0.85:
                        arrival_hour = 8 if random.random() < 0.8 else 9
                        arrival_minute = random.randint(15, 59) if arrival_hour == 8 else random.randint(0, 30)
                        
                        arrival_time = datetime.datetime.combine(current_date, datetime.time(arrival_hour, arrival_minute))
                        
                        dep_hour = random.randint(15, 17)
                        dep_minute = random.randint(0, 59)
                        departure_time = datetime.datetime.combine(current_date, datetime.time(dep_hour, dep_minute))
                        
                        logs.append((generate_uuid_bin(), bus[0], arrival_time, departure_time))
                        
            cursor.executemany("""
                INSERT INTO buses_logs (id, institution_id, bus_id, arrival_time, departure_time, created_at, updated_at, is_deleted)
                VALUES (%s, %s, %s, %s, %s, NOW(), NOW(), 0)
            """, [(l[0], inst_id, l[1], l[2], l[3]) for l in logs])

        conn.commit()
        print("\n✅ Successfully seeded high-quality, real-world transport data across ALL institutions!")

    except mysql.connector.Error as err:
        print(f"Database Error: {err}")
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    main()
