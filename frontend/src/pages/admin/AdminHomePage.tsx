import React from "react";
import { Card } from "../../components/reusable/Card";

const AdminHomePage: React.FC = () => {
  // Hardcoded metrics
  const totalPatients = 1200;
  const totalDepartments = 8;
  const totalNurses = 45;
  const totalHeadNurses = 5;
  const totalTransactions = 3200;
  const completedTransactions = 3100;
  const activeUsers = 130;
  const closedUsers = 10;

  const transactionstats = [
    { month: "April", transactions: 800, amount: 120000 },
    { month: "May", transactions: 850, amount: 130000 },
    { month: "June", transactions: 780, amount: 125000 },
    { month: "July", transactions: 770, amount: 118000 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <Card title="Total Patients" description="1200" variant="elevated" className="w-full" />
      <Card title="Departments" description="8" variant="outlined" className="w-full" />
      <Card title="Nurses" description="45" variant="elevated" className="w-full" />
      <Card title="Head Nurses" description="5" variant="outlined" className="w-full" />
      <Card title="Total Transactions" description="3200" variant="elevated" className="w-full" />
      <Card title="Completed Transactions" description="3100" variant="outlined" className="w-full" />
      <Card title="Active Patient" description="130" variant="elevated" className="w-full" />
      <Card title="Treated Patient" description="10" variant="elevated" className="w-full" />
    </div>



      {/* Transactions Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Last 4 Months Transactions
        </h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <th className="px-4 py-2">Month</th>
              <th className="px-4 py-2">Transactions</th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {transactionstats.map((item, index) => (
              <tr key={index} className={index % 2 === 1 ? "bg-gray-50" : ""}>
                <td className="px-4 py-2">{item.month}</td>
                <td className="px-4 py-2">{item.transactions}</td>
                <td className="px-4 py-2">₹{item.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomePage;
