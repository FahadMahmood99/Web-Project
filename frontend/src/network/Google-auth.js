import api from "../network/api";
import { ACCESS_TOKEN } from "../constants/constants";

// async function fetchCsrfToken() {
//   try {
//     const response = await api.get("/auth/get-csrf-token/");
//     const csrfToken = response.data.csrfToken; // Assuming backend sends { "csrfToken": "..." }
//     console.log("Fetched CSRF Token:", csrfToken);
//     return csrfToken;
//   } catch (error) {
//     console.error(
//       "Error fetching CSRF token:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// }

async function Googleauth(
  code,
  email,
  family_name,
  given_name,
  sub,
  email_verified
) {
  try {
    console.log("Google Auth Code:", code);

    // First, fetch the CSRF token
    // const csrfToken = await fetchCsrfToken();

    console.log("Making request to: /auth/google/");

    // Now send the authentication request with the CSRF token
    const response = await api.post(
      "/auth/google/",
      { code, email, family_name, given_name, sub, email_verified }
      // {
      //   headers: {
      //     "X-CSRFToken": csrfToken, // Attach CSRF token from backend
      //   },
      // }
    );

    console.log("Response from Backend:", response.data);

    if (response.data.access_token) {
      localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
    }

    return response.data;
  } catch (error) {
    console.error("Google Auth Error:", error.response?.data || error.message);
    throw error;
  }
}

export default Googleauth;
