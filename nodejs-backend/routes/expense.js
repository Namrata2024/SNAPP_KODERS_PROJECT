const express = require('express');
const router = express.Router();
const expenseController = require('../controller/ExpenseController');

router.post('/', expenseController.createExpense);
router.get('/', expenseController.fetchExpenses);
router.post('/', expenseController.fetchMistralAPIResponse);

module.exports = router;
