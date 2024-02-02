-- Drop and recreate follows table (Example)

DROP TABLE IF EXISTS follows CASCADE;
CREATE TABLE follows (
  follow_ID SERIAL PRIMARY KEY NOT NULL,
  follower INTEGER REFERENCES users(user_ID),
  follow INTEGER REFERENCES users(user_ID)
);
