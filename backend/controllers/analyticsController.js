const Expense = require("../models/Expense");
const mongoose = require("mongoose");

const getAnalytics = async (req, res) => {
  try {
    const analytics = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $group: {
          _id: "$category",
          totalAmount: {
            $sum: "$amount"
          }
        }
      }
    ]);

    res.status(200).json(analytics);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  getAnalytics
};