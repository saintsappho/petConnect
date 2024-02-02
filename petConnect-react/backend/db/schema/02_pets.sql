-- Drop and recreate pets table (Example)

DROP TABLE IF EXISTS pets CASCADE;
CREATE TABLE pets (
  pet_ID SERIAL PRIMARY KEY NOT NULL,
  user_ID INTEGER REFERENCES users(user_ID),
  name VARCHAR(255) NOT NULL,
  species VARCHAR(255) NOT NULL,
  breed VARCHAR(255) NOT NULL,
  medical_conditions VARCHAR(255) NOT NULL,
  diet VARCHAR(255) NOT NULL,
  allergies VARCHAR(255) NOT NULL,
  routines VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
