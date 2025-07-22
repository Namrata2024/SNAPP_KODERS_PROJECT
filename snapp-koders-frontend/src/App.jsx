import React, { useState } from 'react';
import SpeechLanguageSelector from './SpeechLanguageSelector';
import SpeechToText from './SpeechToText';

const App = () => {
  const [selectedLang, setSelectedLang] = useState(null);

  return (
    <div className="w-screen h-screen">
      {!selectedLang ? (
        <SpeechLanguageSelector onLanguageSelected={setSelectedLang} />
      ) : (
        <>
          <SpeechToText selectedLang={selectedLang} />
          <FinancialAdvice />
        </>
      )}
    </div>
  );
};

export default App;
