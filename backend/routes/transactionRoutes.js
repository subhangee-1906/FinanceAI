const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getRecentTransactions
} = require("../controllers/transactionController");

router.get("/recent", protect, getRecentTransactions);

module.exports = router;