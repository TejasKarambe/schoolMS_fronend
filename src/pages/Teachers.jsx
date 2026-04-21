import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await API.get("/teachers");
    setTeachers(res.data);
  };

  const user = JSON.parse(localStorage.getItem("teacher_user"));

  if (user?.role !== "admin") {
    return <h2>Access Denied</h2>;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleResetPassword = async (id) => {
    const newPassword = prompt("Enter new password");

    if (!newPassword) return;

    await API.post("/auth/reset-password", {
      id,
      newPassword,
    });

    alert("Password reset successful");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/teachers/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/teachers", form);
    }
    setForm({ name: "", phone: "", email: "" });
    fetchData();
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setForm({ name: row.name, phone: row.phone, email: row.email });
  };

  const handleDelete = async (id) => {
    await API.delete(`/teachers/${id}`);
    fetchData();
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: "reset",
      headerName: "Reset Password",
      renderCell: (params) => (
        <Button onClick={() => handleResetPassword(params.row.id)}>
          Reset
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3}>
        Manage Teachers
      </Typography>

      <Paper sx={{ p: 3, mb: 3, border: "1px solid grey" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                type="submit"
                variant="contained"
                color={editId ? "warning" : "primary"}
                fullWidth
              >
                {editId ? "Update Teacher" : "Add Teacher"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper sx={{ height: 450, border: "1px solid grey", p: 2 }}>
        <DataGrid
          rows={teachers}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.id}
        />
      </Paper>
    </Box>
  );
};

export default Teachers;
