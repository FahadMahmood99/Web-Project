import React, { useContext, useState } from "react";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/form.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleBtn from "../components/GoogleBtn";
import { handleGoogleSuccess } from "../utils/GoogleApi.jsx";
import handleLogin from "../network/IsOnboarded.js";
import UserContext from "../context/UserContext.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const [dbError, setdbError] = useState(null);
  const navigate = useNavigate();
  const { setUser, updateToken, setToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await handleLogin(
        email,
        password,
        navigate,
        setErrorMessages,
        updateToken,
        setUser,
        errorMessages
      );
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setErrorMessages(errors);

    // If there are no errors, return true; otherwise, return false
    return Object.keys(errors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center pt-4 pb-4"
      style={{ backgroundColor: "#FFF8F5", height: "auto" }}
    >
      <div
        className={`${styles.SignupUser} col-10 col-sm-8 col-md-8 col-lg-6 col-xl-4 p-4`}
      >
        <h3 className="text-center">Login</h3>
        <p className={styles.desc}>
          Welcome back! Please log in to access your account.
        </p>
        <form className={`${styles.SignupUserForm}`} onSubmit={handleSubmit}>
          <div className={`${styles.inputGroup}`}>
            {/* Email Input */}
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
            {/* Email Error Message */}
            {errorMessages.email && (
              <div className="text-danger mt-2 error">
                {errorMessages.email}
              </div>
            )}

            {/* Password Input */}
            <fieldset className={`${styles.fieldsetStyle}`}>
              <legend className={`${styles.legendStyle}`}>Password:</legend>
              <div className={`${styles.passwordContainer} position-relative`}>
                <input
                  type={passwordShown ? "text" : "password"}
                  id="pwd"
                  autoComplete="off"
                  placeholder="Enter your password"
                  className={`${(styles.formControl, styles.inputStyle)}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`bi ${
                    passwordShown ? "bi-eye" : "bi-eye-slash"
                  } position-absolute`}
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={togglePasswordVisibility}
                />
              </div>
            </fieldset>
            {/* Password Error Message */}
            {errorMessages.password && (
              <div className="text-danger mt-2 error">
                {errorMessages.password}
              </div>
            )}

            {/* Remember Me and Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="d-flex align-items-center">
                <input
                  className={styles.formCheckInput}
                  type="checkbox"
                  id="termsCheckbox"
                />
                <label
                  className={styles.formCheckLabel}
                  htmlFor="termsCheckbox"
                  style={{
                    color: "#495057",
                    whiteSpace: "nowrap",
                    margin: 0,
                  }}
                >
                  Remember Me
                </label>
              </div>
              <Link
                href="#"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
                to="/emailverification"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success w-100 mt-4"
              style={{ backgroundColor: "#bb1314" }}
              onClick={handleSubmit}
            >
              Login
            </button>

            {/* Divider */}
            <span className={`${styles.textLine} my-3`}>OR</span>

            {/* Login with Google */}
            <GoogleOAuthProvider clientId="233951012392-us7v2olibnnnt50g5qo9qjki4att4sk5.apps.googleusercontent.com">
              <GoogleBtn
                buttonText="Login with Google"
                onSuccess={(tokenResponse) =>
                  handleGoogleSuccess(
                    tokenResponse,
                    navigate,
                    setdbError,
                    setToken,
                    setUser
                  )
                }
                onError={() =>
                  setdbError("Google login failed. Please try again.")
                }
              />
            </GoogleOAuthProvider>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className={`${styles.login} mt-3`}>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className={`${styles.loginLink}`}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
