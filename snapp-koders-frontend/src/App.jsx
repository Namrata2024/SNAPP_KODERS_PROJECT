import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage"
import SpeechLanguageSelector from "./components/SpeechLanguageSelector";
import SpeechToText from "./components/SpeechToText";
import FinancialAdvice from "./components/FinancialAdvice";
import ExpenseList from "./components/ExpenseList";
import Navbar from "./components/Navbar";

const App = () => {
  const [selectedLang, setSelectedLang] = useState(null);

  return (
    <>
    <Navbar/>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/speech-to-text" element={
            !selectedLang ? (
              <SpeechLanguageSelector onLanguageSelected={setSelectedLang} />
            ) : (
              <div className="w-screen h-screen">
                <SpeechToText selectedLang={selectedLang} />
                <ExpenseList />
                <FinancialAdvice />
              </div>
            )
          } />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
