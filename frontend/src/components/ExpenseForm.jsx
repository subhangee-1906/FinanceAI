import { useState } from "react";
import API from "../api";

function ExpenseForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    await API.post("/expenses", form);

    refresh();
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Title"
        onChange={(e)=>
          setForm({...form,title:e.target.value})
        }
      />

      <input
        placeholder="Amount"
        onChange={(e)=>
          setForm({...form,amount:e.target.value})
        }
      />

      <input
        placeholder="Category"
        onChange={(e)=>
          setForm({...form,category:e.target.value})
        }
      />

      <button>Add Expense</button>
    </form>
  );
}

export default ExpenseForm;