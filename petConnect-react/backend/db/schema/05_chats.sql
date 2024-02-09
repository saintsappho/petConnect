-- Drop and recreate chats table (Example)

DROP TABLE IF EXISTS chats CASCADE;
CREATE TABLE chats (
  chat_ID SERIAL PRIMARY KEY NOT NULL,
  user1_username VARCHAR(255) NOT NULL,
  user2_username VARCHAR(255) NOT NULL,
  user_photo_url VARCHAR (255) NOT NULL
);
