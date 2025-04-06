import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import glogo from "../assets/g-icon.webp";

const GoogleBtn = ({ onSuccess, onError, buttonText }) => {
  const googleLogin = useGoogleLogin({
    onSuccess,
    onError,
  });

  return (
    <button
      type="button"
      className="btn btn-secondary w-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#f7f7f8",
        color: "black",
        border: "1px solid #ddd",
        padding: "10px",
      }}
      onClick={googleLogin}
    >
      <img
        src={glogo}
        className="me-2"
        alt="Google logo"
        style={{ width: "20px", height: "20px" }}
      />
      {buttonText || "Continue with Google"}
    </button>
  );
};

export default GoogleBtn;
