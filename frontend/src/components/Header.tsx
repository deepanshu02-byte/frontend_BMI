import React, { lazy, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLoggedInUser, logout } from "../utils/utils";

const AdminSidebar = lazy(() => import("./AdminSidebar"));
const UserSidebar = lazy(() => import("./UserSidebar"));

interface HeaderProps {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const { name, role, email } = getLoggedInUser();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logout successful");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen">
      {role === "admin" ? <AdminSidebar /> : <UserSidebar />}

      <div className="flex flex-col flex-1">
        {/* Top Navigation */}
        <nav className="bg-gray-900 p-4 flex items-center justify-between">
          <div className="w-1/4" />
          <div className="relative flex items-center space-x-6 ml-auto" ref={dropdownRef}>
            {/* User Icon */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-10 h-10 text-white rounded-full border-2 border-white p-1 bg-gray-800 transition-transform duration-300 hover:scale-105"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A9.004 9.004 0 0112 15c2.21 0 4.216.8 5.879 2.121M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 top-full mt-4 w-64 bg-white text-black rounded shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
                dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {/* Arrow */}
              <div className="absolute top-0 right-0 -mt-1 w-4 h-4 bg-white rotate-45  z-0"></div>

              <div className="relative z-10 p-4 border-b">
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-sm text-gray-600">{email}</p>
                <p className="text-sm text-gray-600 capitalize">{role}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-100 text-red-600"
              >
                <span>Logout</span>
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="p-4 overflow-y-auto">
          <h1 className="text-xl font-semibold">{children}</h1>
        </main>
      </div>
    </div>
  );
};
