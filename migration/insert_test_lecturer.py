import uuid
import mysql.connector

# Pre-generated BCrypt hash of "password"
hashed = "$2a$10$tMh4P1d9E/T6Jsk0aJscye1hYy6xT1iHn2qGgJ7359RjG8r7U/a6K"

conn = mysql.connector.connect(host="localhost", user="root", password="Start#123", database="edutrack")
cursor = conn.cursor()

# Get the first institution ID
cursor.execute("SELECT id FROM institutions LIMIT 1")
inst_row = cursor.fetchone()
inst_id = inst_row[0]

# Generate a random UUID for the new staff
staff_id = uuid.uuid4().bytes

# Delete any existing staff with this phone number to avoid duplicates
cursor.execute("DELETE FROM staffs WHERE phone = '8000000019'")

# Insert staff member with phone '8000000019'
cursor.execute("""
    INSERT INTO staffs (id, created_at, institution_id, is_deleted, email, first_name, last_name, password, phone, role, two_factor_enabled)
    VALUES (%s, NOW(), %s, 0, 'lecturer@edutrack.com', 'Dynamic', 'Lecturer', %s, '8000000019', 'Lecturer', 0)
""", (staff_id, inst_id, hashed))

conn.commit()
print("Successfully inserted lecturer! Staff ID:", uuid.UUID(bytes=staff_id))
cursor.close()
conn.close()
