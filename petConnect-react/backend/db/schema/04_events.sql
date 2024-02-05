-- Drop and recreate events table (Example)
-- table includes creator_ID, title, description, location, scheduled date of event

DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events (
  event_ID SERIAL PRIMARY KEY,
  creator_ID INTEGER REFERENCES users(user_ID),
  title VARCHAR(255) NOT NULL,
  event_description VARCHAR(255) NOT NULL,
  event_location VARCHAR(255) NOT NULL,
  scheduled_date DATE,
  scheduled_time INTEGER
);
