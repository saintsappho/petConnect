-- Seeds for Messages Table
INSERT INTO messages (chat_ID, sender, receiver, message, timestamp)
VALUES
  (1, 'Robin Fleur', 'John Deere', 'Hello! How are you?', '2024-01-01T12:00:00'),
  (1, 'Robin Fleur', 'John Deere', 'I heard you are in town!', '2024-01-01T12:15:00'),
  (1, 'John Deere', 'Robin Fleur', 'Hey Robin! Yeah i got back yesterday! meet for coffee?', '2024-01-01T12:15:30'),
  (2, 'Robin Fleur', 'Jane Plain', 'Hey freind, what a cool app hey!?', '2024-01-02T14:00:00'),
  (3, 'Robin Fleur', 'Patrick Stump', 'Hey Patrick!', '2024-01-02T14:00:00'),
  (4, 'Robin Fleur', 'Hayley Williams', 'Hayley, do you want to go walk our dogs?', '2024-01-02T14:00:00'),
  (5, 'Robin Fleur', 'Jason Ng', 'OMG I heard you got a new puppy?!?', '2024-01-02T14:00:00')
  -- Add more messages as needed
;
