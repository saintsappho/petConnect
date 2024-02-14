-- Drop and recreate likes table (Example)

DROP TABLE IF EXISTS likes CASCADE;
CREATE TABLE likes (
  like_ID SERIAL PRIMARY KEY NOT NULL,
  post_ID INTEGER REFERENCES posts(post_ID) ON DELETE CASCADE,
  user_ID INTEGER REFERENCES users(user_ID)
);
