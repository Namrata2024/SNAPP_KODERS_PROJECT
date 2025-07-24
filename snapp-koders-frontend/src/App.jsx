import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import axios from 'axios';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ChatPage from "./pages/ChatPage"
import SpeechLanguageSelector from './components/SpeechLanguageSelector';
import SpeechToText from './components/SpeechToText';
import FinancialAdvice from './components/FinancialAdvice';
import ExpenseList from './components/ExpenseList';
import Navbar from "./components/Navbar";

const App = () => {
  const [selectedLang, setSelectedLang] = useState(null);
  // const [expenses] = useState([]);
  const [error] = useState('');
  const [expenses, setGrouped] = useState({});

  const fetchExpenses = async () => {
    axios
      .get('http://localhost:5000/api/expenses')
      .then((res) => {
        const expenses = res.data;
        const groupedData = expenses.reduce((acc, curr) => {
          // Skip if curr is not an object or lacks amount
          if (
            !curr ||
            typeof curr !== 'object' ||
            typeof curr.amount !== 'number' ||
            isNaN(curr.amount)
          ) {
            return acc;
          }

          const cat = curr.category;
          if (!acc[cat]) {
            acc[cat] = { total: 0, items: [] };
          }
          acc[cat].total += curr.amount;
          acc[cat].items.push(curr);
          return acc;
        }, {});
        setGrouped(groupedData);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
       <Router>
    <Navbar/>
      <CssBaseline />
     
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
             <Route path="/chatbot" element={<ChatPage />} />
          <Route
            path="/speech-to-text"
            element={
              !selectedLang ? (
                <SpeechLanguageSelector onLanguageSelected={setSelectedLang} />
              ) : (
                <div className="w-screen h-screen">
                  <SpeechToText selectedLang={selectedLang} />
                  <ExpenseList />
                  <FinancialAdvice />
                </div>
              )
            }
          />
          <Route
            path="/speech-to-text"
            element={
              !selectedLang ? (
                <SpeechLanguageSelector onLanguageSelected={setSelectedLang} />
              ) : (
                <div className="w-screen h-screen">
                  <SpeechToText
                    selectedLang={selectedLang}
                    fetchExpenses={fetchExpenses}
                  />
                                    <ExpenseList  />
                  <FinancialAdvice />
                </div>
              )
            }
          />
          {/* <Route path="/expense-tracker" element={<ExpenseList  />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/financial-advice" element={<FinancialAdvice />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
     </Router>
    </>
  );
};

export default App;
