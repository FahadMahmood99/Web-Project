import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import styles from "../styles/form.module.css";
import { Link, useNavigate } from "react-router-dom";

const ResetPwd = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const validateEmail = (email) => {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Email field cannot be empty.");
    } else if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
    } else {
      setErrorMessage("");
      // Redirect to OTP page on successful email validation
      navigate("/otp");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mt-4 mb-4">
      <div
        className={`${styles.SignupUser} col-10 col-sm-8 col-md-8 col-lg-6 col-xl-4 p-4`}
      >
        <h3 className="text-center">Reset Password</h3>
        <p className={`${styles.desc}`}>Enter your email to get reset link</p>
        <form className={`${styles.SignupUserForm}`} onSubmit={handleSubmit}>
          <div className={`${styles.inputGroup}`}>
            <fieldset className={`${styles.fieldsetStyle}`}>
              <legend className={`${styles.legendStyle}`}>Email:</legend>
              <input
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Enter your email"
                className={`${styles.formControl} ${styles.inputStyle}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            {/* Validation Message */}
            {errorMessage && (
              <div
                className="text-danger mt-2"
                style={{ fontSize: "0.875rem", textAlign: "left" }}
              >
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-success w-100 mt-4"
              style={{
                backgroundColor: "#bb1314",
                border: "none",
              }}
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <div className={`${styles.login} mt-4`}>
          <p>
            Remember the password?
            <Link
              to="/login"
              className={`${styles.loginLink}`}
              style={{ marginLeft: "7px" }}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPwd;
