import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function Analytics() {
  const [analytics, setAnalytics] =
    useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get(
        "/analytics"
      );

      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const COLORS = [
    "#3B82F6",
    "#60A5FA",
    "#93C5FD",
    "#64748B",
    "#94A3B8",
    "#CBD5E1",
  ];

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        <h1>📊 Analytics</h1>

        <div className="analytics-grid">

          {/* Pie Chart */}

          <div className="chart-card">
            <h2>
              Expense Categories
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <PieChart>
                <Pie
                  data={analytics}
                  dataKey="totalAmount"
                  nameKey="_id"
                  outerRadius={120}
                >
                  {analytics.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}

          <div className="chart-card">
            <h2>
              Category Spending
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart
                data={analytics}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="_id" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="totalAmount"
                  fill="#3B82F6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Analytics;