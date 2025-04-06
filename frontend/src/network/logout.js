import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import UserContext from "../context/UserContext"; // Import UserContext

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext); // Get logout function from context

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await api.post("/auth/logout", {}); // API request to logout
      } catch (error) {
        console.error("Error while logging out:", error);
      }
      logout(); // Properly update the UserContext
      navigate("/login");
    };

    logoutUser();
  }, [logout, navigate]);

  return null; // No UI needed for logout
};

export default Logout;
