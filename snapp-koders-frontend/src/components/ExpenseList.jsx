import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ExpenseTable({ expenses, error }) {
  // const [expenses, setExpenses] = useState([]);
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/expenses')
      .then(res => {
        const expenses = res.data;
        const groupedData = expenses.reduce((acc, curr) => {
          // Skip if curr is not an object or lacks amount
          if (
            !curr ||
            typeof curr !== 'object' ||
            typeof curr.amount !== 'number' ||
            isNaN(curr.amount)
          ) {
            return acc;
          }

          const cat = curr.category;
          if (!acc[cat]) {
            acc[cat] = { total: 0, items: [] };
          }
          acc[cat].total += curr.amount;
          acc[cat].items.push(curr);
          return acc;
        }, {});
        setGrouped(groupedData);
      })
      .catch(err => console.error(err));
  }, []);

  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div style={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
      <h2>Expense Summary by Category</h2>
      {Object.entries(expenses).map(([category, data]) => (
        <div key={category} style={accordionContainer}>
          <div onClick={() => toggleCategory(category)} style={accordionHeader}>
            <strong>{category}</strong> — ₹{data.total.toFixed(2)}
            <span style={{ float: 'right' }}>{openCategory === category ? '-' : '+'}</span>
          </div>
          {openCategory === category && (
            <div style={accordionBody}>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {data.items.map(item => (
                  <li key={item._id}>
                    {/* {item.title} — ₹{item.amount} on {new Date(item.date).toLocaleDateString()} via {item.paymentMethod} */}
                     {item.title} — ₹{item.amount} on {new Date(item.date).toLocaleDateString()} via {item.paymentMethod}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const accordionContainer = {
  border: '1px solid #ccc',
  marginBottom: '10px',
  borderRadius: '5px',
  overflow: 'hidden'
};

const accordionHeader = {
  background: '#f7f7f7',
  padding: '10px 15px',
  cursor: 'pointer',
  fontSize: '16px'
};

const accordionBody = {
  background: '#fff',
  padding: '10px 15px'
};


// export default ExpenseTable;
