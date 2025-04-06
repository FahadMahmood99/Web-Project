import { Navigate } from "react-router-dom";
import { IS_ONBOARDED, ACCESS_TOKEN } from "../constants/constants";

function GuestRoute({ children }) {
  const is_onboarded = localStorage.getItem(IS_ONBOARDED)
  const token = localStorage.getItem(ACCESS_TOKEN);

  // If user data isn't available yet, show a loading state
  if (!token) return children; // If no token, allow login/signup access

  // Navigate based on onboarding status
  return is_onboarded ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/onboarding" replace />
  );
}

export default GuestRoute;
