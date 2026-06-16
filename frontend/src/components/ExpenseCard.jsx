function ExpenseCard({ expense, deleteExpense }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center mb-4">

      <div>
        <h2 className="text-xl font-semibold">
          {expense.title}
        </h2>
        <p className="text-sm text-blue-500 mt-1">
           {expense.category}
        </p>
        <p className="text-gray-400 text-sm">
           {expense.date}
       </p>
        <p className="text-gray-500">
          ₹{expense.amount}
        </p>
      </div>

      <button
        onClick={() => deleteExpense(expense.id)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>

    </div>
  );
}

export default ExpenseCard;