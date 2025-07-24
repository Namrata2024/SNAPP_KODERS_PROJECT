const Expense = require('../models/Expense');
const MISTRAL_API_KEY  = process.env.REACT_APP_MISRAL_API_KEY;
const axios = require("axios");

exports.addExpense = async (data) => {
  const expense = new Expense(data);
  return await expense.save();
};

exports.getExpenses = async () => {
  return await Expense.find().sort({ date: -1 });
};

exports.getMistralAPIResponse = async (transcript) => {
  try {
      const prompt = `
  Extract structured data from the following sentence:
  "${transcript}"
  Respond ONLY with valid JSON, without explanations or comments. 
  Format { amount: number, category: string.
  If no amount is found, return empty. }
  `;

    console.log('Input to Mistral API:', prompt);  
        const response = await axios.post(
          "https://api.mistral.ai/v1/chat/completions",
          {
            model: 'mistral-tiny',
            messages: [
            {
              role: 'user',
              content: prompt 
            }],
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

