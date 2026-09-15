import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../modules/auth/context/AuthContext";

export default function ProtectedRoute() {
  const { user, accessToken, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Checking authentication...</p>
      </div>
    );
  }

  if (!user && !accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
