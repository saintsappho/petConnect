-- Drop and recreate attendees table (Example)

DROP TABLE IF EXISTS attendees CASCADE;
CREATE TABLE attendees (
  user_ID INTEGER REFERENCES users(user_ID),
  event_ID INTEGER REFERENCES events(event_ID),
  rsvp_status INTEGER DEFAULT 0
);
