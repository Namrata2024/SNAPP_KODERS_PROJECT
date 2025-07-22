import React, { useState, useRef, useEffect } from 'react';

const SpeechToText = ({ selectedLang }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Web Speech API not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => console.log('Started');
    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript((prev) => prev + finalTranscript);
    };

    recognition.onerror = (event) => console.error('Error:', event);
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

  return (
    <div className="bg-slate-800 text-white h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Speech to Text Demo ({selectedLang})</h1>
      <div className="mb-4 flex gap-2">
        <button
          onClick={listening ? stopListening : startListening}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button
          onClick={() => setTranscript('')}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
        >
          Clear
        </button>
      </div>
      <div className="bg-slate-700 p-4 rounded w-full max-w-xl">
        <p className="text-lg font-semibold">Transcript:</p>
        <p className="mt-2 min-h-[2rem]">
          {transcript || (
            <span className="text-gray-400">Speak something...</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default SpeechToText;
