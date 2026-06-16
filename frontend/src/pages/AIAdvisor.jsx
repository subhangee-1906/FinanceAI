import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import ReportGenerator from "../components/ReportGenerator";

function AIAdvisor() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = async () => {
    try {

      const res = await API.get(
        "/ai/advice"
      );

      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!data)
    return <h2>Loading...</h2>;

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">

        <h1>
          🤖 AI Spending Advisor
        </h1>

        <ReportGenerator
          dashboard={{
            totalIncome:
              data.totalIncome,
            totalExpense:
              data.totalExpense,
            balance:
              data.balance,
          }}
          advice={data.advice}
        />

        <div className="advisor-card">

          <h2>
            Savings Rate:
            {data.savingsRate}%
          </h2>

          <ul>
            {data.advice.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

        </div>

      </div>
    </div>
  );
}

export default AIAdvisor;