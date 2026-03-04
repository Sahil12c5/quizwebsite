package com.quiz.controller;

import com.google.gson.Gson;
import com.quiz.dao.QuestionDAO;
import com.quiz.model.Question;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/quiz")
public class QuizServlet extends HttpServlet {
    private QuestionDAO questionDAO = new QuestionDAO();
    private Gson gson = new Gson();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String lang = req.getParameter("lang");
        String level = req.getParameter("level");
        int limit = level.equals("Core") ? 25 : level.equals("Advance") ? 50 : 100;

        try {
            List<Question> questions = questionDAO.getQuestions(lang, level, limit);
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson(questions));
        } catch (Exception e) {
            resp.setStatus(500);
            resp.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}