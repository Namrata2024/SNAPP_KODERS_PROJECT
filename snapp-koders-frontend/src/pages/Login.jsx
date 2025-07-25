// pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/Auth/AuthLayout';
import Signin from '../components/Auth/Signin';
import SignUpForm from '../components/Auth/SignUpForm';
import { Button, Box } from '@mui/material';

const Login = () => {
  const [step, setStep] = useState('login'); // 'login' or 'signup'
  const navigate = useNavigate();

  const handleVerifyOtp = (otp) => {
    if (otp === '123456') {
      navigate('/signup');
    } else {
      alert('Incorrect OTP (try 123456)');
    }
  };

  const handleSwitch = (newStep) => {
    setStep(newStep);
  };

  return (
    <AuthLayout activeStep={step === 'login' ? 0 : 1}>
      {/* Toggle Buttons */}
      <Box display="flex" justifyContent="center" gap={2} mb={2}>
        <Button
          variant={step === 'login' ? 'contained' : 'outlined'}
          onClick={() => handleSwitch('login')}
        >
          Login
        </Button>
        <Button
          variant={step === 'signup' ? 'contained' : 'outlined'}
          onClick={() => handleSwitch('signup')}
        >
          Signup
        </Button>
      </Box>

      {/* Forms */}
      {step === 'login' && <Signin />}
      {step === 'signup' && <SignUpForm />}
    </AuthLayout>
  );
};

export default Login;
