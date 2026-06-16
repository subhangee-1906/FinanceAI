const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  getBudgetOverview,
} = require(
  "../controllers/budgetAnalyticsController"
);

router.get(
  "/",
  protect,
  getBudgetOverview
);

module.exports = router;