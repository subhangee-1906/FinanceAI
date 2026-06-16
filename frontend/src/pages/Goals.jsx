import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function Goals() {
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const res = await API.get("/goals");
      setGoals(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const addGoal = async (e) => {
    e.preventDefault();

    try {
      await API.post("/goals", {
        title,
        targetAmount,
      });

      setTitle("");
      setTargetAmount("");

      fetchGoals();
    } catch (error) {
      console.log(error);
    }
  };

  const updateSavings = async (
    id,
    currentAmount
  ) => {
    const newAmount = prompt(
      "Enter Current Savings",
      currentAmount
    );

    if (!newAmount) return;

    try {
      await API.put(`/goals/${id}`, {
        currentAmount: Number(newAmount),
      });

      fetchGoals();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await API.delete(`/goals/${id}`);

      fetchGoals();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        <h1>🎯 Savings Goals</h1>

        <div className="form-card">
          <form onSubmit={addGoal}>
            <input
              type="text"
              placeholder="Goal Name"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

            <input
              type="number"
              placeholder="Target Amount"
              value={targetAmount}
              onChange={(e) =>
                setTargetAmount(
                  e.target.value
                )
              }
              required
            />

            <button type="submit">
              Add Goal
            </button>
          </form>
        </div>

        <div className="goals-grid">
          {goals.map((goal) => {
            const percentage =
              (goal.currentAmount /
                goal.targetAmount) *
              100;

            return (
              <div
  className={`goal-card ${
    percentage >= 100
      ? "goal-complete"
      : ""
  }`}
>
                <h2>{goal.title}</h2>

                <p className="goal-percent">
                  Target:
                  <strong>
                    {" "}
                    ₹{goal.targetAmount}
                  </strong>
                </p>

                <p className="goal-percent">
                  Saved:
                  <strong>
                    {" "}
                    ₹{goal.currentAmount}
                  </strong>
                </p>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(
                        percentage,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>

                <p
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {percentage.toFixed(0)}%
                  Completed
                </p>

                <div className="goal-actions">
                  <button
                    className="btn-edit"
                    onClick={() =>
                      updateSavings(
                        goal._id,
                        goal.currentAmount
                      )
                    }
                  >
                    Update
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() =>
                      deleteGoal(goal._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Goals;