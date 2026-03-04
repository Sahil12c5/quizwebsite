package com.quiz.controller;

import com.google.gson.Gson;
import com.quiz.dao.UserScoreDAO;
import com.quiz.model.UserScore;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/scores")
public class ScoreServlet extends HttpServlet {
    private UserScoreDAO scoreDAO = new UserScoreDAO();
    private Gson gson = new Gson();

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            UserScore score = gson.fromJson(req.getReader(), UserScore.class);
            boolean success = scoreDAO.saveScore(score);
            resp.setContentType("application/json");
            resp.getWriter().write("{\"success\": " + success + "}");
        } catch (Exception e) {
            resp.setStatus(500);
        }
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        int userId = Integer.parseInt(req.getParameter("userId"));
        try {
            List<UserScore> history = scoreDAO.getUserHistory(userId);
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson(history));
        } catch (Exception e) {
            resp.setStatus(500);
        }
    }
}