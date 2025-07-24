import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OtpVerification = ({ phone, onVerifyOtp }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      onVerifyOtp(otp); // Call the parent function to verify OTP
      navigate("/home"); // Redirect to the Home page on success
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