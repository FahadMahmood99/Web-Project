import login from "./auth";
import api from "../network/api"; // Use api.js for requests
import {
  ACCESS_TOKEN,
  IS_ONBOARDED,
  REFRESH_TOKEN,
  VERIFIED,
} from "../constants/constants";

const handleLogin = async (
  email,
  password,
  navigate,
  setErrorMessages,
  updateToken,
  setUser,
  errorMessages
) => {
  try {
    console.log("EMAIL ", email);
    console.log("PASSWORD ", password);

    const data = await login(email, password, setErrorMessages, errorMessages); // Call the auth login function
    console.log("RESPONSE FROM login ", data);

    if (!data || !data.access_token) {
      throw new Error("Invalid login response");
    }

    // Store token
    localStorage.setItem(ACCESS_TOKEN, data.access_token);
    await updateToken(data.access_token); // Update token in context
    localStorage.setItem(REFRESH_TOKEN, data.refresh_token);

    // Fetch user details using `api.js` (automatically attaches token)
    const response = await api.get("/auth/user");
    console.log("RESPONSE FROM ONBOARD ", response);
    localStorage.setItem(IS_ONBOARDED, response.data.is_onboarded);
    localStorage.setItem(VERIFIED, response.data.email_verified);

    // Navigate based on onboarding status
    if (response.data.is_onboarded) {
      console.log("USER ONBOARDED");
      navigate("/home");
    } else if (response.data.email_verified) {
      navigate("/onboarding");
    } else {
      const resp = await api.post("/auth/verifyEmailView", {
        email: response.data.email,
      });
      navigate("/otp", { state: { email: response.data.email, fromLogin: true, } });
    }
  } catch (err) {
    console.error("Login or Fetch Error:", err);
    // setdbError(err.response?.data?.detail || err.message || "Login failed");
  }
};

export default handleLogin;
