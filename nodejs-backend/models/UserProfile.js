const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  age: Number,
  gender: String,
  occupation: String,
  location: String,
  householdSize: Number,
  education: String,
  incomeType: String,
  dailyIncome: Number,
  monthlyIncome: Number,
  expenses: [String],
  debtStatus: String,
  digitalAccess: String,
  cashVsDigital: String,
  savingGoal: String,
  seasonalExpenses: [String]
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
