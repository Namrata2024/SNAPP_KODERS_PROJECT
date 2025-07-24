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
  Stack
} from "@mui/material";

// const suggestions = [
//   "Track my monthly fertilizer expenses",
//   "Suggest savings tips for low income",
//   "What's my biggest spending category?",
//   "How can I optimize my farming costs?",
// ];

const SpeechToText = ({ selectedLang }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [typedInput, setTypedInput] = useState("");
  const [messages, setMessages] = useState([]);
  const recognitionRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [userId, setUserId] = useState("rao1")
  const [activeChat, setActiveChat] = useState();

   useEffect(() => {
    axios.get(`http://localhost:8080/api/bachatSaathi/faq`)
      .then(res => {
        console.log(res)
        setSuggestions(res.data.faqs)
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
  axios.get(`http://localhost:8080/api/bachatSaathi/chats/rao1`)
    .then(res => {
      setChatHistory(res.data.chats || []);
    })
    .catch(console.error);
}, []);
  

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

  const handleSend = async (input, userID) => {
  if (!input.trim()) return;

  const message = input.trim();
  setMessages((prev) => [...prev, { text: message, sender: "user" }]);

  try {
    const response = await axios.post("http://localhost:8080/api/bachatSaathi/chat", {
      userID,
      chatID: activeChat, // can be undefined for new chats
      message,
    });

    const { chatID, reply } = response.data;

    // Update chat ID if it's a new chat
    if (!activeChat) {
      setActiveChat(chatID);
      // Refresh sidebar with new chat
      const res = await axios.get(`http://localhost:8080/api/bachatSaathi/chats/${userID}`);
      setChatHistory(res.data.chats || []);
    }

    // Append AI response
    setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
  } catch (error) {
    console.error("Error sending message:", error);
    setMessages((prev) => [
      ...prev,
      { text: "Failed to send message. Please try again.", sender: "bot" },
    ]);
  }
};

  const handleTypedInputSubmit = (userId) => {
    if (typedInput.trim() !== "") {
      handleSend(typedInput.trim(), userId);
      setTypedInput("");
    }
  };

 const loadChat = async (chatID) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/bachatSaathi/chat/${chatID}`);
    const chatMessages = res.data.messages || [];

    // Transform messages to match UI
    const formattedMessages = chatMessages.map((msg) => ({
      text: msg.content,
      sender: msg.role === "user" ? "user" : "bot"
    }));

    setMessages(formattedMessages);
  } catch (err) {
    console.error("Error loading chat:", err);
  }
};


  return (
    <Stack flexDirection="row" >
   
    <Box
  sx={{
    width: "30vw",
    height: 600,
    backgroundColor: "#fff",
    p: 2,
    // borderRadius: 3,
    // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    overflowY: "auto",
    borderRight: "1px solid #ccc"
    // mt: 1,
  }}
>
  <Typography variant="h6" fontWeight={600} mb={2}>
    Chat History
  </Typography>
  {chatHistory.map((chat) => (
    <Card
      key={chat.chatID}
      variant="outlined"
      sx={{
  mb: 1,
  p: 1,
  borderRadius: 2,
  cursor: "pointer",
  backgroundColor: activeChat === chat.chatID ? "#e0f7fa" : "transparent",
  "&:hover": { backgroundColor: "#f1f1f1" },
}}
      onClick={() => {
  setActiveChat(chat.chatID);
  loadChat(chat.chatID);
}}
    >
      <Typography variant="subtitle2" noWrap>
        {chat.title.replace(/^"+|"+$/g, "")}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {new Date(chat.updatedAt).toLocaleString()}
      </Typography>
    </Card>
  ))}
</Box>
    <Box
      sx={{
        width: '70vw',
        height: 600,
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins, sans-serif",
        // borderRadius: 3,
        // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        margin: "auto",
        // mt: 1,
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
                onClick={() => setTypedInput(text.question)}
              >
                <Typography variant="caption">{text.question}</Typography>
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
          handleTypedInputSubmit(userId);
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
       
    </Stack>
  );
};

export default SpeechToText;
