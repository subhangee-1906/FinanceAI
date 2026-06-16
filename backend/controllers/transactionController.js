const Expense = require("../models/Expense");
const Income = require("../models/Income");

const getRecentTransactions = async (req, res) => {
  try {
    // Get expenses
    const expenses = await Expense.find({
      user: req.user.id
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get incomes
    const incomes = await Income.find({
      user: req.user.id
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // Format expenses
    const formattedExpenses = expenses.map((expense) => ({
      _id: expense._id,
      type: "expense",
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
    }));

    // Format incomes
    const formattedIncomes = incomes.map((income) => ({
      _id: income._id,
      type: "income",
      title: income.source,
      amount: income.amount,
      date: income.date
    }));

    // Merge and sort by date
    const transactions = [
      ...formattedExpenses,
      ...formattedIncomes
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Return latest 10
    res.status(200).json(
      transactions.slice(0, 10)
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  getRecentTransactions
};