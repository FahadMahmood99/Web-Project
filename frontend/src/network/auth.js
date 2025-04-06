import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/constants";

/** Login Function */
async function login(email, password, setErrorMessages, errorMessages) {
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
    console.log("ERROR", error.response?.data.detail);
    if (error.response?.data.detail == "User not found!") {
      errorMessages.email = "Incorrect email";
      errorMessages.password = "";
      setErrorMessages(errorMessages);
    } else if (error.response?.data.detail == "Incorrect password!") {
      errorMessages.email = "";
      errorMessages.password = "Incorrect password";
      setErrorMessages(errorMessages);
    }
    throw error;
  }
}

export default login;
