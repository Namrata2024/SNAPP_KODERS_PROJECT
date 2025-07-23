const Expense = require('../models/Expense');
const MISTRAL_API_KEY  = require("../config/serverConfig");
const axios = require("axios");
exports.addExpense = async (data) => {
  const expense = new Expense(data);
  return await expense.save();
};

exports.getExpenses = async () => {
  return await Expense.find().sort({ date: -1 });
};

exports.getMistralAPIResponse = async () => {
  try {
        const response = await axios.post(
          "https://api.mistral.ai/v1/chat/completions",
          {
            model: "mistral-7b-instruct",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          },
          {
            headers: {
              Authorization: `Bearer ${MISTRAL_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data.choices[0].message.content;
      } catch (error) {
        console.error(
          "Error fetching  expense data:",
          error.response?.data || error.message
        );
        throw new Error("Failed to fetch expense data");
      }
};
