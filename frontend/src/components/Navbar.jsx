import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">FinanceAI</h2>

      <ul>
        <li>
          <Link to="/profile">👤 Profile</Link>
        </li>
        <li>
          <Link to="/dashboard">🏠 Dashboard</Link>
        </li>

        <li>
          <Link to="/income">💰 Income</Link>
        </li>

        <li>
          <Link to="/expenses">💸 Expenses</Link>
        </li>

        <li>
          <Link to="/analytics">📊 Analytics</Link>
        </li>
        
        <li>
          <Link to="/advisor">🤖 AI Advisor</Link>
        </li>
        <li>
          <Link to="/chat">🤖 AI Chatbot</Link>
        </li>

        <li>
          <Link to="/budgets">💰 Budgets</Link>
        </li>
       <li>
          <Link to="/budget-overview">📈 Budget Overview </Link> </li>
        <li>
          <Link to="/goals">🎯 Goals</Link>
        </li>

        <li>
          <Link to="/transactions">📋 Transactions</Link>
        </li>
      </ul>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;