import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    const res = login(form.email, form.password);

    if (res.success) {
      navigate("/");
    } else {
      alert(res.message);
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

      <Button fullWidth onClick={() => navigate("/signup")}>
        Go to Signup
      </Button>
    </Box>
  );
};

export default Login;