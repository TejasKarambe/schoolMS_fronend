// Sidebar.js
import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  TextField,
  Divider
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";

const navItems = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Classes", path: "/classes", icon: <ClassIcon /> },
  { label: "Students", path: "/students", icon: <PeopleIcon /> },
  { label: "Teachers", path: "/teachers", icon: <PeopleIcon /> },
  { label: "Attendance", path: "/attendance", icon: <EventIcon /> },
  { label: "Subjects", path: "/subjects", icon: <EventIcon /> },
  { label: "Timetable", path: "/timetable", icon: <EventIcon /> }
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", backgroundColor: "#1976d2", color: "#fff" }
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <SchoolIcon sx={{ fontSize: 50 }} />
        <Typography variant="h6" sx={{ mt: 1 }}>Classroom Management</Typography>
      </Box>

      {/* <Box sx={{ p: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          fullWidth
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
      </Box> */}

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.5)" }} />

      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
                color: "#fff",
                backgroundColor:
                  location.pathname === item.path
                    ? "rgba(255,255,255,0.2)"
                    : "transparent",
                borderRadius: 2
              }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;