const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  askAI,
} = require("../controllers/chatController");

router.post(
  "/",
  protect,
  askAI
);

module.exports = router;