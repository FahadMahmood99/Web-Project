import Googleauth from "../network/Google-auth"; // Backend API call function
import api from "../network/api";
import {
  ACCESS_TOKEN,
  IS_ONBOARDED,
  VERIFIED,
} from "../constants/constants.js";

export const handleGoogleSuccess = async (
  tokenResponse,
  navigate,
  setdbError,
  setUser,
  setToken
) => {
  try {
    console.log("Google OAuth Token Response:", tokenResponse);

    const googleAccessToken = tokenResponse.access_token;

    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${googleAccessToken}` },
      }
    );
    const userData = await userInfoResponse.json();
    console.log("User Data from Google:", userData);

    const data = await Googleauth(
      googleAccessToken,
      userData.email,
      userData.family_name || "",
      userData.given_name || "",
      userData.sub,
      userData.email_verified
    );

    console.log("Response from Backend:", data);

    localStorage.setItem("GOOGLE_ACCESS_TOKEN", googleAccessToken);
    localStorage.setItem(ACCESS_TOKEN, data.access_token);
    await setToken(data.access_token);

    const userStatus = await api.get("/auth/user");
    console.log("USER STATUS COUNTRY CODE ::: ", userStatus);
    localStorage.setItem(IS_ONBOARDED, userStatus.data.is_onboarded);
    localStorage.setItem(VERIFIED, userStatus.data.email_verified);
    // localStorage.setItem("USER", JSON.stringify(userStatus.data));
    // setUser(userStatus.data);

    // Check country_id first
    if (!userStatus.data.country_code) {
      console.log("1");
      navigate("/country");
    } else if (!userStatus.data.is_onboarded && userStatus.data.country_code) {
      console.log("2");
      navigate("/onboarding");
    } else {
      console.log("3");
      navigate("/home");
    }
  } catch (error) {
    console.error("Google Login Failed:", error);
    setdbError("Google login failed. Please try again.");
  }
};
