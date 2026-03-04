package com.quiz.dao;

import com.quiz.model.UserScore;
import com.quiz.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserScoreDAO {
    public boolean saveScore(UserScore score) throws Exception {
        String sql = "INSERT INTO user_scores (user_id, quiz_id, score, total_questions, time_spent) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, score.getUserId());
            ps.setInt(2, score.getQuizId());
            ps.setInt(3, score.getScore());
            ps.setInt(4, score.getTotalQuestions());
            ps.setInt(5, score.getTimeSpent());
            return ps.executeUpdate() > 0;
        }
    }

    public List<UserScore> getUserHistory(int userId) throws Exception {
        List<UserScore> history = new ArrayList<>();
        String sql = "SELECT us.*, z.title FROM user_scores us " +
                "JOIN quizzes z ON us.quiz_id = z.id " +
                "WHERE us.user_id = ? ORDER BY us.taken_at DESC";
        try (Connection conn = DBConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, userId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                UserScore s = new UserScore();
                s.setScore(rs.getInt("score"));
                s.setTotalQuestions(rs.getInt("total_questions"));
                s.setTimeSpent(rs.getInt("time_spent"));
                s.setQuizTitle(rs.getString("title"));
                history.add(s);
            }
        }
        return history;
    }
}