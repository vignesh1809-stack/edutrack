import mysql.connector

# Correct Spring-generated BCrypt hash of "password"
hashed = "$2a$10$Bjw5PkNFDiFZ5QDvBurlxuUphNqBm/GhKaYJaWrMPeZlIbWJKpWHK"

conn = mysql.connector.connect(host="localhost", user="root", password="Start#123", database="edutrack")
cursor = conn.cursor()

# Update staffs table with correct hash
cursor.execute("UPDATE staffs SET password = %s WHERE phone = '8000000019'", (hashed,))
conn.commit()
print("Successfully updated staffs with correct BCrypt hash! Rows affected:", cursor.rowcount)

cursor.close()
conn.close()
