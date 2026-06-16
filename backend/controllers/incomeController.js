const Income = require("../models/Income");

const addIncome = async (req, res) => {
  try {
    const income = await Income.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const getIncome = async (req, res) => {
  try {
    const incomes = await Income.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json(incomes);
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);

    res.json({
      message: "Income Deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  addIncome,
  getIncome,
  deleteIncome
};