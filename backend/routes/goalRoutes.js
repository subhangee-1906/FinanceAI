const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  addGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require(
  "../controllers/goalController"
);

router.post(
  "/",
  protect,
  addGoal
);

router.get(
  "/",
  protect,
  getGoals
);

router.put(
  "/:id",
  protect,
  updateGoal
);

router.delete(
  "/:id",
  protect,
  deleteGoal
);

module.exports = router;