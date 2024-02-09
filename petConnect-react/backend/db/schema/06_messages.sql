-- Drop and recreate messages table (Example)

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  message_ID SERIAL PRIMARY KEY NOT NULL,
  chat_ID INTEGER REFERENCES chats(chat_ID),
  sender VARCHAR(255) NOT NULL,
  receiver VARCHAR(255) NOT NULL,
  message VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
