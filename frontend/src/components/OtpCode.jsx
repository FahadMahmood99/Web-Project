import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import styles from "../styles/form.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../network/api";

const OtpCode = () => {
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const fromSignup = location.state?.fromSignup || false;

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

    setErrorMessage(errors);

    // If there are no errors, return true; otherwise, return false
    return Object.keys(errors).length === 0;
  };

  // const handlePhoneChange = (value) => {
  //   setPhone(value);
  //   if (value.length < 10 || !/^\d+$/.test(value)) {
  //     setErrorMessage("Please enter a valid phone number.");
  //   } else {
  //     setErrorMessage("");
  //   }
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    try {
      console.log("BEFORE");
      const response = await api.post("/auth/verifyEmailView", { email });
      console.log("after");

      console.log("RESPONSE FROM BE :: ", response);

      if (!response.status == 200) {
        throw new Error(response.data.message || "Something went wrong");
      }

      setTimeout(() => {
        navigate("/otp", { state: { email } }); // Navigate after success
      }, 500); // Optional delay for UX
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
        <p className={`${styles.desc}`}>
          Enter a phone number, and we will send a one-time SMS message
        </p>
        <form className={`${styles.SignupUserForm}`} onSubmit={handleSubmit}>
          <div className={`${styles.inputGroup}`}>
            <fieldset className={`${styles.fieldsetStyle}`}>
              {/* <legend className={`${styles.legendStyle}`}>Phone No</legend>
              <PhoneInput
                country={"us"}
                value={phone}
                onChange={handlePhoneChange}
                inputClass={`${styles.formControl} ${styles.inputStyle}`}
                inputStyle={{
                  paddingLeft: "50px",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  width: "100%",
                  height: "45px",
                  boxSizing: "border-box",
                }}
                containerStyle={{
                  marginTop: "3px",
                  border: "none",
                  outline: "none",
                }}
              />
              {errorMessage && (
                <small className="text-danger d-block mt-1">
                  {errorMessage}
                </small>
              )} */}
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
            {errorMessage.email && (
              <div className="text-danger mt-2 error">{errorMessage.email}</div>
            )}

            <button
              type="submit"
              className="btn btn-success w-100 mt-4"
              style={{ backgroundColor: "#bb1314" }}
            >
              Get OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpCode;
