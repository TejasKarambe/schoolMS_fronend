import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import API from "../services/api";

const ChangePassword = () => {
  const user = JSON.parse(localStorage.getItem("teacher_user"));

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const handleSubmit = async () => {
    try {
      await API.post("/auth/change-password", {
        email: user.email,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword
      });

      alert("Password updated");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <Box sx={{ width: 300, m: "100px auto" }}>
      <Typography variant="h5">Change Password</Typography>

      <TextField
        label="Old Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={(e) =>
          setForm({ ...form, oldPassword: e.target.value })
        }
      />

      <TextField
        label="New Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={(e) =>
          setForm({ ...form, newPassword: e.target.value })
        }
      />

      <Button fullWidth variant="contained" onClick={handleSubmit}>
        Update Password
      </Button>
    </Box>
  );
};

export default ChangePassword;