import { useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../modules/auth/context/AuthContext";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default function useApi() {
  const { accessToken, setAccessToken, setUser } = useAuthContext();

  useEffect(() => {
    // 1. Request Interceptor: Attach access token to headers if present
    const requestIntercept = apiClient.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 2. Response Interceptor: Handle 401 and refresh access token automatically
    const responseIntercept = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Don't retry if already retried or if this was a refresh/login/register request
        const isAuthEndpoint =
          originalRequest?.url?.includes("/auth/refresh") ||
          originalRequest?.url?.includes("/auth/login") ||
          originalRequest?.url?.includes("/auth/register");

        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry &&
          !isAuthEndpoint
        ) {
          originalRequest._retry = true;

          try {
            // Request new tokens using the HTTP-only refresh token cookie
            const refreshResponse = await axios.post(
              "/api/auth/refresh",
              {},
              { withCredentials: true }
            );

            const newAccessToken = refreshResponse.data?.accessToken;

            if (newAccessToken) {
              setAccessToken(newAccessToken);
              if (refreshResponse.data?.user) {
                setUser(refreshResponse.data.user);
              }

              // Update authorization header on the original failed request and retry
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return apiClient(originalRequest);
            }
          } catch (refreshError) {
            // Refresh token expired or invalid -> log user out
            setAccessToken(null);
            setUser(null);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Eject interceptors on cleanup
    return () => {
      apiClient.interceptors.request.eject(requestIntercept);
      apiClient.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, setAccessToken, setUser]);

  return apiClient;
}
