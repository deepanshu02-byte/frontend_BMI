import React, { useState } from "react";
 import { NavLink } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Dynamic styling for NavLink based on active state
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `mb-2 text-center px-4 py-2 mb-6 rounded shadow transition-colors duration-200 ${
      isActive
        ? "bg-blue-500 text-white"
        : "bg-gray-800 text-white hover:bg-blue-500 hover:text-white"
    }`;

  return(
    <div
      className={`bg-gray-900 text-white transition-all duration-300 flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="p-4 bg-gray-900">
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
          {isOpen && <p className="text-white text-lg">Dashboard</p>}
        </div>
      </button>

      {/* Navigation Links */}
      <div className={`flex flex-col ${isOpen ? "block" : "hidden"} md:block p-6`}>
        <NavLink to="/admin-dashboard" end className={linkClasses}>
          Home
        </NavLink>
        <NavLink to="/admin-dashboard/all-nurses" className={linkClasses}>
          All Nurses
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
