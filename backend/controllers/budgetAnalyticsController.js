const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

const getBudgetOverview = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user.id,
    });

    const result = [];

    for (const budget of budgets) {
      const expenses = await Expense.find({
        user: req.user.id,
        category: budget.category,
      });

      const spent = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      const percentage = Math.round(
        (spent / budget.amount) * 100
      );

      result.push({
        category: budget.category,
        budget: budget.amount,
        spent,
        remaining:
          budget.amount - spent,
        percentage,
      });
    }

    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getBudgetOverview,
};