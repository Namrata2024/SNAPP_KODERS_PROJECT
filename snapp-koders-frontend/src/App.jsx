import React, { useState } from 'react';
import SpeechLanguageSelector from './components/SpeechLanguageSelector';
import SpeechToText from './components/SpeechToText';
import FinancialAdvice from './components/FinancialAdvice';
import ExpenseList from './components/ExpenseList';

const App = () => {
  const [selectedLang, setSelectedLang] = useState(null);

// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { CssBaseline } from "@mui/material";
import SpeechToText from "./SpeechToText"
import Home from "./pages/Home"

function App() {
  return (
    <div className="w-screen h-screen">
        {!selectedLang ? (
        <SpeechLanguageSelector onLanguageSelected={setSelectedLang} />
      ) : (
        <>
          <SpeechToText selectedLang={selectedLang} />
          <ExpenseList/>
          <FinancialAdvice />
        </>
      )}
  
    </div>   
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/speech-to-text" element={<SpeechToText />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
