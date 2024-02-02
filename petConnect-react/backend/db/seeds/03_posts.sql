-- Seeds for Posts Table
INSERT INTO posts (user_ID, pet_ID, style, sub_ID, registration_date, imageURL)
VALUES
  (1, 1, 'photo', 'Lorem ipsum dolor sit amet.', '2024-01-01', 'https://example.com/image1.jpg'),
  (2, 2, 'text', 'Ut enim ad minim veniam.', '2024-01-02', NULL), -- No image for this post
  (3, 1, 'event', 'Duis aute irure dolor in reprehenderit.', '2024-01-03', 'https://example.com/image3.jpg')
  -- Add more posts as needed
;