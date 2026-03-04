package com.quiz.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/quiz_db";
    private static final String USERNAME = "root";
    private static final String PASSWORD = ""; // USER: Change this to your MySQL password

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        try {
            Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            System.out.println("DBConnection: Connection established successfully to " + URL);
            return conn;
        } catch (SQLException e) {
            System.err.println("DBConnection: FAILED to connect to " + URL);
            System.err.println("DBConnection: Error: " + e.getMessage());
            throw e;
        }
    }
}
