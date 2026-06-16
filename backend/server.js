require("dotenv").config();

const express = require("express");
const cors = require("cors");
const budgetRoutes = require("./routes/budgetRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const chatRoutes = require("./routes/chatRoutes");
const connectDB = require("./config/db");
const incomeRoutes = require("./routes/incomeRoutes");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const goalRoutes = require("./routes/goalRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetAnalyticsRoutes = require("./routes/budgetAnalyticsRoutes");
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/budget-overview",budgetAnalyticsRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/income", incomeRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("FinanceAI Backend Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});