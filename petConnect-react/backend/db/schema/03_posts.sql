-- Drop and recreate posts table (Example)

DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE posts (
  post_ID SERIAL PRIMARY KEY NOT NULL,
  user_ID INTEGER REFERENCES users(user_ID),
  pet_ID INTEGER REFERENCES pets(pet_ID),
  image_file TEXT,
  style VARCHAR(255) NOT NULL,
  title VARCHAR(255) DEFAULT NULL,
  content TEXT NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
