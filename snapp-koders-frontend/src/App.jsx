import React, { useState } from 'react';
import SpeechLanguageSelector from './components/SpeechLanguageSelector';
import SpeechToText from './components/SpeechToText';
import FinancialAdvice from './components/FinancialAdvice';
import ExpenseList from './components/ExpenseList';

const App = () => {
  const [selectedLang, setSelectedLang] = useState(null);

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
  );
};

export default App;
