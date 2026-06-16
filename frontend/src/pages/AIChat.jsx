import { useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function AIChat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setChatHistory((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");
    setLoading(true);

    try {
      const res = await API.post("/chat", {
        message: currentMessage,
      });

      const aiMessage = {
        sender: "ai",
        text: res.data.reply,
      };

      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      let errorText =
        "AI service is currently unavailable.";

      if (
        error.response?.data?.message
      ) {
        errorText =
          error.response.data.message;
      }

      setChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          text: errorText,
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAI();
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        <h1>🤖 AI Financial Advisor</h1>

        <p className="subtitle">
          Ask questions about budgeting,
          savings, expenses, investments,
          and financial planning.
        </p>

        <div className="chat-container">
          {chatHistory.length === 0 && (
            <div className="chat-welcome">
              <h3>Try asking:</h3>

              <ul>
                <li>
                  How can I save ₹5000 every
                  month?
                </li>

                <li>
                  My salary is ₹40,000. How
                  should I budget?
                </li>

                <li>
                  How can I reduce my food
                  expenses?
                </li>

                <li>
                  Should I invest or save my
                  money?
                </li>
              </ul>
            </div>
          )}

          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`chat-message ${
                chat.sender === "user"
                  ? "user-message"
                  : "ai-message"
              }`}
            >
              <strong>
                {chat.sender === "user"
                  ? "You"
                  : "AI Advisor"}
              </strong>

              <p>{chat.text}</p>
            </div>
          ))}

          {loading && (
            <div className="ai-message">
              <strong>AI Advisor</strong>
              <p>Thinking...</p>
            </div>
          )}
        </div>

        <div className="chat-input-container">
          <textarea
            rows="4"
            placeholder="Ask a financial question..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={handleKeyPress}
          />

          <button
            onClick={askAI}
            disabled={loading}
          >
            {loading
              ? "Thinking..."
              : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChat;