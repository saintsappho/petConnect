-- Drop and recreate chats table (Example)

DROP TABLE IF EXISTS chats CASCADE;
CREATE TABLE chats (
  chat_ID SERIAL PRIMARY KEY NOT NULL,
  user1_ID INTEGER REFERENCES users(user_ID),
  user2_ID INTEGER REFERENCES users(user_ID)
);
