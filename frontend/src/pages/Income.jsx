import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function Income() {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [incomes, setIncomes] = useState([]);

  const fetchIncomes = async () => {
    try {
      const res = await API.get("/income");
      setIncomes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const addIncome = async (e) => {
    e.preventDefault();

    try {
      await API.post("/income", {
        source,
        amount,
      });

      setSource("");
      setAmount("");

      fetchIncomes();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await API.delete(`/income/${id}`);
      fetchIncomes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        <h1>Income Management</h1>

        <div className="form-card">
          <form onSubmit={addIncome}>
            <input
              type="text"
              placeholder="Income Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <button type="submit">Add Income</button>
          </form>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {incomes.map((income) => (
                <tr key={income._id}>
                  <td>{income.source}</td>
                  <td>₹{income.amount}</td>
                  <td>{new Date(income.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deleteIncome(income._id)}
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

export default Income;