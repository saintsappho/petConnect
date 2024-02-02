-- Seeds for Messages Table
INSERT INTO messages (chat_ID, sender, receiver, message, timestamp)
VALUES
  (1, 1, 2, "Hello! How are you?", '2024-01-01T12:00:00'),
  (1, 2, 1, "Hi! I'm good, thanks.", '2024-01-01T12:15:00'),
  (2, 3, 2, "Hey there!", '2024-01-02T14:00:00')
  -- Add more messages as needed
;
