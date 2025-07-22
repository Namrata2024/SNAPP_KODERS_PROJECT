import React, { useState, useRef, useEffect } from 'react';
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaTrash,
  FaPaperPlane,
  FaMoon,
  FaSun,
} from 'react-icons/fa';

const SpeechToText = ({ selectedLang }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [typedInput, setTypedInput] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const recognitionRef = useRef(null);

  // Update <html> class based on darkMode
  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
  }, [darkMode]);

  const startListening = () => {
    if (
      !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    ) {
      alert('Web Speech API not supported in this browser.');
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript((prev) => prev + ' ' + finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Recognition error:', event);
    };

    recognition.onend = () => {
      if (listening) recognition.start();
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const resetTranscript = () => {
    setTranscript('');
    setTypedInput('');
  };

  const handleTypedInputSubmit = () => {
    if (typedInput.trim() !== '') {
      setTranscript((prev) => prev + ' ' + typedInput.trim());
      setTypedInput('');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white min-h-screen w-screen flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-3xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-xl rounded-2xl p-8 relative">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 text-xl text-yellow-400 dark:text-blue-300 hover:scale-110 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <h1 className="text-4xl font-bold text-center mb-8">
          🎙️ Smart Voice & Text Assistant
        </h1>

        {/* Control Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={listening ? stopListening : startListening}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition duration-200 ${
              listening
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            } shadow-lg`}
          >
            {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            {listening ? 'Stop Listening' : 'Start Listening'}
          </button>

          <button
            onClick={resetTranscript}
            className="flex items-center gap-2 px-5 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold shadow-lg"
          >
            <FaTrash />
            Clear
          </button>
        </div>

        {/* Input Box */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={typedInput}
            onChange={(e) => setTypedInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-inner"
          />
          <button
            onClick={handleTypedInputSubmit}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white flex items-center justify-center shadow-lg transition"
          >
            <FaPaperPlane />
          </button>
        </div>

        {/* Transcript Output */}
        <div className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl p-6 shadow-inner min-h-[120px]">
          <p className="text-xl font-semibold mb-2">📜 Transcript:</p>
          <p className="whitespace-pre-wrap leading-relaxed">
            {transcript || (
              <span className="text-gray-400 dark:text-gray-500">
                Speak or type to get started...
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
