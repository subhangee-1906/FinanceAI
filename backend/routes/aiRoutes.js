const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  getAdvice,
} = require(
  "../controllers/aiController"
);

router.get(
  "/advice",
  protect,
  getAdvice
);

module.exports = router;