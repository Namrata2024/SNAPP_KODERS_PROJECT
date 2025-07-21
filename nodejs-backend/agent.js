

const readline = require('readline');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const apiKey = APIKEY;
const API_URL = 'https://api.mistral.ai/v1/chat/completions';

async function askMistral(userMessage) {
  const body = {
    model: "mistral-medium",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
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

async function chatLoop() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

  console.log("🤖 Mistral Chat Agent is ready. Type 'exit' to quit.");

  while (true) {
    const input = await askQuestion("You: ");
    if (input.toLowerCase() === 'exit') break;

    try {
      const response = await askMistral(input);
      console.log("AI:", response);
    } catch (err) {
      console.error("⚠️ Error:", err.message);
    }
  }

  rl.close();
}

chatLoop();
