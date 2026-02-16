package com.quiz.controller;

import com.google.gson.Gson;
import com.quiz.dao.QuizDAO;
import com.quiz.dao.QuestionDAO;
import com.quiz.model.Quiz;
import com.quiz.model.Question;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@WebServlet("/api/quizzes/*")
public class QuizServlet extends HttpServlet {
    private QuizDAO quizDAO = new QuizDAO();
    private QuestionDAO questionDAO = new QuestionDAO();
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        setAccessControlHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String pathInfo = req.getPathInfo();
        PrintWriter out = resp.getWriter();

        if (pathInfo == null || pathInfo.equals("/")) {
            // GET /api/quizzes - List all
            List<Quiz> quizzes = quizDAO.getAllQuizzes();
            out.print(gson.toJson(quizzes));
        } else {
            // /123 or /123/questions
            String[] splits = pathInfo.split("/");
            if (splits.length > 1) {
                try {
                    int quizId = Integer.parseInt(splits[1]);
                    if (splits.length == 2) {
                        // GET /api/quizzes/123
                        Quiz quiz = quizDAO.getQuizById(quizId);
                        if (quiz != null) {
                            out.print(gson.toJson(quiz));
                        } else {
                            sendError(resp, HttpServletResponse.SC_NOT_FOUND, "Quiz not found");
                        }
                    } else if (splits.length == 3 && "questions".equals(splits[2])) {
                        // GET /api/quizzes/123/questions
                        List<Question> questions = questionDAO.getQuestionsByQuizId(quizId);
                        out.print(gson.toJson(questions));
                    } else {
                        sendError(resp, HttpServletResponse.SC_NOT_FOUND, "Invalid endpoint");
                    }
                } catch (NumberFormatException e) {
                    sendError(resp, HttpServletResponse.SC_BAD_REQUEST, "Invalid quiz ID");
                }
            }
        }
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        setAccessControlHeaders(resp);
        resp.setContentType("application/json");
        // Simplified: Create Quiz (TODO: Add auth check & create questions logic)
        // For now, assume this is manually populated via SQL or a separate Admin tool
        sendError(resp, HttpServletResponse.SC_NOT_IMPLEMENTED, "Creation via API not yet fully implemented");
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    private void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    private void sendError(HttpServletResponse resp, int status, String message) throws IOException {
        resp.setStatus(status);
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        resp.getWriter().print(gson.toJson(error));
    }
}
