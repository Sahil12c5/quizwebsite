package com.quiz.dao;

import com.quiz.config.DatabaseConfig;
import com.quiz.model.UserScore;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserScoreDAO {

    public boolean saveScore(int userId, int quizId, int score, int totalQuestions) {
        String sql = "INSERT INTO user_scores (user_id, quiz_id, score, total_questions) VALUES (?, ?, ?, ?)";
        try (Connection conn = DatabaseConfig.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, userId);
            pstmt.setInt(2, quizId);
            pstmt.setInt(3, score);
            pstmt.setInt(4, totalQuestions);

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<UserScore> getUserHistory(int userId) {
        List<UserScore> history = new ArrayList<>();
        // Join with quizzes to get title/category info
        String sql = "SELECT us.*, q.title, q.category, q.difficulty " +
                "FROM user_scores us " +
                "JOIN quizzes q ON us.quiz_id = q.id " +
                "WHERE us.user_id = ? " +
                "ORDER BY us.taken_at DESC";

        try (Connection conn = DatabaseConfig.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, userId);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    UserScore us = new UserScore();
                    us.setId(rs.getInt("id"));
                    us.setUserId(rs.getInt("user_id"));
                    us.setQuizId(rs.getInt("quiz_id"));
                    us.setScore(rs.getInt("score"));
                    us.setTotalQuestions(rs.getInt("total_questions"));
                    us.setTakenAt(rs.getTimestamp("taken_at"));

                    // Enriched data from Join
                    us.setQuizTitle(rs.getString("title"));
                    us.setCategory(rs.getString("category"));
                    us.setDifficulty(rs.getString("difficulty"));

                    history.add(us);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return history;
    }

    public double getAverageScorePercentage(int userId) {
        String sql = "SELECT AVG(CAST(score AS FLOAT) / total_questions * 100) as avg_pct FROM user_scores WHERE user_id = ? AND total_questions > 0";
        try (Connection conn = DatabaseConfig.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, userId);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getDouble("avg_pct");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0.0;
    }

    public int getTotalQuizzesTaken(int userId) {
        String sql = "SELECT COUNT(*) FROM user_scores WHERE user_id = ?";
        try (Connection conn = DatabaseConfig.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, userId);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next())
                    return rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }
}
