import React, { useState, useRef } from 'react'

const SpeechToText = () => {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef(null)

  const startListening = () => {
    console.log('Start listening clicked')
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Web Speech API not supported in this browser.')
      console.log('Web Speech API not supported')
      return
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = true
    recognition.interimResults = false

    recognition.onstart = () => {
      console.log('Recognition started')
    }

    recognition.onresult = (event) => {
      console.log('Recognition result event:', event)
      let finalTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript
      }
      console.log('Final transcript:', finalTranscript)
      setTranscript(prev => prev + finalTranscript)
    }

    recognition.onerror = (event) => {
      console.log('Recognition error:', event)
    }

    recognition.onend = () => {
      console.log('Recognition ended')
      if (listening) {
        console.log('Restarting recognition...')
        recognition.start()
      }
    }

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
    console.log('Recognition started and listening set to true')
  }

  const stopListening = () => {
    console.log('Stop listening clicked')
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setListening(false)
      console.log('Recognition stopped and listening set to false')
    }
  }

  const resetTranscript = () => {
    console.log('Transcript cleared')
    setTranscript('')
  }

  return (
    <div className="bg-slate-800 text-white h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Speech to Text Demo</h1>
      <div className="mb-4 flex gap-2">
        <button
          onClick={listening ? stopListening : startListening}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button
          onClick={resetTranscript}
          className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
        >
          Clear
        </button>
      </div>
      <div className="bg-slate-700 p-4 rounded w-full max-w-xl">
        <p className="text-lg">Transcript:</p>
        <p className="mt-2 min-h-[2rem]">{transcript || <span className="text-gray-400">Speak something...</span>}</p>
      </div>
    </div>
  )
}

export default SpeechToText