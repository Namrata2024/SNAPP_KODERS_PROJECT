import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinancialAdvice = () => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const requestBody = {
    age: 32,
    gender: 'female',
    occupation: 'farm laborer',
    location: 'rural Bihar',
    householdSize: 5,
    education: 'primary school',
    incomeType: 'daily',
    dailyIncome: 300,
    monthlyIncome: 7000,
    expenses: [
      '₹120 groceries',
      '₹40 mobile recharge',
      '₹80 transport',
      '₹50 tea/snacks',
    ],
    debtStatus: 'No current loans',
    digitalAccess: 'Basic smartphone with UPI',
    cashVsDigital: '70% cash, 30% digital',
    savingGoal: 'buying a sewing machine for home business',
    seasonalExpenses: ['₹1500 school fees in June', '₹1000 for Diwali clothes'],
  };

  useEffect(() => {
    const getAdvice = async () => {
      setLoading(true);
      setError('');
      setAdvice('');
      try {
        const response = await axios.post(
          'http://localhost:8080/api/advice',
          requestBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Response is stringified JSON, so parse it
        const data =
          typeof response.data === 'string'
            ? JSON.parse(response.data)
            : response.data;
        setAdvice(data.advice);
      } catch (err) {
        setError('Failed to fetch advice');
      } finally {
        setLoading(false);
      }
    };
    getAdvice();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '40vh',
        margin: '2rem auto',
        padding: '2rem 2.5rem',
        borderRadius: 18,
        background: 'linear-gradient(135deg, #e3ffe8 0%, #f5faff 100%)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
        border: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '2.2rem',
          color: '#1b5e20',
          marginBottom: '1.5rem',
          letterSpacing: 1,
        }}
      >
        Personalized Financial Advice
      </h2>
      {loading && (
        <div
          style={{
            textAlign: 'center',
            color: '#1976d2',
            fontWeight: 500,
            fontSize: '1.1rem',
          }}
        >
          Loading your advice...
        </div>
      )}
      {error && (
        <div
          style={{
            color: '#d32f2f',
            background: '#ffebee',
            padding: '1rem',
            borderRadius: 8,
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}
      {advice && !loading && !error && (
        <div
          style={{
            background: '#fff',
            padding: '2rem 1.5rem',
            borderRadius: 12,
            boxShadow: '0 2px 12px 0 rgba(76, 175, 80, 0.08)',
            marginTop: '1.5rem',
            textAlign: 'center',
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Advice"
            style={{ width: 60, marginBottom: 16 }}
          />
          <div
            style={{
              fontWeight: 600,
              fontSize: '1.25rem',
              color: '#388e3c',
              marginBottom: 8,
            }}
          >
            Advice for you:
          </div>
          <div
            style={{
              fontSize: '1.1rem',
              color: '#333',
              lineHeight: 1.7,
              textAlign: 'left',
              margin: 0,
              width: '100%',
            }}
          >
            {advice.split(/(?=\d+\.)/).map((point, idx) => (
              <div key={idx} style={{ marginBottom: 12 }}>
                {point.trim()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialAdvice;
