import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function BudgetOverview() {
  const [budgets, setBudgets] =
    useState([]);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      const res = await API.get(
        "/budget-overview"
      );

      setBudgets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        <h1>📈 Budget Overview</h1>

        <div className="goals-grid">
          {budgets.map((budget) => (
            <div
              key={budget.category}
              className="goal-card"
            >
              <h2>
                {budget.category}
              </h2>

              <p>
                Budget:
                <strong>
                  ₹{budget.budget}
                </strong>
              </p>

              <p>
                Spent:
                <strong>
                  ₹{budget.spent}
                </strong>
              </p>

              <p>
                Remaining:
                <strong>
                  ₹
                  {
                    budget.remaining
                  }
                </strong>
              </p>

              <div className="progress-bar">
                <div
                  className={
                    budget.percentage >=
                    80
                      ? "progress-fill danger"
                      : budget.percentage >=
                        60
                      ? "progress-fill warning"
                      : "progress-fill"
                  }
                  style={{
                    width: `${Math.min(
                      budget.percentage,
                      100
                    )}%`,
                  }}
                />
              </div>

              <p className="goal-percent">
                {
                  budget.percentage
                }
                % Used
              </p>

              {budget.percentage >=
                80 && (
                <p
                  style={{
                    color:
                      "#ef4444",
                  }}
                >
                  ⚠ Budget Limit
                  Nearing
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BudgetOverview;