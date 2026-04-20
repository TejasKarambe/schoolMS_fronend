import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  MenuItem
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    roll_number: "",
    phone: "",
    email: "",
    class_id: ""
  });

  const fetchData = async () => {
    const s = await API.get("/students");
    const c = await API.get("/classes");
    setStudents(s.data);
    setClasses(c.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/students/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/students", form);
    }

    setForm({
      name: "",
      roll_number: "",
      phone: "",
      email: "",
      class_id: ""
    });

    fetchData();
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setForm({
      name: row.name,
      roll_number: row.roll_number,
      phone: row.phone,
      email: row.email,
      class_id: row.class_id
    });
  };

  const handleDelete = async (id) => {
    await API.delete(`/students/${id}`);
    fetchData();
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "roll_number", headerName: "Roll No", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "class_name", headerName: "Class", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3}>
        Manage Students
      </Typography>

      {/* Form */}
      <Paper sx={{ p: 3, mb: 4, border: "1px solid grey" }}>
        <Box component="form" onSubmit={handleSubmit}sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
          <Grid container spacing={2}>
            
            <Grid item xs={12} md={2}>
              <TextField
                label="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                label="Roll Number"
                value={form.roll_number}
                onChange={(e) =>
                  setForm({ ...form, roll_number: e.target.value })
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                label="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                label="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                select
                label="Class"
                value={form.class_id}
                onChange={(e) =>
                  setForm({ ...form, class_id: e.target.value })
                }
                fullWidth
              >
                {classes.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.class_name}{c.section ? ` - ${c.section}` : ""}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <Button
                type="submit"
                variant="contained"
                color={editId ? "warning" : "primary"}
                fullWidth
              >
                {editId ? "Update" : "Add"}
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Paper>

      {/* DataGrid */}
      <Paper sx={{ height: 450, border: "1px solid grey", p: 2 }}>
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id}
        />
      </Paper>
    </Box>
  );
};

export default Students;