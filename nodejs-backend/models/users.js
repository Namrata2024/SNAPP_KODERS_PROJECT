const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Profile Data
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    occupation: { type: String },
    location: { type: String },

    language: [{ type: String }],

    householdSize: { type: Number },
    education: { type: String },

    incomeType: {
      type: String,
      enum: ["daily", "monthly", "seasonal", "other"],
    },
    dailyIncome: { type: Number },
    monthlyIncome: { type: Number },

    expenses: [{ type: String }],

    debtStatus: { type: String },

    digitalAccess: { type: String },
    cashVsDigital: { type: String },

    savingGoal: { type: String },
  },
  {
    timestamps: true, // <-- This adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);
