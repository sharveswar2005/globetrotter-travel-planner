## Database Setup (GlobeTrotter)

1. Install PostgreSQL
2. Create DB:
   CREATE DATABASE globetrotter;
3. Run:
   psql -U postgres -d globetrotter -f db/schema/01_create_tables.sql
   psql -U postgres -d globetrotter -f db/seeds/02_insert_sample_data.sql
4. Setup `.env`
