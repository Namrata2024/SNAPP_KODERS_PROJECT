const axios = require("axios");

const MISTRAL_API_KEY = "YOUR_API_KEY_HERE"; // replace with your Mistral API key

async function getFinancialAdvice(userData) {
  const prompt = `
You are a financial advisor helping rural, low-income users in India.

Based on the following user's profile, suggest:
1. A practical, short-term saving goal.
2. One financial tip relevant to their lifestyle and income uncertainty.
3. Output should be in Hinglish (mix of simple Hindi and English).

User Profile:
👤 Demographics:
- Age: ${userData.age}
- Gender: ${userData.gender}
- Occupation: ${userData.occupation}
- Location: ${userData.location}
- Household Size: ${userData.householdSize}
- Education Level: ${userData.education}

💰 Financial Info:
- Income Type: ${userData.incomeType} income (e.g., daily, weekly)
- Average Daily Income: ₹${userData.dailyIncome}
- Total Monthly Income (estimated): ₹${userData.monthlyIncome}
- Major Weekly Expenses: ${userData.expenses.join(", ")}
- Digital Access: ${userData.digitalAccess}
- Existing Debt: ${userData.debtStatus}
- Cash vs Digital Spend Ratio: ${userData.cashVsDigital}
- Current Saving Goal: ${userData.savingGoal}
- Seasonal Expenses: ${userData.seasonalExpenses.join(", ")}

Keep the advice practical and realistic for someone with unstable daily wages.
`;

  try {
    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-small", // or "mistral-medium" if you have access
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("💡 Advice:\n", response.data.choices[0].message.content);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

// 🧪 Example User Input
getFinancialAdvice({
  age: 32,
  gender: "female",
  occupation: "farm laborer",
  location: "rural Bihar",
  householdSize: 5,
  education: "primary school",
  incomeType: "daily",
  dailyIncome: 300,
  monthlyIncome: 7000,
  expenses: ["₹120 groceries", "₹40 mobile recharge", "₹80 transport", "₹50 tea/snacks"],
  debtStatus: "No current loans",
  digitalAccess: "Basic smartphone with UPI",
  cashVsDigital: "70% cash, 30% digital",
  savingGoal: "buying a sewing machine for home business",
  seasonalExpenses: ["₹1500 school fees in June", "₹1000 for Diwali clothes"]
});
