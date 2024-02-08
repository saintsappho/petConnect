DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
    poll_ID INT REFERENCES Posts(post_ID) PRIMARY KEY,
    creator_ID INT REFERENCES Users(user_ID),
    title TEXT NOT NULL
);
DROP TABLE IF EXISTS choices CASCADE;
CREATE TABLE choices (
    choice_ID INT PRIMARY KEY,
    poll_ID INT REFERENCES Polls(poll_ID),
    choiceText TEXT NOT NULL
);
DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
    vote_ID INT PRIMARY KEY,
    poll_ID INT REFERENCES Polls(poll_ID),
    choice_ID INT REFERENCES Choices(choice_ID),
    user_ID INT REFERENCES Users(user_ID)
);