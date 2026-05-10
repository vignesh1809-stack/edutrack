#!/bin/bash

# EduTrack Master Migration Script
# This script runs the database migrations in the correct order:
# 1. Liquibase (Schema Creation)
# 2. Python Migration Scripts (Data Seeding)

set -e # Exit on any error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting EduTrack Database Migration ===${NC}"

# 1. Run Liquibase Schema Migrations
echo -e "\n${GREEN}Step 1: Running Liquibase Schema Migrations...${NC}"
cd be
mvn liquibase:update \
  -Dliquibase.url="jdbc:mysql://localhost:3306/edutrack?createDatabaseIfNotExist=true" \
  -Dliquibase.username="root" \
  -Dliquibase.password="Start#123" \
  -Dliquibase.changeLogFile="src/main/resources/db/changelog/db.changelog-master.xml"

cd ..


# 2. Setup Python Environment
echo -e "\n${GREEN}Step 2: Setting up Python Environment...${NC}"
if [ -f "migration/requirements.txt" ]; then
    pip install -r migration/requirements.txt --quiet
fi

# 3. Run Data Migration/Seed Scripts in Order
echo -e "\n${GREEN}Step 3: Running Data Seeding Scripts...${NC}"

# Run the complete migration script first (Base Data)
if [ -f "migration/migration_complete.py" ]; then
    echo -e "Running migration_complete.py..."
    python3 migration/migration_complete.py
fi

# Run Addons
if [ -f "migration/migration_addons.py" ]; then
    echo -e "Running migration_addons.py..."
    python3 migration/migration_addons.py
fi

# Run Remarks
if [ -f "migration/migration_remarks.py" ]; then
    echo -e "Running migration_remarks.py..."
    python3 migration/migration_remarks.py
fi

# Run Guardian Mapping
if [ -f "migration/run_guardian_map.py" ]; then
    echo -e "Running run_guardian_map.py..."
    python3 migration/run_guardian_map.py
fi

# Run Test Data Generation
if [ -f "migration/generate_test_data.py" ]; then
    echo -e "Running generate_test_data.py..."
    python3 migration/generate_test_data.py
fi

echo -e "\n${BLUE}=== Migration Completed Successfully! ===${NC}"

