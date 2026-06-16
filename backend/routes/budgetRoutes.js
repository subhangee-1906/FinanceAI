const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  addBudget,
  getBudgets,
  deleteBudget,
} = require(
  "../controllers/budgetController"
);

router.post(
  "/",
  protect,
  addBudget
);

router.get(
  "/",
  protect,
  getBudgets
);

router.delete(
  "/:id",
  protect,
  deleteBudget
);

module.exports = router;