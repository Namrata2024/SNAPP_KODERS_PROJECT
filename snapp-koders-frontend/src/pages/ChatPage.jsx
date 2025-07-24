import React, { useState } from "react";
import {
  Box,
  TextField,
  Card,
  Typography,
  CardContent,
  IconButton,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import { FiSend } from "react-icons/fi";

const suggestions = [
  "Track my monthly fertilizer expenses",
  "Suggest savings tips for low income",
  "What's my biggest spending category?",
  "How can I optimize my farming costs?",
];


// import axios from "axios";


// const requestBody = {
//     age: 32,
//     gender: "female",
//     occupation: "farm laborer",
//     location: "rural Bihar",
//     householdSize: 5,
//     education: "primary school",
//     incomeType: "daily",
//     dailyIncome: 300,
//     monthlyIncome: 7000,
//     expenses: [
//         "₹120 groceries",
//         "₹40 mobile recharge",
//         "₹80 transport",
//         "₹50 tea/snacks"
//     ],
//     debtStatus: "No current loans",
//     digitalAccess: "Basic smartphone with UPI",
//     cashVsDigital: "70% cash, 30% digital",
//     savingGoal: "buying a sewing machine for home business",
//     seasonalExpenses: [
//     "₹1500 school fees in June",
//     "₹1000 for Diwali clothes"
// ], query: input
// };

//   const getAdvice = async () => {
//     setLoading(true);
//     setError("");
//     setAdvice("");
//     try {
//       const response = await axios.post("http://localhost:8080/api/advice", requestBody, {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
//       // Response is stringified JSON, so parse it
//       const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
//       setAdvice(data.advice);
//     } catch (err) {
//       setError("Failed to fetch advice");
//     } finally {
//       setLoading(false);
//     }
//   };




const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    // Placeholder for bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Here's a financial suggestion based on your query!",
          sender: "bot",
        },
      ]);
    }, 600);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f3f6fb",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Suggestions */}
      <Box
        sx={{
          p: 2,
          backgroundColor: "#f3f6fb",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Try asking:
        </Typography>
        <Grid container spacing={2}>
          {suggestions.map((text, i) => (
            <Grid item key={i}>
              <Card
                variant="outlined"
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  "&:hover": { backgroundColor: "#f4ede5" },
                }}
                onClick={() => setInput(text)}
              >
                <Typography variant="body2">{text}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Chat Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 3,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              maxWidth: "70%",
              backgroundColor: msg.sender === "user" ? "#cfe8fc" : "#ffffff",
              borderRadius: 2,
              px: 2,
              py: 1,
              boxShadow: 1,
            }}
          >
            <Typography fontSize="0.95rem">{msg.text}</Typography>
          </Box>
        ))}
      </Box>

      {/* Prompt Input */}
      <Paper
        component="form"
        elevation={3}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <TextField
          fullWidth
          placeholder="Ask Bachat Saathi something..."
          variant="standard"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          InputProps={{ disableUnderline: true }}
          sx={{ ml: 2 }}
        />
        <IconButton type="submit" color="primary" sx={{ mx: 1 }}>
          <FiSend/>
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ChatPage;
