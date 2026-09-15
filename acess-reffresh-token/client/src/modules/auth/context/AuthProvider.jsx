import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Try to restore session on initial page load using the refresh token cookie
  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const response = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        if (isMounted && response.data?.accessToken) {
          setAccessToken(response.data.accessToken);
          setUser(response.data.user || null);
        }
      } catch {
        // No valid session / cookie expired; user remains logged out
        if (isMounted) {
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
