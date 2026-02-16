-- Clear existing quizzes to avoid duplicates during dev
DELETE FROM quizzes;

-- HTML Quizzes
INSERT INTO quizzes (title, description, category, difficulty) VALUES 
('HTML Core', 'Basic HTML tags and structure', 'HTML', 'Core'),
('HTML Advance', 'Forms, Semantic HTML, and Multimedia', 'HTML', 'Advance'),
('HTML Pro', 'Canvas, SVG, and Accessibility', 'HTML', 'Pro');

-- CSS Quizzes
INSERT INTO quizzes (title, description, category, difficulty) VALUES 
('CSS Core', 'Selectors, Colors, and Fonts', 'CSS', 'Core'),
('CSS Advance', 'Flexbox, Grid, and Animations', 'CSS', 'Advance'),
('CSS Pro', 'Architecture, Preprocessors, and Performance', 'CSS', 'Pro');

-- JavaScript Quizzes
INSERT INTO quizzes (title, description, category, difficulty) VALUES 
('JavaScript Core', 'Variables, Functions, and Events', 'JavaScript', 'Core'),
('JavaScript Advance', 'ES6+, Promises, and Async/Await', 'JavaScript', 'Advance'),
('JavaScript Pro', 'Closures, Prototypes, and Design Patterns', 'JavaScript', 'Pro');

-- Java Quizzes
INSERT INTO quizzes (title, description, category, difficulty) VALUES 
('Java Core', 'Syntax, OOP, and Exception Handling', 'Java', 'Core'),
('Java Advance', 'Collections, Generics, and Streams', 'Java', 'Advance'),
('Java Pro', 'Concurrency, JVM Internals, and Reflection', 'Java', 'Pro');

-- Python Quizzes
INSERT INTO quizzes (title, description, category, difficulty) VALUES 
('Python Core', 'Syntax, Data Structures, and Loops', 'Python', 'Core'),
('Python Advance', 'OOP, Decorators, and Iterators', 'Python', 'Advance'),
('Python Pro', 'Metaprogramming and Concurrency', 'Python', 'Pro');

-- C Quizzes
INSERT INTO quizzes (title, description, category, difficulty) VALUES 
('C Core', 'Pointers, Arrays, and Functions', 'C', 'Core'),
('C Advance', 'Memory Management and Structs', 'C', 'Advance'),
('C Pro', 'Macros, Bit Manipulation, and Optimization', 'C', 'Pro');

-- C++ Quizzes
INSERT INTO quizzes (title, description, category, difficulty) VALUES 
('C++ Core', 'Syntax, Classes, and Objects', 'C++', 'Core'),
('C++ Advance', 'Templates, STL, and Exception Handling', 'C++', 'Advance'),
('C++ Pro', 'Move Semantics, Smart Pointers, and Metaprogramming', 'C++', 'Pro');
