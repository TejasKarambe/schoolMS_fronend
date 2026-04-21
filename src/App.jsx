import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes with layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Box sx={{ display: "flex" }}>
                <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Navbar />
                  <Dashboard searchTerm={searchTerm} />
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <Box sx={{ display: "flex" }}>
                <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Navbar />
                  <Classes searchTerm={searchTerm} />
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Box sx={{ display: "flex" }}>
                <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Navbar />
                  <Students searchTerm={searchTerm} />
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <Box sx={{ display: "flex" }}>
                <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Navbar />
                  <Teachers searchTerm={searchTerm} />
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Box sx={{ display: "flex" }}>
                <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Navbar />
                  <Attendance searchTerm={searchTerm} />
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <Box sx={{ display: "flex" }}>
                <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Navbar />
                  <Subjects searchTerm={searchTerm} />
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/timetable"
          element={
            <ProtectedRoute>
              <Box sx={{ display: "flex" }}>
                <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Navbar />
                  <Timetable searchTerm={searchTerm} />
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <Box sx={{ display: "flex" }}>
                <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Navbar />
                  <ChangePassword />
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
        
        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;