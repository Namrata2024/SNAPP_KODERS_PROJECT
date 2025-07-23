// components/Auth/AuthLayout.jsx
import React from "react";
import { Box, Typography, Stepper, Step, StepLabel, useMediaQuery, useTheme } from "@mui/material";
import Logo from "../../../public/assets/bachat-saathi.png"; // Place your logo in src/assets/

const steps = ["Enter Phone", "Verify OTP", "Complete Profile"];

const AuthLayout = ({ activeStep, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      p={isMobile ? 2 : 4}
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    //   bgcolor="#f9f9f9"
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "#fff",
          p: isMobile ? 2 : 3,
          borderRadius: 3,
        //   boxShadow: 3,
        }}
      >
        {/* Logo */}
        <Box mb={2} display="flex" justifyContent="center">
          <img
            src={Logo}
            alt="App Logo"
            style={{
              width: isMobile ? 70 : 90,
              borderRadius: "50%",
            }}
          />
        </Box>

        {/* Title */}
        <Typography variant={isMobile ? "h6" : "h5"} align="center" gutterBottom>
          Welcome
        </Typography>

        {/* Stepper */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            width: "100%",
            mb: isMobile ? 2 : 3,
            "& .MuiStepLabel-label": {
              fontSize: isMobile ? "0.75rem" : "0.875rem",
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Page Content */}
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
