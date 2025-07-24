class UserProfile {
    constructor({ age, gender, occupation, location, householdSize, education, incomeType, dailyIncome, monthlyIncome, expenses, debtStatus, digitalAccess, cashVsDigital, savingGoal, seasonalExpenses }) {
        this.age = age;
        this.gender = gender;
        this.occupation = occupation;
        this.location = location;
        this.householdSize = householdSize;
        this.education = education;
        this.incomeType = incomeType;
        this.dailyIncome = dailyIncome;
        this.monthlyIncome = monthlyIncome;
        this.expenses = expenses;
        this.debtStatus = debtStatus;
        this.digitalAccess = digitalAccess;
        this.cashVsDigital = cashVsDigital;
        this.savingGoal = savingGoal;
        this.seasonalExpenses = seasonalExpenses;
    }
}

module.exports = UserProfile;