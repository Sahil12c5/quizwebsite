package com.quiz.controller;

import com.google.gson.Gson;
import com.quiz.dao.UserDAO;
import com.quiz.model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/api/auth/*")
public class AuthServlet extends HttpServlet {
    private UserDAO userDAO = new UserDAO();
    private Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        setAccessControlHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String pathInfo = req.getPathInfo(); // /register or /login

        if (pathInfo == null || pathInfo.equals("/")) {
            sendError(resp, HttpServletResponse.SC_BAD_REQUEST, "Missing endpoint");
            return;
        }

        BufferedReader reader = req.getReader();
        User user = gson.fromJson(reader, User.class);
        PrintWriter out = resp.getWriter();
        Map<String, Object> responseData = new HashMap<>();

        if ("/register".equals(pathInfo)) {
            if (user.getUsername() == null || user.getPassword() == null || user.getEmail() == null) {
                sendError(resp, HttpServletResponse.SC_BAD_REQUEST, "Username, email, and password required");
                return;
            }
            if (userDAO.isUsernameTaken(user.getUsername())) {
                sendError(resp, HttpServletResponse.SC_CONFLICT, "Username already exists");
                return;
            }
            // In a real app, hash the password here using BCrypt!
            user.setRole("USER"); // Default role
            if (userDAO.registerUser(user)) {
                responseData.put("message", "Registration successful");
                out.print(gson.toJson(responseData));
            } else {
                sendError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Registration failed");
            }
        } else if ("/login".equals(pathInfo)) {
            User loggedInUser = userDAO.loginUser(user.getUsername(), user.getPassword());
            if (loggedInUser != null) {
                responseData.put("message", "Login successful");
                responseData.put("user", loggedInUser);
                out.print(gson.toJson(responseData));
            } else {
                sendError(resp, HttpServletResponse.SC_UNAUTHORIZED, "Invalid credentials");
            }
        } else {
            sendError(resp, HttpServletResponse.SC_NOT_FOUND, "Endpoint not found");
        }
        out.flush();
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    private void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow frontend
        resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    private void sendError(HttpServletResponse resp, int status, String message) throws IOException {
        resp.setStatus(status);
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        resp.getWriter().print(gson.toJson(error));
    }
}
