import ExpenseCard from "./ExpenseCard";

function ExpenseList({ expenses, deleteExpense }) {

  return (
    <div>

      <h2 className="text-2xl font-bold mb-4">
        Expenses
      </h2>

      {
        expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            deleteExpense={deleteExpense}
          />
        ))
      }

    </div>
  );
}

export default ExpenseList;