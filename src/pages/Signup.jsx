import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/auth";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = () => {
    signup(form);
    alert("Signup successful");
    navigate("/login");
  };

  return (
    <Box sx={{ width: 300, margin: "100px auto" }}>
      <Typography variant="h5">Signup</Typography>

      <TextField
        fullWidth margin="normal"
        label="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

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

      <Button fullWidth variant="contained" onClick={handleSignup}>
        Signup
      </Button>

      <Button fullWidth onClick={() => navigate("/login")}>
        Go to Login
      </Button>
    </Box>
  );
};

export default Signup;