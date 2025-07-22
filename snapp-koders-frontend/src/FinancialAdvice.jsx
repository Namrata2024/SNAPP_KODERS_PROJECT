import React, { useState } from "react";
import axios from "axios";

const FinancialAdvice = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestBody = {
    age: 32,
    gender: "female",
    occupation: "farm laborer",
    location: "rural Bihar",
    householdSize: 5,
    education: "primary school",
    incomeType: "daily",
    dailyIncome: 300,
    monthlyIncome: 7000,
    expenses: [
        "₹120 groceries",
        "₹40 mobile recharge",
        "₹80 transport",
        "₹50 tea/snacks"
    ],
    debtStatus: "No current loans",
    digitalAccess: "Basic smartphone with UPI",
    cashVsDigital: "70% cash, 30% digital",
    savingGoal: "buying a sewing machine for home business",
    seasonalExpenses: [
    "₹1500 school fees in June",
    "₹1000 for Diwali clothes"
]
  };

  const getAdvice = async () => {
    setLoading(true);
    setError("");
    setAdvice("");
    try {
      const response = await axios.post("http://localhost:8080/api/advice", requestBody, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      // Response is stringified JSON, so parse it
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      setAdvice(data.advice);
    } catch (err) {
      setError("Failed to fetch advice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "2rem", border: "1px solid #eee", borderRadius: 8, background: "#fafafa" }}>
      <h2>Financial Advice</h2>
      <button onClick={getAdvice} disabled={loading} style={{ padding: "0.5rem 1rem", marginBottom: "1rem" }}>
        {loading ? "Loading..." : "Get Advice"}
      </button>
      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
      {advice && (
        <div style={{ background: "#e6ffe6", padding: "1rem", borderRadius: 6, marginTop: "1rem" }}>
          <strong>Advice:</strong>
          <div style={{ marginTop: "0.5rem" }}>{advice}</div>
        </div>
      )}
    </div>
  );
};

export default FinancialAdvice;
