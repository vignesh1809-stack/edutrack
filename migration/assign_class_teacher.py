import mysql.connector

conn = mysql.connector.connect(host="localhost", user="root", password="Start#123", database="edutrack")
cursor = conn.cursor()

# Assign lecturer 7c305a9b-6da4-49f7-83ec-65f229f0d193 as the class teacher of 4dd23fbe-8fcb-438b-a6e3-9405cdb428de
cursor.execute("""
    UPDATE classes 
    SET class_teacher_id = UUID_TO_BIN('7c305a9b-6da4-49f7-83ec-65f229f0d193') 
    WHERE id = UUID_TO_BIN('4dd23fbe-8fcb-438b-a6e3-9405cdb428de')
""")

conn.commit()
print("Successfully assigned lecturer as class teacher! Rows affected:", cursor.rowcount)

cursor.close()
conn.close()
