INSERT INTO Polls (creator_ID, title) VALUES
(1, 'What is your favorite programming language?'),
(2, 'Which movie genre do you prefer?'),
(3, 'What is your preferred method of transportation?');

-- Seeds for the Choices table
INSERT INTO Choices ( poll_ID, choiceText) VALUES
(1, 'Java'),
(1, 'Python'),
(1, 'JavaScript'),
(2, 'Action'),
(2, 'Comedy'),
(2, 'Drama'),
(3, 'Car'),
(3, 'Bicycle'),
(3, 'Public transit');

-- Seeds for the Votes table
INSERT INTO Votes (poll_ID, choice_ID, user_ID) VALUES
(1, 2, 1),
(1, 3, 2),
(2, 5, 3),
(2, 6, 2),
(3, 7, 2),
(3, 8, 3),
(3, 9, 1);