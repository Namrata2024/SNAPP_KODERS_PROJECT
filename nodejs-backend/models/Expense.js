const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  paymentMethod: String,
  date: { type: Date, default: Date.now },
  note: String
});

module.exports = mongoose.model('Expense', expenseSchema);
