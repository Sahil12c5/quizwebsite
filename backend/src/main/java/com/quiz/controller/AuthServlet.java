package com.quiz.controller;

import com.google.gson.Gson;
import com.quiz.dao.UserDAO;
import com.quiz.model.User;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/api/auth/*")
public class AuthServlet extends HttpServlet {
    private UserDAO userDAO = new UserDAO();
    private Gson gson = new Gson();

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String pathInfo = req.getPathInfo();
        resp.setContentType("application/json");

        try {
            if ("/login".equals(pathInfo)) {
                User loginReq = gson.fromJson(req.getReader(), User.class);
                User user = userDAO.loginUser(loginReq.getEmail(), loginReq.getPassword());
                if (user != null) {
                    resp.getWriter().write(gson.toJson(user));
                } else {
                    resp.setStatus(401);
                    resp.getWriter().write("{\"error\": \"Invalid Credentials\"}");
                }
            } else if ("/signup".equals(pathInfo)) {
                User user = gson.fromJson(req.getReader(), User.class);
                boolean success = userDAO.registerUser(user);
                resp.getWriter().write("{\"success\": " + success + "}");
            }
        } catch (Exception e) {
            resp.setStatus(500);
            resp.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}