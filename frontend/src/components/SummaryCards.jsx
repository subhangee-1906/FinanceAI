function SummaryCards({ data }) {
  return (
    <div className="cards-container">
      <div className="card income">
        <h3>Total Income</h3>
        <h2>₹{data.totalIncome}</h2>
      </div>

      <div className="card expense">
        <h3>Total Expense</h3>
        <h2>₹{data.totalExpense}</h2>
      </div>

      <div className="card balance">
        <h3>Balance</h3>
        <h2>₹{data.balance}</h2>
      </div>

      <div className="card transactions">
        <h3>Transactions</h3>
        <h2>
          {data.incomeCount + data.expenseCount}
        </h2>
      </div>
    </div>
  );
}

export default SummaryCards;