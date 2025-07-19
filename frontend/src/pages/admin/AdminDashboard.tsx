import React from "react";
import { Header } from "../../components/Header";
import { Outlet } from "react-router";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header>
        <Outlet />
      </Header>
    </div>
  );
};

export default AdminDashboard;
