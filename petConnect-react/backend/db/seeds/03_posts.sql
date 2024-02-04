-- Seeds for Posts Table
INSERT INTO posts (user_ID,  pet_ID, style, title, content, registration_date, image_file)
VALUES
  (1, 1, 'photo-post', '', 'description of photo post', '2024-01-01', '../public/Dog-2.jpeg'),
  (2, 2, 'text-post', 'sample post title', 'description of text post', '2024-01-02', NULL), -- No image for this post
  (3, 1, 'event-post', 'DogParty!', 'description of event post', '2024-01-03', NULL)
  -- Add more posts as needed
;