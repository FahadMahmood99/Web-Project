import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/form.module.css";
import api from "../network/api";

const UpdatePwd = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const requestBody = { email, new_password: password };
    console.log(" Sending Request:", requestBody);

    try {
      console.log("BEF");
      const response = await api.post("/auth/forgotPassword", {
        email,
        new_password: password,
      });
      console.log("after");

      if (!response.status == 200)
        throw new Error(data.message || "Failed to reset password.");

      alert("Password updated successfully!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setErrorMessages({ ...errorMessages, password: error.message });
    }
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
        <h3 className="text-center">Update Password</h3>
        <form className={`${styles.SignupUserForm}`} onSubmit={handleSubmit}>
          <div className={`${styles.inputGroup}`}>
            {/* Password Input */}
            <fieldset className={`${styles.fieldsetStyle}`}>
              <legend className={`${styles.legendStyle}`}>Password:</legend>
              <div className="password-container position-relative">
                <input
                  type={passwordShown ? "text" : "password"}
                  autoComplete="off"
                  placeholder="Enter your password"
                  className={`${styles.desc} ${styles.inputStyle}`}
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
            {errorMessages.password && (
              <div
                className="text-danger mt-2"
                style={{ fontSize: "0.875rem" }}
              >
                {errorMessages.password}
              </div>
            )}

            {/* Confirm Password Input */}
            <fieldset className={`${styles.fieldsetStyle} mt-4`}>
              <legend className={`${styles.legendStyle}`}>
                Confirm Password:
              </legend>
              <div className="password-container position-relative">
                <input
                  type={passwordShown ? "text" : "password"}
                  autoComplete="off"
                  placeholder="Confirm your password"
                  className={`${styles.formControl} ${styles.inputStyle}`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
            {errorMessages.confirmPassword && (
              <div
                className="text-danger mt-2"
                style={{ fontSize: "0.875rem" }}
              >
                {errorMessages.confirmPassword}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success w-100 mt-4"
              style={{ backgroundColor: "#bb1314" }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePwd;
