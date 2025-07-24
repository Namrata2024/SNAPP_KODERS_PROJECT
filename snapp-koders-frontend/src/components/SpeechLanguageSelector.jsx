import React, { useEffect, useState } from 'react';

const ttsSpeak = (text, lang) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  speechSynthesis.speak(utterance);
};

const SpeechLanguageSelector = ({ onLanguageSelected }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [regionalLang, setRegionalLang] = useState('hi-IN');

  const languageOptions = [
    {
      label: 'English',
      code: 'en-US',
      labelText: 'Should I continue in English?',
      btnText: 'Yes (English)',
    },
    {
      label: 'Hindi',
      code: 'hi-IN',
      labelText: 'क्या मैं हिंदी में जारी रखूं?',
      btnText: 'हाँ (हिंदी)',
    },
    {
      label: 'Marathi',
      code: 'mr-IN',
      labelText: 'मी मराठीत बोलू का?',
      btnText: 'होय (मराठी)',
    },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setUserLocation({ lat, lon });

        // Simple regional detection based on lat/lon
        if (lat >= 18 && lat <= 20 && lon >= 72 && lon <= 75) {
          setRegionalLang('mr-IN'); // Maharashtra
        } else if (lat >= 21 && lat <= 28 && lon >= 78 && lon <= 89) {
          setRegionalLang('bn-IN'); // Bengal (for future support)
        } else {
          setRegionalLang('hi-IN'); // Default
        }
      },
      (error) => {
        console.error('Error fetching location:', error);
        setRegionalLang('hi-IN'); // fallback
      }
    );
  }, []);

  const speakOptions = () => {
    languageOptions.forEach((lang) => {
      ttsSpeak(lang.labelText, lang.code);
    });
  };

  useEffect(() => {
    speakOptions();
  }, [regionalLang]);

  return (
    <div className="bg-slate-900 text-white p-6 text-center">
      <h2 className="text-xl mb-4">
        Please press the button for your preferred language:
      </h2>
      <div className="flex flex-col gap-3 items-center">
        {languageOptions.map((lang) => (
          <button
            key={lang.code}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-60"
            onClick={() => onLanguageSelected(lang.code)}
          >
            {lang.btnText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpeechLanguageSelector;
