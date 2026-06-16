import { useState } from "react";
import API from "../api";

function IncomeForm({ fetchIncomes }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/income", {
        title,
        amount
      });

      setTitle("");
      setAmount("");

      fetchIncomes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Income</h3>

      <input
        placeholder="Income Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button type="submit">
        Add Income
      </button>
    </form>
  );
}

export default IncomeForm;