import { AppBar, Toolbar, Typography, Button, Box, TextField } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";

const Navbar = ({ searchTerm, setSearchTerm } ) => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { label: "Classes", path: "/classes", icon: <ClassIcon /> },
    { label: "Students", path: "/students", icon: <PeopleIcon /> },
    { label: "Teachers", path: "/teachers", icon: <PeopleIcon /> },
    { label: "Attendance", path: "/attendance", icon: <EventIcon /> },
    { label: "Subjects", path: "/subjects", icon: <EventIcon /> },
    { label: "Timetable", path: "/timetable", icon: <EventIcon /> }
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          School Management
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: "#fff",
                backgroundColor:
                  location.pathname === item.path
                    ? "rgba(255,255,255,0.2)"
                    : "transparent",
                borderRadius: 2
              }}
            >
              {item.label}
            </Button>
          ))} */}
          <Box sx={{ p: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          fullWidth
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
      </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;