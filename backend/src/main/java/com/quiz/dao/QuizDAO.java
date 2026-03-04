package com.quiz.dao;

import com.quiz.model.Quiz;
import com.quiz.util.DBConnection;
import java.util.ArrayList;
import java.util.List;
import java.sql.*;

public class QuizDAO {
    public List<Quiz> getQuizzesByCategoryAndDifficulty(String category, String difficulty) {
        List<Quiz> quizzes = new ArrayList<>();
        String sql = "SELECT * FROM quizzes WHERE category = ? AND difficulty = ?";
        try (Connection conn = DBConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, category);
            pstmt.setString(2, difficulty);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    quizzes.add(new Quiz(
                            rs.getInt("id"),
                            rs.getString("title"),
                            rs.getString("description"),
                            rs.getString("category"),
                            rs.getString("difficulty"),
                            rs.getTimestamp("created_at")));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return quizzes;
    }
}
