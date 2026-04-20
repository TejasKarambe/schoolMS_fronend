import { useEffect, useState } from "react";
import API from "../services/api";
import {
    Box, Grid, Paper, TextField, MenuItem, Button, Typography, IconButton
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Convert "HH:MM" to Date for TimePicker
const timeStringToDate = (time24) => {
    if (!time24) return null;
    const [hours, minutes] = time24.split(':').map(Number);
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);
    return d;
};

// Convert Date from TimePicker to "HH:MM" 24-hour string
const dateToTimeString = (date) => {
    if (!date) return "";
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Convert "HH:MM" 24-hour string to AM/PM format for display
const formatTimeDisplay = (time24) => {
    if (!time24) return "";
    let [hour, minute] = time24.split(':').map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
};

const Timetable = () => {
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [timetable, setTimetable] = useState([]);
    const [form, setForm] = useState({
        class_id: "", subject_id: "", teacher_id: "", day: "", start_time: "", end_time: ""
    });
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        const c = await API.get("/classes");
        const s = await API.get("/subjects");
        const t = await API.get("/teachers");
        setClasses(c.data);
        setSubjects(s.data);
        setTeachers(t.data);
    };

    useEffect(() => { fetchData(); }, []);

    const fetchTimetable = async (classId) => {
        if (!classId) return;
        const res = await API.get(`/timetable/${classId}`);
        const mapped = res.data.map(item => ({
            ...item,
            start_time: formatTimeDisplay(item.start_time),
            end_time: formatTimeDisplay(item.end_time)
        }));
        setTimetable(mapped);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            start_time: form.start_time, // already in 24h
            end_time: form.end_time
        };
        if (editId) await API.put(`/timetable/${editId}`, payload);
        else await API.post("/timetable", payload);

        setForm({ class_id: "", subject_id: "", teacher_id: "", day: "", start_time: "", end_time: "" });
        fetchTimetable(form.class_id);
        setEditId(null);
    };

    const handleEdit = (row) => {
        setEditId(row.id);
        // convert AM/PM to 24h for TimePicker
        const convertTo24 = (t) => {
            if (!t) return "";
            let [time, ampm] = t.split(" ");
            let [hours, minutes] = time.split(":").map(Number);
            if (ampm === "PM" && hours < 12) hours += 12;
            if (ampm === "AM" && hours === 12) hours = 0;
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        };
        setForm({
            class_id: row.class_id,
            subject_id: row.subject_id,
            teacher_id: row.teacher_id,
            day: row.day,
            start_time: convertTo24(row.start_time),
            end_time: convertTo24(row.end_time)
        });
    };

    const handleDelete = async (id) => {
        await API.delete(`/timetable/${id}`);
        fetchTimetable(form.class_id);
    };

    const columns = [
        { field: "day", headerName: "Day", flex: 1 },
        { field: "start_time", headerName: "Start Time", flex: 1 },
        { field: "end_time", headerName: "End Time", flex: 1 },
        { field: "subject_name", headerName: "Subject", flex: 1 },
        { field: "teacher_name", headerName: "Teacher", flex: 1 },
        {
            field: "actions", headerName: "Actions", flex: 1, renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => handleEdit(params.row)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(params.row.id)}><DeleteIcon /></IconButton>
                </>
            )
        }
    ];

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" mb={3}>Timetable Management</Typography>
            <Paper sx={{ p: 3, mb: 3, border: "1px solid grey"}}>
                <TextField
                    select
                    label="Select Class"
                    value={form.class_id}
                    onChange={(e) => { setForm({ ...form, class_id: e.target.value }); fetchTimetable(e.target.value); }}
                    fullWidth
                    sx={{ mb: 3 }}
                >
                    {classes.map(c => <MenuItem key={c.id} value={c.id}>{c.class_name} - {c.section}</MenuItem>)}
                </TextField>


                <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={2}>
                            <TextField select label="Subject" fullWidth
                                value={form.subject_id}
                                onChange={(e) => setForm({ ...form, subject_id: e.target.value })}
                            >
                                {subjects.filter(s => s.class_id == form.class_id).map(s =>
                                    <MenuItem key={s.id} value={s.id}>{s.subject_name}</MenuItem>
                                )}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField select label="Teacher" fullWidth
                                value={form.teacher_id}
                                onChange={(e) => setForm({ ...form, teacher_id: e.target.value })}
                            >
                                {teachers.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField select label="Day" fullWidth
                                value={form.day}
                                onChange={(e) => setForm({ ...form, day: e.target.value })}
                            >
                                {days.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                            </TextField>
                        </Grid>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid item xs={12} md={2}>
                                <TimePicker
                                    label="Start Time"
                                    value={timeStringToDate(form.start_time)}
                                    onChange={(newValue) => setForm({ ...form, start_time: dateToTimeString(newValue) })}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <TimePicker
                                    label="End Time"
                                    value={timeStringToDate(form.end_time)}
                                    onChange={(newValue) => setForm({ ...form, end_time: dateToTimeString(newValue) })}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </Grid>
                        </LocalizationProvider>

                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                            <Button type="submit" variant="contained" color={editId ? "warning" : "primary"} fullWidth>
                                {editId ? "Update" : "Add"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            <Paper sx={{ height: 400, border: "1px solid grey", p: 2 }}>
                <DataGrid
                    rows={timetable}
                    columns={columns}
                    pageSize={6}
                    rowsPerPageOptions={[6]}
                    getRowId={row => row.id}
                />
            </Paper>
        </Box>
    );
};

export default Timetable;