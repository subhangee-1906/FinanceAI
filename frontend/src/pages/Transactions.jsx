import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions/recent");
      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const matchesSearch =
        transaction.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "all"
          ? true
          : transaction.type === typeFilter;

      return (
        matchesSearch &&
        matchesType
      );
    }
  );

  const incomeCount =
    filteredTransactions.filter(
      (item) => item.type === "income"
    ).length;

  const expenseCount =
    filteredTransactions.filter(
      (item) => item.type === "expense"
    ).length;

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        <h1>📋 Transactions</h1>

        {/* Summary Cards */}

        <div className="summary-strip">

          <div className="summary-card">
            <h3>Total</h3>
            <h2>
              {filteredTransactions.length}
            </h2>
          </div>

          <div className="summary-card">
            <h3>Income</h3>
            <h2>{incomeCount}</h2>
          </div>

          <div className="summary-card">
            <h3>Expense</h3>
            <h2>{expenseCount}</h2>
          </div>

        </div>

        {/* Filters */}

        <div className="filter-container">

          <input
            type="text"
            placeholder="Search transaction..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
          >
            <option value="all">
              All
            </option>

            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>
          </select>

        </div>

        {/* Table */}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length >
              0 ? (
                filteredTransactions.map(
                  (item) => (
                    <tr
  key={item._id}
  className={
    item.type === "income"
      ? "income-row"
      : "expense-row"
  }
>
                      <td>
                        {item.type ===
                        "income"
                          ? "💰 Income"
                          : "💸 Expense"}
                      </td>

                      <td>
                        {item.title}
                      </td>

                      <td>
                        ₹{item.amount}
                      </td>

                      <td>
                        {new Date(
                          item.date
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign:
                        "center",
                    }}
                  >
                    No transactions
                    found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default Transactions;