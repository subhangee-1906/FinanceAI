import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

function ExpenseChart({ expenses }) {

  const data = [
    {
      name: "Expenses",
      value: expenses.reduce(
        (total, expense) =>
          total + Number(expense.amount),
        0
      )
    }
  ];

  return (

    <div className="bg-white p-6 rounded-2xl shadow mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Expense Analytics
      </h2>

      <PieChart width={300} height={300}>

        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
        >

          <Cell fill="#000000" />

        </Pie>

        <Tooltip />

      </PieChart>

    </div>

  );
}

export default ExpenseChart;