import { useEffect, useState } from "react";
import API from "../services/api";
import {
    Box,
    Grid,
    Paper,
    TextField,
    Button,
    Typography,
    MenuItem,
    IconButton
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [form, setForm] = useState({
        subject_name: "",
        class_id: "",
        teacher_id: ""
    });
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        const s = await API.get("/subjects");
        setSubjects(s.data);
    };

    const fetchClasses = async () => {
        const res = await API.get("/classes");
        setClasses(res.data);
    };

    const fetchTeachers = async () => {
        const res = await API.get("/teachers");
        setTeachers(res.data);
    };

    useEffect(() => {
        fetchData();
        fetchClasses();
        fetchTeachers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await API.put(`/subjects/${editId}`, form);
            setEditId(null);
        } else {
            await API.post("/subjects", form);
        }
        setForm({ subject_name: "", class_id: "", teacher_id: "" });
        fetchData();
    };

    const handleEdit = (row) => {
        setEditId(row.id);
        setForm({
            subject_name: row.subject_name,
            class_id: row.class_id,
            teacher_id: row.teacher_id
        });
    };

    const handleDelete = async (id) => {
        await API.delete(`/subjects/${id}`);
        fetchData();
    };

    const columns = [
        { field: "subject_name", headerName: "Subject", flex: 1 },
        { field: "class_name", headerName: "Class", flex: 1,  },
        { field: "section", headerName: "Section", flex: 1,  },
        { field: "teacher_name", headerName: "Teacher", flex: 1 },
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
            )
        }
    ];

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" mb={3}>Manage Subjects</Typography>

            <Paper sx={{ p: 3, mb: 3, border: "1px solid grey" }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Subject Name"
                                value={form.subject_name}
                                onChange={(e) => setForm({ ...form, subject_name: e.target.value })}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                label="Class"
                                value={form.class_id}
                                onChange={(e) => setForm({ ...form, class_id: e.target.value })}
                                fullWidth
                            >
                                {classes.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>{c.class_name} - {c.section}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                label="Teacher"
                                value={form.teacher_id}
                                onChange={(e) => setForm({ ...form, teacher_id: e.target.value })}
                                fullWidth

                            >
                                <MenuItem value="" disabled>
                                    Select Teacher
                                </MenuItem>
                                {teachers.map((t) => (
                                    <MenuItem key={t.id} value={t.id}>
                                        {t.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color={editId ? "warning" : "primary"}
                                fullWidth
                            >
                                {editId ? "Update Subject" : "Add Subject"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            <Paper sx={{ height: 450, border: "1px solid grey", p: 2 }}>
                <DataGrid
                    rows={subjects}
                    columns={columns}
                    pageSize={5}
                    getRowId={(row) => row.id}
                />
            </Paper>
        </Box>
    );
};

export default Subjects;