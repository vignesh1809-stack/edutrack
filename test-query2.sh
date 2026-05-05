#!/bin/bash
INST_ID_HEX=$(echo "1143e812a45749f48823548fedeaf501" | tr '[:lower:]' '[:upper:]')
mysql -u root -p'Start#123' edutrack -e "SELECT count(*) FROM students WHERE hex(institution_id) = '${INST_ID_HEX}' AND is_deleted=0;"
