-- Seeds for Messages Table
INSERT INTO messages (chat_ID, sender, receiver, message, timestamp)
VALUES
  (1, 'Bob Doug', 'John Deer', 'Hello! How are you?', '2024-01-01T12:00:00'),
  (1, 'Bob Doug', 'John Deer', 'I heard you are in town!', '2024-01-01T12:15:00'),
  (2, 'Bob Doug', 'Jane Plain', 'Hey freind, what a cool app hey!?', '2024-01-02T14:00:00'),
  (3, 'Bob Doug', 'Patrick Stump', 'Hey Patrick!', '2024-01-02T14:00:00')
  -- Add more messages as needed
;
