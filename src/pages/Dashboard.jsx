// Dashboard.js
import { useEffect, useState } from "react";
import API from "../services/api";
import { Box, Grid, Paper, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const Dashboard = ({ searchTerm }) => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      const [s, c, t, sub, a] = await Promise.all([
        API.get("/students"),
        API.get("/classes"),
        API.get("/teachers"),
        API.get("/subjects"),
        API.get("/attendance", { params: { classId: "", date: today } })
      ]);
      setStudents(s.data);
      setClasses(c.data);
      setTeachers(t.data);
      setSubjects(sub.data);
      setAttendance(a.data || []);
    };
    fetchData();
  }, []);

  // Filter data according to search
  const filterData = (data) =>
    data.filter((item) =>
      Object.values(item).some(
        (val) =>
          val &&
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const presentCount = attendance.filter(a => a.status === "Present").length;

  const cards = [
    {
      title: "Total Students",
      value: searchTerm ? filterData(students).length : students.length,
      icon: <SchoolIcon fontSize="large" color="primary" />
    },
    {
      title: "Total Classes",
      value: searchTerm ? filterData(classes).length : classes.length,
      icon: <ClassIcon fontSize="large" color="success" />
    },
    {
      title: "Total Teachers",
      value: searchTerm ? filterData(teachers).length : teachers.length,
      icon: <EventAvailableIcon fontSize="large" color="warning" />
    },
    {
      title: "Total Subjects",
      value: searchTerm ? filterData(subjects).length : subjects.length,
      icon: <EventAvailableIcon fontSize="large" color="secondary" />
    },
    {
      title: "Today Present",
      value: presentCount,
      icon: <EventAvailableIcon fontSize="large" color="error" />
    }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4} fontWeight="bold">
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 3, border: "1px solid grey"
              }}
            >
              <Box>
                <Typography variant="subtitle1">{card.title}</Typography>
                <Typography variant="h4" fontWeight="bold">{card.value}</Typography>
              </Box>
              {card.icon}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;