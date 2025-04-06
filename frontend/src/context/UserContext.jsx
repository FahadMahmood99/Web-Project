import React, { createContext, useState, useEffect } from "react";
import api, { refreshToken } from "../network/api";
import {
  ACCESS_TOKEN,
  GOOGLE_ACCESS_TOKEN,
  IS_ONBOARDED,
  REFRESH_TOKEN,
  USER_GENRES,
  USER_INSIGHTS,
  VERIFIED,
} from "../constants/constants";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("USER")) || null
  );
  const [token, setToken] = useState(localStorage.getItem(ACCESS_TOKEN) || "");

  // useEffect(() => {
  //   if (!token) return;

  //   // Fetch user data only if token is valid
  //   api
  //     .get("/auth/user")
  //     .then((response) => {
  //       setUser(response.data);
  //       localStorage.setItem("USER", JSON.stringify(response.data));
  //     })
  //     .catch(async () => {
  //       // Try refreshing the token before logging out
  //       const newToken = await refreshToken();
  //       if (newToken) {
  //         setToken(newToken);
  //       } else {
  //         logout();
  //       }
  //     });
  // }, [token]);

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem(ACCESS_TOKEN, newToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(GOOGLE_ACCESS_TOKEN);
    localStorage.removeItem(USER_INSIGHTS);
    localStorage.removeItem(USER_GENRES);
    localStorage.removeItem(VERIFIED)
    localStorage.removeItem(IS_ONBOARDED)
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, updateToken, logout, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
