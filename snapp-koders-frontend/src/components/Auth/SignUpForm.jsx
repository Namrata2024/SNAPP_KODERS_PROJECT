// components/Auth/SignUpForm.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

const SignUpForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    bankAccount: "",
    age: "",
    gender: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(form.age) < 18) {
      alert("You must be at least 18 years old.");
      return;
    }
    onSubmit(form);
  };

  return (
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Complete Your Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Full Name"
          fullWidth
          value={form.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="bankAccount"
          label="Bank Account Number"
          fullWidth
          value={form.bankAccount}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="age"
          label="Age"
          type="number"
          fullWidth
          value={form.age}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="gender"
          label="Gender"
          select
          fullWidth
          value={form.gender}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {["Male", "Female", "Other"].map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="location"
          label="Location"
          fullWidth
          value={form.location}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
