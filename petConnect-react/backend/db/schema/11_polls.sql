-- Drop existing tables
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS choices CASCADE;
DROP TABLE IF EXISTS polls CASCADE;

-- Create tables
CREATE TABLE polls (
    poll_ID SERIAL PRIMARY KEY,
    creator_ID INT REFERENCES users(user_ID),
    title TEXT NOT NULL
);

CREATE TABLE choices (
    choice_ID SERIAL PRIMARY KEY,
    poll_ID INT REFERENCES polls(poll_ID),
    choiceText TEXT NOT NULL
);

CREATE TABLE votes (
    vote_ID SERIAL PRIMARY KEY,
    poll_ID INT REFERENCES polls(poll_ID),
    choice_ID INT REFERENCES choices(choice_ID),
    user_ID INT REFERENCES users(user_ID)
);