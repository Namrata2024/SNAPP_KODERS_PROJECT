// pages/Signup.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignUpForm from "../components/Auth/SignUpForm";
import AuthLayout from "../components/Auth/AuthLayout";
import { Typography, Box } from "@mui/material";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone;

  const handleSubmit = (data) => {
    console.log("Final user data:", { phone, ...data });
    navigate("/", { replace: true });
  };

  return (
    <AuthLayout activeStep={2}>
      {!phone ? (
        <Box p={2}>
          <Typography variant="h6">Invalid access. Go back to login.</Typography>
        </Box>
      ) : (
        <SignUpForm onSubmit={handleSubmit} />
      )}
    </AuthLayout>
  );
};

export default Signup;
