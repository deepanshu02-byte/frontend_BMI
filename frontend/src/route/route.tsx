import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// Lazy-loaded pages
const Register = lazy(() => import("../pages/auth/Register"));
const Login = lazy(() => import("../pages/auth/Login"));

const UserDashboard = lazy(() => import("../pages/user/UserDashboard"));
const UserHomePage = lazy(() => import("../pages/user/UserHomePage"));
// const UserTransactionHistory = lazy(() => import("../pages/user/UserTransactionHistory"));
const CalculateBmi = lazy(() => import("../pages/user/CalculateBmi"));
const MealPlanner = lazy(() => import("../pages/user/MealPlanner"));
const UpdateProfile = lazy(() => import("../pages/user/UpdateProfile"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminHomePage = lazy(() => import("../pages/admin/AdminHomePage"));

const routes = [
  { path: "/", element: <Register /> },
  { path: "/login", element: <Login /> },

  {
    element: <ProtectedRoute allowedRoles={["patient"]} />,
    children: [
      {
        path: "/dashboard",
        element: <UserDashboard />,
        children: [
          { index: true, element: <UserHomePage /> },
          { path: "bmi", element: <CalculateBmi /> },
          { path: "meal", element: <MealPlanner /> },
          { path: "profile", element: <UpdateProfile /> }
        ],
      },
    ],
  },

  // Admin Routes
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
        children: [
          { index: true, element: <AdminHomePage /> },
          // { path: "all-nurses", element: <NurseList /> },
        ],
      },
    ],
  },

  // Fallback
  { path: "*", element: <Navigate to="/login" replace /> },
];

export default routes;
