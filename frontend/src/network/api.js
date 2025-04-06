import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/constants";

const API_URL = "http://localhost:8000"; // Change to production API in deployment

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/** Refresh Token Function */
export async function refreshToken() {
  try {
    console.log("Requesting token refresh...");
    const refresh = localStorage.getItem(REFRESH_TOKEN);

    if (!refresh) {
      console.error("No refresh token found. Logging out...");
      return null;
    }

    const response = await axios.post(`${API_URL}/auth/refresh`, { refresh });
    const newAccessToken = response.data.access;

    if (newAccessToken) {
      localStorage.setItem(ACCESS_TOKEN, newAccessToken);
      console.log("Token refreshed:", newAccessToken);
      return newAccessToken;
    }
    return null;
  } catch (error) {
    console.error(
      "Token refresh failed:",
      error.response?.data || error.message
    );
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    return null;
  }
}

/** Request Interceptor: Attach Token */
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      token = await refreshToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/** Response Interceptor: Handle Expired Token */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // Retry request with new token
      }
    }

    return Promise.reject(error);
  }
);

export default api;
