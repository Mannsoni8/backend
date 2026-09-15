import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import useApi from "../../../shared/useApi";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const api = useApi();
  const { user, setUser, logout, accessToken, setAccessToken } = useAuthContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError("");
    setApiResponse(null);
    try {
      const res = await api.get("/auth/me");
      setApiResponse(res.data);
      if (res.data?.data?.user) {
        setUser(res.data.data.user);
      }
    } catch (err) {
      console.error("Fetch profile error:", err);
      setError(err.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  }, [api, setUser]);

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/auth/me");
        if (!ignore) {
          setApiResponse(res.data);
          if (res.data?.data?.user) {
            setUser(res.data.data.user);
          }
        }
      } catch (err) {
        if (!ignore) {
          console.error("Fetch profile error:", err);
          setError(err.response?.data?.message || "Failed to fetch user data");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, [api, setUser]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const simulateExpiredToken = () => {
    // Set a fake invalid access token to test whether Axios response interceptor refreshes it automatically!
    setAccessToken("fake.invalid.expired_token");
    alert(
      "Simulated invalid access token in memory! Now click 'Test Protected API' to watch the Axios response interceptor automatically refresh the token with the backend and succeed."
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded transition"
          >
            Logout
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 p-4 rounded border">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              User Details
            </h2>
            <p className="text-gray-800">
              <span className="font-semibold">Name:</span> {user?.name || "Loading..."}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">Email:</span> {user?.email || "Loading..."}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded border">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Active Access Token (In Memory)
            </h2>
            <p className="text-xs font-mono text-gray-600 break-all bg-gray-200 p-2 rounded">
              {accessToken || "No access token in memory"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={fetchProfile}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition disabled:opacity-50"
          >
            {loading ? "Fetching..." : "Test Protected API (/auth/me)"}
          </button>

          <button
            onClick={simulateExpiredToken}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded transition"
          >
            Simulate Expired Token (Test Refresh Flow)
          </button>
        </div>

        {error && (
          <div className="p-4 mb-4 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {apiResponse && (
          <div className="bg-gray-900 text-green-400 p-4 rounded text-xs font-mono overflow-x-auto">
            <p className="text-gray-400 mb-1">// API Response from GET /api/auth/me:</p>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;
