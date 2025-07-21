import fetch from 'node-fetch';
import readline from 'readline';


dotenv.config();

const MISTRAL_API_KEY = APIKEY;
const API_URL = "https://api.mistral.ai/v1/chat/completions";
const MODEL = "mistral-medium";

if (!MISTRAL_API_KEY) {
  console.error("❌ Missing MISTRAL_API_KEY in .env file.");
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define system prompt
const SYSTEM_PROMPT = `
You are a multilingual financial advisor AI agent.
Based on user's data (age, gender, income, family size, profession, expenses),
recommend suitable Indian government or private financial policies, savings tips, and investment options.

Ask relevant questions if needed to refine the recommendation.
`;

// User financial profile (you can modify or get this from input too)
const userData = {
  age: 30,
  gender: "female",
  income: 45000,
  profession: "school teacher",
  familySize: 4,
  expenses: {
    rent: 8000,
    food: 6000,
    transport: 3000,
    others: 4000
  }
};

const messages = [
  { role: "system", content: SYSTEM_PROMPT },
  {
    role: "user",
    content: `My profile: ${JSON.stringify(userData)}. Suggest suitable financial products, government schemes, saving strategies, and investment plans.`
  }
];

async function askMistral(messages) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${MISTRAL_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: messages,
      temperature: 0.7,
    })
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(`Mistral API error: ${data.error?.message || response.statusText}`);
  }

  return data.choices[0].message.content;
}

async function chatLoop() {
  try {
    const reply = await askMistral(messages);
    console.log("\n💡 Advisor:", reply);

    rl.prompt();
    rl.on("line", async (input) => {
      messages.push({ role: "user", content: input });

      try {
        const followUp = await askMistral(messages);
        console.log("\n💡 Advisor:", followUp);
        rl.prompt();
      } catch (err) {
        console.error("❌ Error:", err.message);
        rl.close();
      }
    });
  } catch (err) {
    console.error("❌ Error:", err.message);
    rl.close();
  }
}

chatLoop();
