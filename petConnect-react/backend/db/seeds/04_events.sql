-- Seeds for Events Table
INSERT INTO events (post_ID, creator_ID, title, event_description, event_location, event_date, end_date)
VALUES
  (3, 3, 'Dog Party', 'lets party, with all our dogs!', 'Dog Park', '2024-01-03 18:00', '2024-01-03 18:30'),
  (6, 10, 'Pet Health Seminar', 'Learn about pet health', 'Community Center', '2024-03-01 18:00', '2024-03-01 20:00'),
  (2, 1, 'Cat Playdate', 'Fun time for cats', 'Living Room', '2024-02-15 11:00', '2024-02-16 11:00'),
  (10, 2, 'Puppy Playdate', 'A playdate for adorable puppies only. Do not bring ugly dogs.', 'Dog Park', '2024-03-10 14:00', '2024-03-10 16:00'),
  (13, 5, 'Training Workshop', 'Train your pets with the experts', 'Training Center', '2024-03-20 16:00', '2024-03-20 18:00'),
  (16, 8, 'Pet Adoption Event', 'Find your new furry friend', 'Animal Shelter', '2024-03-25 10:00', '2024-03-25 15:00');
