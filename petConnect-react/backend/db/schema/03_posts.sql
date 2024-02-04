-- Drop and recreate posts table (Example)

DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE posts (
  post_ID SERIAL PRIMARY KEY NOT NULL,
  user_ID INTEGER REFERENCES users(user_ID),
  pet_ID INTEGER REFERENCES pets(pet_ID),
  imageURL VARCHAR(255),
  style VARCHAR(255) NOT NULL,
  title VARCHAR(255) DEFAULT '',
  content VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
