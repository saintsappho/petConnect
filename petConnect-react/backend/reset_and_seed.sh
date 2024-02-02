#!/bin/bash

# Set your database connection details
DATABASE_NAME='petConnect'
USER='labber'
HOST='localhost'

# Drop and recreate tables
echo "Resetting database..."
psql -U $USER -h $HOST -d $DATABASE_NAME -f db/queries/reset_script.sql

# Now, seed your database
echo "Seeding database..."
for seed in db/seeds/*.sql; do
    echo "Running seed: $seed"
    psql -U $USER -h $HOST -d $DATABASE_NAME -f $seed
done

echo "Database reset and seeded successfully!"