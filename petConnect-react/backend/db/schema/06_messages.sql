-- Drop and recreate messages table (Example)

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  message_ID SERIAL PRIMARY KEY NOT NULL,
  chat_ID INTEGER REFERENCES chats(chat_ID),
  sender INTEGER REFERENCES users(user_ID),
  receiver INTEGER REFERENCES users(user_ID),
  message VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
