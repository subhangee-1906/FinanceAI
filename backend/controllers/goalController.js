const Goal = require("../models/Goal");

const addGoal = async (req, res) => {
  try {
    const goal = await Goal.create({
      user: req.user.id,
      title: req.body.title,
      targetAmount: req.body.targetAmount,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.user.id,
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      {
        currentAmount:
          req.body.currentAmount,
      },
      {
        new: true,
      }
    );

    res.json(goal);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteGoal = async (req, res) => {
  try {
    await Goal.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Goal Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};