-- Seeds for Posts Table
INSERT INTO posts (user_ID,  pet_ID, style, title, content, registration_date, image_file)
VALUES
  (1, 1, 'photo-post', '', 'description of photo post', '2024-01-01', '../Dog-2.jpeg'),
  (2, 2, 'text-post', 'Rainy-Day with Doggo', 'Went for a walk today, it was rainy.', '2024-01-02', NULL), -- No image for this post
  (3, 1, 'event-post', 'DogParty!', 'description of event post', '2024-01-03', NULL),
  (1, 1, 'photo-post', 'Happy Trails', 'Enjoying a sunny day out on the trails.', '2024-02-01', '../Trail-Hike.jpeg'),
  (4, 3, 'photo-post', 'First Vet Visit', 'Had our first vet visit today. All is good!', '2024-02-02', NULL),
  (2, 4, 'event-post', 'Caturday Picnic', 'Join us for a fun-filled picnic this Saturday!', '2024-02-03', NULL),
  (5, 5, 'video-post', 'Catflip', 'Check out this cool trick!', '2024-02-04', '../Cool-Trick.mp4'),
  (3, 2, 'photo-post', 'Beach Day', 'Nothing beats running on the beach.', '2024-02-05', '../Beach-Run.jpeg'),
  (6, 6, 'health-post', 'Weight Journey', 'Started a new diet, tracking progress here!', '2024-02-06', NULL),
  (2, 3, 'photo-post', 'Sleepy Sunday', 'Catching some Zs after a long playdate.', '2024-02-07', '../Sleepy-Sunday.jpeg'),
  (7, 7, 'text-post', 'DIY Toys', 'Made some DIY toys this weekend. Huge hit!', '2024-02-08', NULL),
  (3, 1, 'challenge-post', '10k Steps Challenge', 'Who else is joining the 10k steps challenge?', '2024-02-09', NULL),
  (4, 4, 'photo-post', 'Snow Day', 'First snow day of the year!', '2024-02-10', '../Snow-Day.jpeg'),
  (8, 8, 'video-post', '', 'Learning to swim', '2024-02-11', '../Swim-Lessons.mp4'),
  (5, 5, 'health-post', 'Vaccination Day', 'Got up to date with vaccinations today.', '2024-02-12', NULL),
  (6, 6, 'event-post', 'Agility Class', 'Starting agility classes next week!', '2024-02-13', NULL),
  (9, 9, 'text-post', 'Grooming Tips', 'Discovered some life-changing grooming tips!', '2024-02-14', NULL),
  (7, 7, 'photo-post', 'New Friend', 'Made a new friend at the park today.', '2024-02-15', '../Park-Friend.jpeg');
  -- Add more posts as needed
;
