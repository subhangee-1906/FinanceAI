const Expense = require("../models/Expense");
const Income = require("../models/Income");

const getDashboard = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id
    });

    const incomes = await Income.find({
      user: req.user.id
    });

    const totalExpense = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const totalIncome = incomes.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const balance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      balance,
      expenseCount: expenses.length,
      incomeCount: incomes.length
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  getDashboard
};