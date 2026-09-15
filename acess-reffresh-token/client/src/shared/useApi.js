import axios from "axios";
import { useAuthContext } from "../modules/auth/context/useAuthContext";

export default function useApi() {
  const authContext = useAuthContext();

  const api = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true, //cookies ko set ya read kr paye
  });

  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${authContext.accessToken}`;

    return config;
  });

  return api;
}
