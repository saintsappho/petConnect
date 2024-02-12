-- Seeds for Posts Table
INSERT INTO posts (user_ID,  pet_ID, style, title, content, registration_date, image_file)
VALUES
  (1, 1, 'photo-post', '', 'description of photo post', '2024-01-01', '../Dog-2.jpeg'),
  (2, 2, 'text-post', 'Rainy-Day with Doggo', 'Went for a walk today, it was rainy.', '2024-01-02', NULL), -- No image for this post
  (3, 1, 'event-post', 'Dog Party', 'lets party, with all our dogs!', '2024-01-03', NULL),
  (1, 1, 'photo-post', '', 'Enjoying a sunny day out on the trails.', '2024-02-01', 'https://source.unsplash.com/random/300x510?sunny-hike'),
  (4, 3, 'photo-post', '', 'Had our first vet visit today. All is good!', '2024-02-02', 'https://source.unsplash.com/random/300x510?vet-visit'),
  (2, 4, 'event-post', 'Caturday Picnic', 'Join us for a fun-filled picnic this Saturday!', '2024-02-03', NULL),
  (5, 5, 'photo-post', '', 'Check out this cool trick!', '2024-02-04', 'https://source.unsplash.com/random/300x510?cool-cat-trick'),
  (3, 2, 'photo-post', '', 'Nothing beats running on the beach.', '2024-02-05', 'https://source.unsplash.com/random/300x510?beach-run'),
  (6, 6, 'text-post', 'Weight Loss Journey', 'We started a new diet, tracking progress here!', '2024-02-06', NULL),
  (2, 3, 'photo-post', '', 'Catching some Zs after a long playdate.', '2024-02-07', 'https://source.unsplash.com/random/300x510?naptime'),
  (7, 7, 'text-post', 'DIY Toys', 'Made some DIY toys this weekend. Huge hit!', '2024-02-08', NULL),
  (3, 1, 'text-post', '10k Steps Challenge', 'Who else is joining the 10k steps challenge?', '2024-02-09', NULL),
  (4, 4, 'photo-post', '', 'First snow day of the year!', '2024-02-10', 'https://source.unsplash.com/random/300x510?first-snow'),
  (8, 8, 'photo-post', '', 'Learning to swim', '2024-02-11', 'https://source.unsplash.com/random/300x510?dog-swimming'),
  (5, 5, 'text-post', 'Vaccination Day', 'Got up to date with vaccinations today.', '2024-02-12', NULL),
  (6, 6, 'event-post', 'Agility Class', 'Starting agility classes next week!', '2024-02-13', NULL),
  (9, 9, 'text-post', 'Grooming Tips', 'Discovered some life-changing grooming tips!', '2024-02-14', NULL),
  (7, 7, 'photo-post', '', 'Made a new friend at the park today.', '2024-02-15', 'https://source.unsplash.com/random/300x510?dog-park-friend');
  -- Add more posts as needed
;
