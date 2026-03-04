# Quiz Master - Full Stack Setup Guide

This project consists of a Java (MVC) Backend, a React Frontend, and a MySQL Database.

## 1. Database Setup
1. Open your MySQL client (Workbench, CLI, etc.).
2. Execute the schema provided in the initial request (if not already done).
3. Execute the sample data script located at:
   `[sample_data.sql](file:///c:/projectwebsite/database/sample_data.sql)`

## 2. Backend Setup (Java)
1. **Update Credentials**: 
   Open `[DBConnection.java](file:///c:/projectwebsite/backend/src/main/java/com/quiz/util/DBConnection.java)` and update the `PASSWORD` field with your MySQL password.
2. **Build**:
   In the `backend` directory, run:
   ```bash
   mvn clean package
   ```
3. **Deploy**:
   Take the generated `quiz-backend.war` from the `target` folder and deploy it to a Servlet Container like **Apache Tomcat 9.0+**.
   - Your backend will be available at `http://localhost:8080/quiz-backend`.

## 3. Frontend Setup (React)
1. **Install Dependencies**:
   In the `frontend` directory, run:
   ```bash
   npm install
   ```
2. **Run Development Server**:
   Run the following command:
   ```bash
   npm run dev
   ```
3. **Access App**:
   Open `http://localhost:5173` (or the URL shown in your terminal).

## Troubleshooting
- **Proxy Error**: If the frontend cannot reach the backend, ensure Tomcat is running on port `8080` and the context path is `/quiz-backend`.
- **CORS/Auth**: The `vite.config.js` is already configured to proxy `/api` requests to the Java server.
