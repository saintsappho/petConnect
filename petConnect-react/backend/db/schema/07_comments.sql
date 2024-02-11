-- Drop and recreate comments table (Example)

DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  comment_ID SERIAL PRIMARY KEY NOT NULL,
  post_ID INTEGER REFERENCES posts(post_ID),
  user_ID INTEGER REFERENCES users(user_ID),
  content VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
