package com.quiz.controller;

import com.google.gson.Gson;
import com.quiz.dao.UserScoreDAO;
import com.quiz.model.UserScore;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/api/profile/*")
public class ProfileServlet extends HttpServlet {
    private UserScoreDAO userScoreDAO = new UserScoreDAO();
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        setAccessControlHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String pathInfo = req.getPathInfo(); // Expected: /{userId} or /{userId}/history
        PrintWriter out = resp.getWriter();

        if (pathInfo != null) {
            String[] splits = pathInfo.split("/");
            if (splits.length >= 2) {
                try {
                    int userId = Integer.parseInt(splits[1]);

                    // GET /api/profile/{userId} -> Returns stats + recent history
                    Map<String, Object> profileData = new HashMap<>();

                    int totalTaken = userScoreDAO.getTotalQuizzesTaken(userId);
                    double avgScore = userScoreDAO.getAverageScorePercentage(userId);
                    List<UserScore> history = userScoreDAO.getUserHistory(userId);

                    profileData.put("totalQuizzesTaken", totalTaken);
                    profileData.put("averageScore", Math.round(avgScore * 100.0) / 100.0); // Round to 2 decimals
                    profileData.put("history", history);

                    out.print(gson.toJson(profileData));
                    out.flush();
                    return;

                } catch (NumberFormatException e) {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    return;
                }
            }
        }
        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
    }

    // Also handle saving scores here since it's related to UserScores?
    // Or keep it in QuizServlet/ScoreServlet. Let's create a ScoreServlet or handle
    // POST here.
    // For simplicity, let's Handle POST /api/profile/score (Submit score)
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        setAccessControlHeaders(resp);
        resp.setContentType("application/json");

        // POST /api/profile/score
        if ("/score".equals(req.getPathInfo())) {
            try {
                UserScore scoreData = gson.fromJson(req.getReader(), UserScore.class);
                // TODO: server-side validation of score vs actual answers (skipping for now)

                boolean success = userScoreDAO.saveScore(
                        scoreData.getUserId(),
                        scoreData.getQuizId(),
                        scoreData.getScore(),
                        scoreData.getTotalQuestions());

                if (success) {
                    resp.setStatus(HttpServletResponse.SC_OK);
                    resp.getWriter().print("{\"message\": \"Score saved\"}");
                } else {
                    resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                }
            } catch (Exception e) {
                e.printStackTrace();
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        }
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    private void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
}
