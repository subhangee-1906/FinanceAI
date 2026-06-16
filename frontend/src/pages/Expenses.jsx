import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (e) => {
    e.preventDefault();

    try {
      await API.post("/expenses", {
        title,
        amount,
        category,
      });

      setTitle("");
      setAmount("");
      setCategory("");

      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        <h1>Expense Management</h1>

        <div className="form-card">
          <form onSubmit={addExpense}>
            <input
              placeholder="Expense Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <button type="submit">Add Expense</button>
          </form>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  <td>{expense.title}</td>
                  <td>₹{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deleteExpense(expense._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Expenses;