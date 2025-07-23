const readline = require('readline');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// 🔐 Replace with your actual Mistral API key
const apiKey = 'API_KEY';
const API_URL = 'https://api.mistral.ai/v1/chat/completions';

// 🧑‍💼 Mock user data
const userData = {
  age: 35,
  gender: "male",
  income: 25000,
  profession: "school teacher",
  familySize: 4,
  language: "English", // Try: "Marathi" | "Bengali"
  expenses: {
    rent: 5000,
    food: 4000,
    transport: 2000,
    others: 2000
  }
};

// 📌 Create multilingual system prompt
function getSystemPrompt(lang) {
  return `
You are a multilingual financial teacher.

Speak only in ${lang}. 
Your job is to help Indian users understand complex financial processes easily.

Explain with examples in basic ${lang}.


NEVER speak English unless the user does. Be polite and helpful.
If you need more info, ask questions in ${lang}.
`;
}

// 🧠 Ask Mistral for a response
async function askMistral(userMessage, userLang) {
  const systemPrompt = getSystemPrompt(userLang);

  const body = {
    model: "mistral-medium",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ]
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ API raw response:", JSON.stringify(data, null, 2));
    throw new Error(`Request failed: ${data?.error?.message || response.statusText}`);
  }

  const reply = data?.choices?.[0]?.message?.content;
  return reply || "No response from model.";
}

// 💬 CLI Chat Loop
async function chatLoop() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

  console.log(`🤖 Financial Advisor Bot ready in ${userData.language}. Type 'exit' to quit.`);

  // Opening question
  const greetingMessage = `હાય! હું તમારું નાણાકીય માર્ગદર્શક છું. તમારા ખર્ચ અને આવક આધારિત, તમને કેવી મદદ જોઈએ?`;
  const initialResponse = await askMistral(greetingMessage, userData.language);
  console.log("AI:", initialResponse);

  while (true) {
    const input = await askQuestion("You: ");
    if (input.toLowerCase() === 'exit') break;

    try {
      const response = await askMistral(input, userData.language);
      console.log("AI:", response);
    } catch (err) {
      console.error("⚠️ Error:", err.message);
    }
  }

  rl.close();
}

chatLoop();
