import mysql.connector

# Pre-generated BCrypt hash of "password"
hashed = "$2a$10$tMh4P1d9E/T6Jsk0aJscye1hYy6xT1iHn2qGgJ7359RjG8r7U/a6K"

conn = mysql.connector.connect(host="localhost", user="root", password="Start#123", database="edutrack")
cursor = conn.cursor()
cursor.execute("UPDATE staffs SET password = %s WHERE phone = '+1-556-547-0175'", (hashed,))
conn.commit()
print("Updated rows:", cursor.rowcount)
cursor.close()
conn.close()
