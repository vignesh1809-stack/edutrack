#!/bin/bash
mysql -u root -p'Start#123' edutrack -e "SELECT id, phone, role FROM users WHERE role = 'PRINCIPAL' OR role = 'ADMINISTRATOR' LIMIT 2;"
