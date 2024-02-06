CREATE TABLE Polls (
    poll_ID INT PRIMARY KEY,
    creator_ID INT REFERENCES Users(user_ID),
    question TEXT NOT NULL
);

CREATE TABLE Choices (
    choice_ID INT PRIMARY KEY,
    pollID INT REFERENCES Polls(poll_ID),
    choiceText TEXT NOT NULL
);

CREATE TABLE Votes (
    vote_ID INT PRIMARY KEY,
    poll_ID INT REFERENCES Polls(poll_ID),
    choice_ID INT REFERENCES Choices(choice_ID),
    user_ID INT REFERENCES Users(user_ID)
);