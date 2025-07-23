const axios = require("axios");
const { MISTRAL_API_KEY } = require("../config/serverConfig");

class AdviceService {
  constructor() {
    this.apiKey = MISTRAL_API_KEY;
  }

  async getFinancialAdvice(userData) {
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
          model: "mistral-small",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(
        "Error fetching financial advice:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch financial advice");
    }
  }
}

module.exports = AdviceService;
