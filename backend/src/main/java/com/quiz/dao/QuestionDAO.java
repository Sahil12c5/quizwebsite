package com.quiz.dao;

import com.quiz.model.Question;
import com.quiz.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class QuestionDAO {
    public List<Question> getQuestions(String category, String difficulty, int limit) throws Exception {
        List<Question> questions = new ArrayList<>();
        String sql = "SELECT q.* FROM questions q " +
                "JOIN quizzes z ON q.quiz_id = z.id " +
                "WHERE z.category = ? AND z.difficulty = ? " +
                "ORDER BY RAND() LIMIT ?";

        try (Connection conn = DBConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, category);
            ps.setString(2, difficulty);
            ps.setInt(3, limit);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Question q = new Question();
                q.setId(rs.getInt("id"));
                q.setQuestionText(rs.getString("question_text"));
                q.setOptionA(rs.getString("option_a"));
                q.setOptionB(rs.getString("option_b"));
                q.setOptionC(rs.getString("option_c"));
                q.setOptionD(rs.getString("option_d"));
                q.setCorrectOption(rs.getString("correct_option").charAt(0));
                questions.add(q);
            }
        }
        return questions;
    }
}