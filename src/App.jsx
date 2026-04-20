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

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard searchTerm={searchTerm} />} />
            <Route path="/classes" element={<Classes searchTerm={searchTerm} />} />
            <Route path="/students" element={<Students searchTerm={searchTerm} />} />
            <Route path="/teachers" element={<Teachers searchTerm={searchTerm} />} />
            <Route path="/attendance" element={<Attendance searchTerm={searchTerm} />} />
            <Route path="/subjects" element={<Subjects searchTerm={searchTerm} />} />
            <Route path="/timetable" element={<Timetable searchTerm={searchTerm} />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;