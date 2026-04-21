import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Grid,
  MenuItem
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    class_name: "",
    section: "",
    teacher_id: "",
  });

  const fetchClasses = async () => {
    const res = await API.get("/classes");
    setClasses(res.data);
  };
  const fetchTeachers = async () => {
    const res = await API.get("/teachers");
    setTeachers(res.data);
  };

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/classes/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/classes", form);
    }

    setForm({ class_name: "", section: "", teacher_id: "" });
    fetchClasses();
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setForm({
      class_name: row.class_name,
      section: row.section,
      teacher_id: row.teacher_id, // <-- set teacher_id here
    });
  };


const handleDelete = async (id) => {
  await API.delete(`/classes/${id}`);
  fetchClasses();
};

const columns = [
  { field: "class_name", headerName: "Class Name", flex: 1 },
  { field: "section", headerName: "Section", flex: 1 },
  { field: "teacher_name", headerName: "Teacher", flex: 1 },
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
      Manage Classes
    </Typography>

    {/* Form */}
    <Paper sx={{ p: 3, mb: 4, border: "1px solid grey"}}>
      <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <Grid container spacing={2}>

          <Grid item xs={12} md={3}>
            <TextField
              label="Class Name"
              value={form.class_name}
              onChange={(e) =>
                setForm({ ...form, class_name: e.target.value })
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Section"
              value={form.section}
              onChange={(e) =>
                setForm({ ...form, section: e.target.value })
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              select
              label="Teacher"
              value={form.teacher_id}   // store teacher id
              onChange={(e) => setForm({ ...form, teacher_id: e.target.value })}
              fullWidth
            >
              {teachers.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3} display="flex" alignItems="center">
            <Button
              type="submit"
              variant="contained"
              color={editId ? "warning" : "primary"}
              fullWidth
            >
              {editId ? "Update Class" : "Add Class"}
            </Button>
          </Grid>

        </Grid>
      </Box>
    </Paper>

    {/* DataGrid */}
    <Paper sx={{ height: 400, border: "1px solid grey", p: 2 }}>
      <DataGrid
        rows={classes}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id}
      />
    </Paper>
  </Box>
);
};

export default Classes;