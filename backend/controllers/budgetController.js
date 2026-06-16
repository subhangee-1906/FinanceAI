const Budget = require("../models/Budget");

const addBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;

    const budget = await Budget.create({
      user: req.user.id,
      category,
      amount,
    });

    res.status(201).json(budget);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user.id,
    });

    res.status(200).json(budgets);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteBudget = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Budget Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addBudget,
  getBudgets,
  deleteBudget,
};