import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/form.module.css";
import api from "../network/api";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  IS_ONBOARDED,
  VERIFIED,
} from "../constants/constants";

const OtpCodeVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || ""); // Get email from state
  const fromSignup = location.state?.fromSignup || false;
  const fromLogin = location.state?.fromLogin || false;
  const password = location.state?.password || "";
  const navigate = useNavigate();

  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value) setErrorMessage("");

    // Automatically move to the next input if available
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.some((field) => field === "")) {
      setErrorMessage("Please fill in all OTP fields.");
      return;
    }

    setErrorMessage("");

    try {
      // Verify OTP
      const response = await api.post("/auth/verifyCode", {
        email,
        code: otp.join(""),
      });

      if (response.status !== 200) {
        throw new Error(
          response.data.message || "Invalid OTP. Please try again."
        );
      }

      //Set local storage
      const res = await api.get("/auth/user");
      console.log("RESPONSE FROM ONBOARD for signup ", res);
      localStorage.setItem(IS_ONBOARDED, res.data.is_onboarded);
      localStorage.setItem(VERIFIED, res.data.email_verified);

      // If coming from signup, log in the user automatically
      if (fromSignup) {
        const loginResponse = await api.post("/auth/login", {
          email,
          password,
        });

        if (loginResponse.status === 200) {
          const { access_token, refresh_token } = loginResponse.data;
          localStorage.setItem(ACCESS_TOKEN, access_token);
          localStorage.setItem(REFRESH_TOKEN, refresh_token);
          navigate("/onboarding");
        } else {
          throw new Error("Login failed after OTP verification.");
        }
      } else if (fromLogin) {
        navigate("/onboarding");
      } else {
        // Redirect to forgot password on successful OTP verification
        navigate("/update", { state: { email } });
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mt-4 mb-4">
      <div
        className={`${styles.SignupUser} col-10 col-sm-8 col-md-8 col-lg-6 col-xl-4 p-4`}
      >
        <h3 className="text-center">OTP Verification</h3>
        <p className={`${styles.desc}`}>Enter OTP sent to your email.</p>

        <form className={`${styles.SignupUserForm}`} onSubmit={handleSubmit}>
          <div className={`${styles.inputGroup}`}>
            {/* OTP Input Fields */}
            <div
              className="d-flex justify-content-center align-items-center mt-3"
              style={{ gap: "8px" }}
            >
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  id={`otp-input-${index}`}
                  className={`${styles.formControl} ${styles.otpInput} ${styles.otpBox}`}
                />
              ))}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                className="text-danger mt-3 text-center"
                style={{ fontSize: "0.875rem" }}
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success w-100 mt-4"
              style={{ backgroundColor: "#bb1314", border: "none" }}
            >
              Verify OTP
            </button>
          </div>
        </form>

        <div className={`${styles.login} mt-3 text-center`}>
          <p>
            Didn't receive a code?{" "}
            <span className={`${styles.loginLink}`}>Resend</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpCodeVerification;
