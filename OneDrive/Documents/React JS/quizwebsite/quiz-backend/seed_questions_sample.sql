-- Clear existing questions
DELETE FROM questions;

-- Helper to get Quiz IDs (Assuming IDs 1-21 based on insertion order in seed_quizzes.sql)
-- HTML Core (ID 1)
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES 
(1, 'What does HTML stand for?', 'Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyper Tool Multi Language', 'A'),
(1, 'Who is making the Web standards?', 'Google', 'Microsoft', 'Mozilla', 'The World Wide Web Consortium', 'D'),
(1, 'Choose the correct HTML element for the largest heading:', '<h6>', '<heading>', '<h1>', '<head>', 'C');

-- HTML Advance (ID 2)
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES 
(2, 'Which HTML5 element is used to specify a footer for a document or section?', '<bottom>', '<footer>', '<section>', '<end>', 'B'),
(2, 'In HTML, which attribute is used to specify that an input field must be filled out?', 'validate', 'placeholder', 'required', 'formvalidate', 'C');

-- Java Core (ID 10)
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES 
(10, 'Which data type is used to create a variable that should store text?', 'String', 'myString', 'Txt', 'string', 'A'),
(10, 'How do you create a variable with the numeric value 5?', 'x = 5;', 'float x = 5;', 'int x = 5;', 'num x = 5', 'C');

-- Python Core (ID 13)
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES 
(13, 'What is the correct file extension for Python files?', '.pyt', '.pt', '.py', '.python', 'C'),
(13, 'How do you create a variable with the floating number 2.8?', 'x = 2.8', 'int x = 2.8', 'x = float(2.8)', 'Both A and C', 'D');
