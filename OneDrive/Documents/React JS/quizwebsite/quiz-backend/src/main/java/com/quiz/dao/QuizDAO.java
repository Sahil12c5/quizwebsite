package com.quiz.dao;

import com.quiz.config.DatabaseConfig;
import com.quiz.model.Quiz;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class QuizDAO {

    public List<Quiz> getAllQuizzes() {
        List<Quiz> quizzes = new ArrayList<>();
        String sql = "SELECT * FROM quizzes ORDER BY category ASC, id ASC"; // Ordered by Category
        try (Connection conn = DatabaseConfig.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql);
                ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                Quiz quiz = new Quiz();
                quiz.setId(rs.getInt("id"));
                quiz.setTitle(rs.getString("title"));
                quiz.setDescription(rs.getString("description"));
                quiz.setCategory(rs.getString("category"));
                quiz.setDifficulty(rs.getString("difficulty"));
                quiz.setCreatedAt(rs.getTimestamp("created_at"));
                quizzes.add(quiz);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return quizzes;
    }

    public Quiz getQuizById(int id) {
        String sql = "SELECT * FROM quizzes WHERE id = ?";
        try (Connection conn = DatabaseConfig.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    Quiz quiz = new Quiz();
                    quiz.setId(rs.getInt("id"));
                    quiz.setTitle(rs.getString("title"));
                    quiz.setDescription(rs.getString("description"));
                    quiz.setCategory(rs.getString("category"));
                    quiz.setDifficulty(rs.getString("difficulty"));
                    quiz.setCreatedAt(rs.getTimestamp("created_at"));
                    return quiz;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean createQuiz(Quiz quiz) {
        String sql = "INSERT INTO quizzes (title, description, category, difficulty) VALUES (?, ?, ?, ?)";
        try (Connection conn = DatabaseConfig.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            pstmt.setString(1, quiz.getTitle());
            pstmt.setString(2, quiz.getDescription());
            pstmt.setString(3, quiz.getCategory());
            pstmt.setString(4, quiz.getDifficulty());

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        quiz.setId(generatedKeys.getInt(1));
                    }
                }
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
