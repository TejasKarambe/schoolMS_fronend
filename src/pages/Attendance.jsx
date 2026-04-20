import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    API.get("/classes").then(res => setClasses(res.data));
  }, []);

  const loadStudents = async (classId, selectedDate) => {
    if (!classId || !selectedDate) return;

    const s = await API.get("/students");
    const filtered = s.data.filter(st => st.class_id == classId);
    setStudents(filtered);

    const res = await API.get("/attendance", {
      params: { classId, date: selectedDate.toISOString().split("T")[0] }
    });

    const existing = {};
    res.data.forEach(a => {
      existing[a.student_id] = a.status;
    });

    setAttendance(existing);
  };

  const handleStatusChange = (studentId, value) => {
    setAttendance(prev => ({ ...prev, [studentId]: value }));
  };

  const handleSave = async () => {
    if (!selectedClass || !date) {
      alert("Please select class and date");
      return;
    }

    const records = students.map(s => ({
      student_id: s.id,
      class_id: selectedClass,
      date: date.toISOString().split("T")[0],
      status: attendance[s.id] || "Absent"
    }));

    await API.post("/attendance/bulk", records);
    setOpen(true);
  };

  const columns = [
    { field: "name", headerName: "Student Name", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <TextField
          select
          size="small"
          value={attendance[params.row.id] || ""}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          fullWidth
        >
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
          <MenuItem value="Late">Late</MenuItem>
        </TextField>
      )
    }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3}>
        Attendance Management
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Paper sx={{ p: 3, mb: 4, border: "1px solid grey" }}>
        <Box  sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
          <Grid
            container
            spacing={2}
            alignItems="center" // vertically centers all items
            sx={{ '& .MuiTextField-root': { m: 0 } }} // remove default margin
          >
            <Grid item xs={12} md={4}>
              <TextField
                select
                label="Select Class"
                fullWidth
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  if (date) loadStudents(e.target.value, date);
                }}
              >
                {classes.map(c => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.class_name} - {c.section}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <DatePicker
                label="Select Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                  if (selectedClass) loadStudents(selectedClass, newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: "100%" }}
                onClick={handleSave}
              >
                Save Attendance
              </Button>
            </Grid>
          </Grid>
        </Box>
        </Paper>
      </LocalizationProvider>

      <Paper sx={{ height: 450, border: "1px solid grey", p: 2 }}>
        <DataGrid
          rows={students}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={5}
        />
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success">Attendance Saved Successfully</Alert>
      </Snackbar>
    </Box>
  );
};

export default Attendance;