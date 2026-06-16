const Expense = require("../models/Expense");

// Add Expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category
    });

    res.status(201).json(expense);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// Get All Expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Expense Deleted Successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};