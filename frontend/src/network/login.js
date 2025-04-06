import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/constants";

/** Login Function */
async function login(email, password) {
  try {
    console.log("Sending login request:", { email, password });

    const response = await api.post("/auth/login", { email, password });

    console.log("RESPONSE RECEIVED FROM API:", response);
    const { access_token, refresh_token } = response.data;

    if (!access_token || !refresh_token) {
      throw new Error("Access or Refresh token missing in response.");
    }

    return { access_token, refresh_token }; // Return tokens and user instead of storing them here
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
}

export default login;
