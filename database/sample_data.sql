-- Sample Data for Quiz Master

-- Insert Quizzes
INSERT INTO quizzes (title, description, category, difficulty) VALUES 
('Java Basics', 'Fundamentals of Java programming including syntax and types.', 'JAVA', 'Core'),
('Java Advanced', 'Advanced topics like Streams, Lambdas and Multi-threading.', 'JAVA', 'Advance'),
('Java Internal Pro', 'Deep dive into JVM internals and performance tuning.', 'JAVA', 'Pro'),
('Python Basics', 'Start your journey with Python syntax and data structures.', 'PYTHON', 'Core');

-- Insert Questions for 'Java Basics' (quiz_id = 1)
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES 
(1, 'Which component of Java is responsible for running the bytecode?', 'JDK', 'JRE', 'JVM', 'JIT', 'C'),
(1, 'What is the default value of a boolean variable in Java?', 'true', 'false', '0', 'null', 'B'),
(1, 'Which keyword is used to inherit a class in Java?', 'implements', 'extends', 'inherits', 'super', 'B'),
(1, 'Which of these is not a primitive data type in Java?', 'int', 'float', 'boolean', 'String', 'D'),
(1, 'What is the size of int data type in Java?', '8-bit', '16-bit', '32-bit', '64-bit', 'C');

-- Add more questions similarly for other quizzes to match the Core(25), Advance(50), Pro(100) requirement.
-- Note: You should populate 25/50/100 questions per quiz for a full experience.
