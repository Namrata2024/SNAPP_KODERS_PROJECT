// components/Auth/PhoneLogin.jsx
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const PhoneLogin = ({ onSendOtp }) => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (/^\d{10}$/.test(phone)) {
      onSendOtp(phone);
    } else {
      alert("Enter a valid 10-digit phone number");
    }
  };

  return (
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Enter Phone Number</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Phone Number"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Send OTP
        </Button>
      </form>
    </Box>
  );
};

export default PhoneLogin;
