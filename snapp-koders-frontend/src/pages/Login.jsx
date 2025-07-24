// pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneLogin from "../components/Auth/PhoneLogin";
import OtpVerification from "../components/Auth/OtpVerification";
import AuthLayout from "../components/Auth/AuthLayout";

const Login = () => {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = (number) => {
    setPhone(number);
    setStep("otp");
  };

  const handleVerifyOtp = (otp) => {
    if (otp === "123456") {
      navigate("/signup", { state: { phone } });
    } else {
      alert("Incorrect OTP (try 123456)");
    }
  };

  return (
    <AuthLayout activeStep={step === "phone" ? 0 : 1}>
      {step === "phone" && <PhoneLogin onSendOtp={handleSendOtp} />}
      {step === "otp" && <OtpVerification phone={phone} onVerifyOtp={handleVerifyOtp} />}
    </AuthLayout>
  );
};

export default Login;
