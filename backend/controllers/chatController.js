const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

// controllers/chatController.js

const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    let reply = "";

    const userMessage = message.toLowerCase();

    if (
      userMessage.includes("save") ||
      userMessage.includes("saving")
    ) {
      reply =
        "Try following the 50-30-20 budgeting rule. Save at least 20% of your monthly income and reduce unnecessary spending.";
    }

    else if (
      userMessage.includes("investment") ||
      userMessage.includes("invest")
    ) {
      reply =
        "Consider SIPs, Mutual Funds, Index Funds, or Fixed Deposits based on your risk tolerance and financial goals.";
    }

    else if (
      userMessage.includes("expense") ||
      userMessage.includes("spending")
    ) {
      reply =
        "Track your expenses regularly and identify categories where you can reduce spending.";
    }

    else if (
      userMessage.includes("budget")
    ) {
      reply =
        "Create a monthly budget by allocating money for needs, wants, savings, and emergency funds.";
    }

    else if (
      userMessage.includes("debt") ||
      userMessage.includes("loan")
    ) {
      reply =
        "Prioritize paying off high-interest debt first while making minimum payments on other loans.";
    }

    else if (
      userMessage.includes("emergency")
    ) {
      reply =
        "Maintain an emergency fund covering 3–6 months of essential expenses.";
    }

    else if (
      userMessage.includes("salary") ||
      userMessage.includes("income")
    ) {
      reply =
        "Allocate a portion of every salary payment toward savings and investments before spending.";
    }

    else {
      reply =
        "Maintain a balanced budget, save consistently, avoid unnecessary debt, and invest for long-term financial growth.";
    }

    res.status(200).json({
      reply,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      reply:
        "Unable to process your request at the moment.",
    });
  }
};

module.exports = {
  askAI,
};

