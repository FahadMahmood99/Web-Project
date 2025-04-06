import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, IS_ONBOARDED, VERIFIED } from "../constants/constants";

function ProtectedRoute({ children }) {
  const is_onboarded = localStorage.getItem(IS_ONBOARDED) === "true"; // Convert to Boolean
  const token = localStorage.getItem(ACCESS_TOKEN);
  const verified = localStorage.getItem(VERIFIED) === "true"; // Ensure it's a Boolean

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!verified) {
    return <Navigate to="/emailverification" replace />;
  }

  if (verified && !is_onboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return children; // Allow access
}

export default ProtectedRoute;
