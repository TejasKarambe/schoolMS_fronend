import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Subjects from "./pages/Subjects";
import Teachers from "./pages/Teachers";
import Timetable from "./pages/Timetable";
import { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePassword from "./components/ChangePassword";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem("teacher_user") !== null;

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        // Authenticated layout with Sidebar and Navbar
        <Box sx={{ display: "flex" }}>
          <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard searchTerm={searchTerm} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/classes"
                element={
                  <ProtectedRoute>
                    <Classes searchTerm={searchTerm} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/students"
                element={
                  <ProtectedRoute>
                    <Students searchTerm={searchTerm} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teachers"
                element={
                  <ProtectedRoute>
                    <Teachers searchTerm={searchTerm} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance"
                element={
                  <ProtectedRoute>
                    <Attendance searchTerm={searchTerm} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subjects"
                element={
                  <ProtectedRoute>
                    <Subjects searchTerm={searchTerm} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/timetable"
                element={
                  <ProtectedRoute>
                    <Timetable searchTerm={searchTerm} />
                  </ProtectedRoute>
                }
              />
              <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        // Unauthenticated layout (no Sidebar, no Navbar)
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;