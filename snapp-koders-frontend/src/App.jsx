import React, { useState,useEffect } from 'react';
import SpeechLanguageSelector from './components/SpeechLanguageSelector';
import SpeechToText from './components/SpeechToText';
import FinancialAdvice from './components/FinancialAdvice';
import ExpenseList from './components/ExpenseList';
import axios from 'axios';

const App = () => {
  const [selectedLang, setSelectedLang] = useState(null);
  // const [expenses] = useState([]);
  const [error] = useState('');
  const [expenses, setGrouped] = useState({});

  const fetchExpenses = async () => {
   axios.get('http://localhost:5000/api/expenses')
      .then(res => {
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
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);
  
  return (
    <div className="w-screen h-screen">
        {!selectedLang ? (
        <SpeechLanguageSelector onLanguageSelected={setSelectedLang} />
      ) : (
        <>
          <SpeechToText 
          selectedLang={selectedLang}
          fetchExpenses={fetchExpenses}
           />
          <ExpenseList expenses={expenses} error={error}/>
          <FinancialAdvice />
        </>
      )}
  
    </div>   
  );
};

export default App;
