import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";

function Dashboard() {
  const [data, setData] = useState(null);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!data) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        <h1>FinanceAI Dashboard</h1>

        <p className="subtitle">
          Track your finances and monitor your growth.
        </p>

        <SummaryCards data={data} />

        <div className="dashboard-sections">
          <div className="section-card">
            <h2>Financial Overview</h2>

            <p>Total Income: ₹{data.totalIncome}</p>
            <p>Total Expense: ₹{data.totalExpense}</p>
            <p>Current Balance: ₹{data.balance}</p>
          </div>

          <div className="section-card">
            <h2>Transactions Summary</h2>

            <p>Income Entries: {data.incomeCount}</p>
            <p>Expense Entries: {data.expenseCount}</p>
            <p>
              Total Transactions:{" "}
              {data.incomeCount + data.expenseCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;