-- Seeds for Posts Table
INSERT INTO posts (user_ID,  pet_ID, style, title, content, registration_date, imageURL)
VALUES
  (1, 1, 'photo', '', 'description of photo post', '2024-01-01', '../public/Dog-2.jpeg'),
  (2, 2, 'text', 'sample post title', 'description of text post', '2024-01-02', NULL), -- No image for this post
  (3, 1, 'event', 'DogParty!', 'description of event post', '2024-01-03', NULL)
  -- Add more posts as needed
;