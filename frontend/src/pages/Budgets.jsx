import {
  useState,
  useEffect,
} from "react";

import API from "../api";
import Navbar from "../components/Navbar";

function Budgets() {
  const [category, setCategory] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [budgets, setBudgets] =
    useState([]);

  const fetchBudgets = async () => {
    try {
      const res = await API.get(
        "/budgets"
      );

      setBudgets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const addBudget = async (e) => {
    e.preventDefault();

    try {
      await API.post("/budgets", {
        category,
        amount,
      });

      setCategory("");
      setAmount("");

      fetchBudgets();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBudget = async (id) => {
    try {
      await API.delete(
        `/budgets/${id}`
      );

      fetchBudgets();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        <h1>Budget Planner</h1>

        <div className="form-card">
          <form
            onSubmit={addBudget}
          >
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              required
            />

            <input
              type="number"
              placeholder="Budget Amount"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              required
            />

            <button type="submit">
              Add Budget
            </button>
          </form>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Budget</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {budgets.map(
                (budget) => (
                  <tr
                    key={
                      budget._id
                    }
                  >
                    <td>
                      {
                        budget.category
                      }
                    </td>

                    <td>
                      ₹
                      {
                        budget.amount
                      }
                    </td>

                    <td>
                      <button
                        className="btn-delete"
                        onClick={() =>
                          deleteBudget(
                            budget._id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Budgets;