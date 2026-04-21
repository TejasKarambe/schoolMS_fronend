import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import API from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email: form.email.trim(),
      password: form.password.trim()
    });

    // ✅ store logged-in user
    localStorage.setItem("teacher_user", JSON.stringify(res.data));

    navigate("/");
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <Box sx={{ width: 300, margin: "100px auto" }}>
      <Typography variant="h5">Login</Typography>

      <TextField
        fullWidth margin="normal"
        label="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <TextField
        fullWidth margin="normal"
        label="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <Button fullWidth variant="contained" onClick={handleLogin}>
        Login
      </Button>

    </Box>
  );
};

export default Login;