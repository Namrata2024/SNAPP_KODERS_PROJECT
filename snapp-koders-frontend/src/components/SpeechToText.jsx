import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaTrash,
  FaPaperPlane,
} from "react-icons/fa";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Paper,
  Grid,
  Card,
} from "@mui/material";

const suggestions = [
  "Track my monthly fertilizer expenses",
  "Suggest savings tips for low income",
  "What's my biggest spending category?",
  "How can I optimize my farming costs?",
];

const SpeechToText = ({ selectedLang }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [typedInput, setTypedInput] = useState("");
  const [messages, setMessages] = useState([]);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Web Speech API not supported in this browser.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang || "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript((prev) => prev + " " + finalTranscript);
      handleSend(finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event);
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
    setTranscript("");
    setTypedInput("");
    setMessages([]);
  };

  const handleSend = async (input) => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    try {
      const response = await axios.post("http://localhost:5000/api/recommend", {
        query: input,
      });
      const botReply = response.data.recommendation || "No response from the server.";
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Failed to fetch recommendation. Please try again.", sender: "bot" },
      ]);
    }
  };

  const handleTypedInputSubmit = () => {
    if (typedInput.trim() !== "") {
      handleSend(typedInput.trim());
      setTypedInput("");
    }
  };

  return (
    <Box
      sx={{
        width: '50vw',
        height: 600,
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins, sans-serif",
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        margin: "auto",
        mt: 5,
      }}
    >
      {/* <Box sx={{ p: 2, backgroundColor: "#3f51b5", color: "white" }}>
        <Typography variant="h6" fontWeight={600}>
          Bachat Saathi
        </Typography>
      </Box> */}

      <Box sx={{ p: 2, backgroundColor: "#f5f5f5", borderBottom: "1px solid #e0e0e0" }}>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Try asking:
        </Typography>
        <Grid container spacing={1}>
          {suggestions.map((text, i) => (
            <Grid item key={i}>
              <Card
                variant="outlined"
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
                onClick={() => setTypedInput(text)}
              >
                <Typography variant="caption">{text}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ flex: 1, p: 2, overflowY: "auto", backgroundColor: "#fff" }}>
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: "80%",
                p: 1.5,
                borderRadius: 2,
                backgroundColor: msg.sender === "user" ? "#e3f2fd" : "#f1f1f1",
                boxShadow: 1,
              }}
            >
              <Typography fontSize="0.85rem">{msg.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Paper
        component="form"
        elevation={3}
        onSubmit={(e) => {
          e.preventDefault();
          handleTypedInputSubmit();
        }}
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          borderTop: "1px solid #ddd",
        }}
      >
        <TextField
          fullWidth
          placeholder="Ask Bachat Saathi something..."
          variant="standard"
          value={typedInput}
          onChange={(e) => setTypedInput(e.target.value)}
          InputProps={{ disableUnderline: true }}
          sx={{ mx: 1 }}
        />
        <IconButton type="submit" color="primary" sx={{ mx: 0.5 }}>
          <FaPaperPlane />
        </IconButton>
        <IconButton
          onClick={listening ? stopListening : startListening}
          color={listening ? "error" : "primary"}
          sx={{ mx: 0.5 }}
        >
          {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </IconButton>
        <IconButton onClick={resetTranscript} color="secondary" sx={{ mx: 0.5 }}>
          <FaTrash />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SpeechToText;
