exports.getMistralAPIResponse = async (transcript) => {
  try {
    const prompt = `
Extract structured expense data from the following sentence:
"${transcript}"

Return ONLY valid JSON in the format:
{ "amount": number, "category": string }

Guidelines:
- "amount" should be a number (e.g., 120 or 75.50)
- "category" should be one of the common expense types like:
  "food", "travel", "shopping", "utilities", "entertainment", "health", "clothing", "education", "electronics", "grocery", "bills", "miscellaneous"
- Example: For "bought a blue shirt for 200 rupees", return { "amount": 200, "category": "clothing" }
- If amount is not found, return an empty JSON: {}

Do not include any explanation, only output valid JSON.
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
          }
        ]
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
      "Error fetching expense data:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch expense data");
  }
};
