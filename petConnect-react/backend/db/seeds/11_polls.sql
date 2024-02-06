INSERT INTO Polls (poll_ID, creator_ID, question) VALUES
(1, 1, 'What is your favorite programming language?'),
(2, 2, 'Which movie genre do you prefer?'),
(3, 3, 'What is your preferred method of transportation?');

-- Seeds for the Choices table
INSERT INTO Choices (choice_ID, pollID, choiceText) VALUES
(1, 1, 'Java'),
(2, 1, 'Python'),
(3, 1, 'JavaScript'),
(4, 2, 'Action'),
(5, 2, 'Comedy'),
(6, 2, 'Drama'),
(7, 3, 'Car'),
(8, 3, 'Bicycle'),
(9, 3, 'Public transit');

-- Seeds for the Votes table
INSERT INTO Votes (vote_ID, poll_ID, choice_ID, user_ID) VALUES
(1, 1, 2, 1),
(2, 1, 3, 2),
(3, 2, 5, 3),
(4, 2, 6, 2),
(5, 3, 7, 2),
(6, 3, 8, 3),
(7, 3, 9, 1);