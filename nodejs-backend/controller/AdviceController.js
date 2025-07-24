const AdviceService = require("../service/AdviceService");

const adviceService = new AdviceService();

const getAdvice = async (req, res) => {
  try {
  const advice = await adviceService.getFinancialAdvice(req.body);
    return res.status(201).json({ advice });
  } catch (error) {
    console.error("Error getting advice:", error);
    res.status(500).json({ error: "Failed to get financial advice" });
  }
};
const getRecommendation = async (req, res) => {
  try {
    const recommendation = await adviceService.getFinancialAdvice(req.body);
    return res.status(201).json({ recommendation });
  } catch (error) {
    console.error("Error getting recommendation:", error);
    res.status(500).json({ error: "Failed to get recommendation" });
  }
};
module.exports = {
  getAdvice,
  getRecommendation
};
