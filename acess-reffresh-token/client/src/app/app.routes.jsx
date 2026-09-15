import { createBrowserRouter, Navigate } from "react-router";
import Register from "../modules/auth/pages/Register";
import Login from "../modules/auth/pages/Login";
import Profile from "../modules/auth/pages/Profile";
import ProtectedRoute from "../shared/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/profile" replace />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
