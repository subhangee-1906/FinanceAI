const Expense = require("../models/Expense");
const Income = require("../models/Income");

const getAdvice = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    });

    const incomes = await Income.find({
      user: req.user.id,
    });

    const totalIncome = incomes.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const totalExpense = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const balance =
      totalIncome - totalExpense;

    let advice = [];

    if (totalIncome === 0) {
      advice.push(
        "Add income records to generate AI insights."
      );
    }

    const savingsRate =
      totalIncome > 0
        ? (
            (balance / totalIncome) *
            100
          ).toFixed(1)
        : 0;

    if (savingsRate >= 30) {
      advice.push(
        "Excellent savings habit. You save more than 30% of your income."
      );
    }

    if (savingsRate < 20) {
      advice.push(
        "Your savings rate is low. Try reducing discretionary spending."
      );
    }

    const categoryTotals = {};

    expenses.forEach((expense) => {
      categoryTotals[
        expense.category
      ] =
        (categoryTotals[
          expense.category
        ] || 0) + expense.amount;
    });

    let highestCategory = "";
    let highestAmount = 0;

    Object.entries(categoryTotals).forEach(
      ([category, amount]) => {
        if (amount > highestAmount) {
          highestAmount = amount;
          highestCategory = category;
        }
      }
    );

    if (highestCategory) {
      advice.push(
        `Highest spending category: ${highestCategory} (₹${highestAmount})`
      );
    }

    if (
      totalExpense >
      totalIncome * 0.8
    ) {
      advice.push(
        "Warning: Your expenses exceed 80% of your income."
      );
    }

    res.json({
      totalIncome,
      totalExpense,
      balance,
      savingsRate,
      advice,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getAdvice,
};