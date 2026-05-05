#!/bin/bash
mysql -u root -p'Start#123' edutrack -e "SELECT id, first_name, last_name, is_deleted, institution_id, department_id FROM students LIMIT 1;"
mysql -u root -p'Start#123' edutrack -e "SELECT id, name, code FROM departments LIMIT 5;"
