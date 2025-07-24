// bachatSathiService.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const axios = require('axios');
const mongoose = require('mongoose');

const router = express.Router();

// --- MongoDB Setup ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://expenseUser:Code3022*@hackathoncluster.g7zvcw6.mongodb.net/?retryWrites=true&w=majority&appName=HackathonCluster';
const DB_NAME = process.env.DB_NAME || 'test';
const CHATS_COLLECTION = 'Chat';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const chatMessageSchema = new mongoose.Schema({
  role: String,
  content: String,
  timestamp: Date
}, { _id: false });

const chatSchema = new mongoose.Schema({
  userID: String,
  title: String,
  createdAt: Date,
  updatedAt: Date,
  messages: [chatMessageSchema]
});

const Chat = mongoose.model(CHATS_COLLECTION, chatSchema);

// --- Mistral AI Setup ---
const MISTRAL_API_URL = process.env.MISTRAL_API_URL || 'https://api.mistral.ai/v1/chat/completions';
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY || 'YOUR_MISTRAL_API_KEY';

const FINANCE_SYSTEM_PROMPT = `
You are Bachat Saathi, a helpful assistant for Indian users. You ONLY answer questions related to finance, banking, investing, saving, KYC, digital payments, and similar financial topics relevant to India. If the user's question is not related to these topics, politely reply: "I'm here to help with finance, banking, and investment questions. Please ask something related to these topics."
`;

async function getMistralReply(prompt, systemPrompt = FINANCE_SYSTEM_PROMPT) {
  try {
    const messages = [
      ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
      { role: 'user', content: prompt }
    ];
    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: 'mistral-small', // or your preferred model
        messages
      },
      {
        headers: {
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('Mistral AI error:', err.response?.data || err.message);
    return 'Sorry, I am unable to answer right now.';
  }
}

// --- FAQ Array (India-specific) ---
const FAQS = [
  { question: 'How do I open a bank account in India?' },
  { question: 'What documents are required for KYC?' },
  { question: 'How can I improve my credit score?' },
  { question: 'What is UPI and how does it work?' },
  { question: 'How to link Aadhaar with my bank account?' },
  { question: 'What is a savings account vs. current account?' },
  { question: 'How to avoid banking frauds and scams?' },
  { question: 'What is net banking and how to activate it?' },
  { question: 'How to set up mobile banking?' },
  { question: 'What are the benefits of digital payments?' },
  { question: 'How to read a bank statement?' }
];

// --- Utility: Get N random FAQs ---
function getRandomFaqs(n = 4) {
  const shuffled = FAQS.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// --- RESTful Endpoints ---

// GET /faq - Returns 3-4 random FAQ suggestions
router.get('/faq', (req, res) => {
  res.json({ faqs: getRandomFaqs(4) });
});

// POST /chat - Send a message, get AI reply, store in DB
// Body: { userID, chatID (optional), message }
router.post('/chat', async (req, res) => {
  const { userID, chatID, message } = req.body;
  if (!userID || !message) {
    return res.status(400).json({ error: 'userID and message are required.' });
  }

  try {
    let chatDoc;
    let isNewChat = !chatID;
    let newChatID = chatID;
    let title = '';
    const now = new Date();

    if (isNewChat) {
      // Generate title using Mistral AI (summarize first prompt)
      title = await getMistralReply(
        `Summarize this user question as a short chat title (max 8 words): "${message}"`,
        null // No system prompt for title generation
      );
      // Create new chat document
      const newChat = new Chat({
        userID,
        title: title.length > 75 ? title.slice(0, 40) : title,
        createdAt: now,
        updatedAt: now,
        messages: [
          { role: 'user', content: message, timestamp: now }
        ]
      });
      chatDoc = await newChat.save();
      newChatID = chatDoc._id;
    } else {
      // Find existing chat
      chatDoc = await Chat.findOne({ _id: chatID, userID });
      if (!chatDoc) {
        return res.status(404).json({ error: 'Chat not found.' });
      }
      // Add user message
      chatDoc.messages.push({ role: 'user', content: message, timestamp: now });
      chatDoc.updatedAt = now;
      await chatDoc.save();
    }

    // Get AI reply (always use finance system prompt)
    const aiReply = await getMistralReply(message);
    // Add AI reply to chat
    chatDoc.messages.push({ role: 'ai', content: aiReply, timestamp: new Date() });
    chatDoc.updatedAt = new Date();
    await chatDoc.save();

    // Return reply and updated chatID
    res.json({
      chatID: (isNewChat ? newChatID : chatID).toString(),
      title: isNewChat ? title : chatDoc.title,
      reply: aiReply
    });
  } catch (err) {
    console.error('Error in /chat:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /chats/:userID - Get all chat summaries for sidebar
router.get('/chats/:userID', async (req, res) => {
  const { userID } = req.params;
  try {
    const chats = await Chat.find({ userID })
      .select('_id title updatedAt')
      .sort({ updatedAt: -1 });
    res.json({ chats: chats.map(chat => ({
      chatID: chat._id.toString(),
      title: chat.title,
      updatedAt: chat.updatedAt
    })) });
  } catch (err) {
    console.error('Error in /chats/:userID:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /chat/:chatID - Get full chat history for a chat
router.get('/chat/:chatID', async (req, res) => {
  const { chatID } = req.params;
  try {
    const chat = await Chat.findById(chatID);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found.' });
    }
    res.json({
      chatID: chat._id.toString(),
      title: chat.title,
      messages: chat.messages
    });
  } catch (err) {
    console.error('Error in /chat/:chatID:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// --- Export router for use in Express app ---
module.exports = router; 