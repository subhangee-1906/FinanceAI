import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Analytics from "./pages/Analytics";
import AIAdvisor from "./pages/AIAdvisor";
import AIChat from "./pages/AIChat";
import BudgetOverview from "./pages/BudgetOverview";
import Goals from "./pages/Goals";
import Budgets from "./pages/Budgets";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/advisor" element={<AIAdvisor />} />
        <Route path="/chat" element={<AIChat />} />
        <Route path="/budget-overview" element={<BudgetOverview />} />
        <Route path="/budgets" element={<Budgets />}/>
        <Route path="/goals" element={<Goals />}/>
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;