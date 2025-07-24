// components/Auth/OtpVerification.jsx
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const OtpVerification = ({ phone, onVerifyOtp }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      onVerifyOtp(otp);
    } else {
      alert("OTP must be 6 digits");
    }
  };

  return (
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">OTP sent to {phone}</Typography>
      <form onSubmit={handleVerify}>
        <TextField
          label="Enter OTP"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Verify OTP
        </Button>
      </form>
    </Box>
  );
};

export default OtpVerification;
