import React, { useMemo, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/form.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    country: null,
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const navigate = useNavigate();
  const [dbError, setdbError] = useState(null);
  const validateForm = () => {
    const newErrors = {};

    // Validation rules
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.phone_number)
      newErrors.phone_number = "Phone number is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
    }
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and privacy policy.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log("Submitting:", formData);

      const registerResponse = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          country: formData.country.value,
          phone_number: formData.phone_number,
        }
      );

      console.log("REGISTER RESPONSE", registerResponse.data);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setdbError(err?.response?.data?.message || "Signup failed");
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordShown(!passwordShown);
    } else if (field === "confirmPassword") {
      setConfirmPasswordShown(!confirmPasswordShown);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mt-4 mb-4">
      <div
        className={`${styles.SignupUser} col-10 col-sm-8 col-md-8 col-lg-6 col-xl-4 p-4`}
      >
        <h3 className="text-center">Sign Up</h3>
        <p className={styles.desc}>
          Create an account to access exclusive features
        </p>
        <form className={`${styles.SignupUserForm}`} onSubmit={handleSubmit}>
          <div className={`${styles.inputGroup}`}>
            <fieldset className={`${styles.fieldsetStyle}`}>
              <legend className={`${styles.legendStyle}`}>Name:</legend>
              <input
                type="text"
                id="name"
                autoComplete="off"
                placeholder="Enter your name"
                className={`${styles.formControl} ${styles.inputStyle}`}
                value={formData.name}
                onChange={handleInputChange}
              />
            </fieldset>
            {errors.name && <p className={`${styles.error}`}>{errors.name}</p>}

            <fieldset className={`${styles.fieldsetStyle}`}>
              <legend className={`${styles.legendStyle}`}>Phone number:</legend>
              <PhoneInput
                country={"us"}
                value={formData.phone_number}
                onChange={(phone_number) =>
                  setFormData((prev) => ({ ...prev, phone_number }))
                }
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
            </fieldset>
            {errors.phone_number && (
              <p className={`${styles.error}`}>{errors.phone_number}</p>
            )}

            <fieldset
              className={`${styles.fieldsetStyle}`}
              style={{ paddingBottom: 0 }}
            >
              <legend className={`${styles.legendStyle}`}>Country name:</legend>
              <Select
                options={options}
                value={formData.country}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, country: value }))
                }
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    height: "45px",
                    boxShadow: "none",
                    marginBottom: "13px",
                  }),
                  indicatorSeparator: (styles) => ({ display: "none" }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    zIndex: 1050, // Set a high z-index to ensure the dropdown appears above other elements
                  }),
                }}
              />
            </fieldset>
            {errors.country && (
              <p className={`${styles.error}`}>{errors.country}</p>
            )}

            <fieldset className={`${styles.fieldsetStyle}`}>
              <legend className={`${styles.legendStyle}`}>Email:</legend>
              <input
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Enter your email"
                className={`${styles.formControl} ${styles.inputStyle}`}
                value={formData.email}
                onChange={handleInputChange}
              />
            </fieldset>
            {errors.email && (
              <p className={`${styles.error}`}>{errors.email}</p>
            )}

            <fieldset className={`${styles.fieldsetStyle}`}>
              <legend className={`${styles.legendStyle}`}>Password:</legend>
              <div className="password-container position-relative">
                <input
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  autoComplete="off"
                  placeholder="Enter your password"
                  className={`${styles.formControl} ${styles.inputStyle}`}
                  value={formData.password}
                  onChange={handleInputChange}
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
                  onClick={() => togglePasswordVisibility("password")}
                />
              </div>
            </fieldset>
            {errors.password && (
              <p className={`${styles.error}`}>{errors.password}</p>
            )}

            <fieldset className={`${styles.fieldsetStyle}`}>
              <legend className={`${styles.legendStyle}`}>
                Confirm Password:
              </legend>
              <div className="password-container position-relative">
                <input
                  type={confirmPasswordShown ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="off"
                  placeholder="Re-enter your password"
                  className={`${styles.formControl} ${styles.inputStyle}`}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <i
                  className={`bi ${
                    confirmPasswordShown ? "bi-eye" : "bi-eye-slash"
                  } position-absolute`}
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                />
              </div>
            </fieldset>
            {errors.confirmPassword && (
              <p className={`${styles.error}`}>{errors.confirmPassword}</p>
            )}

            {/* Checkbox for Terms of Use */}
            <div
              className="mt-3"
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "5px",
              }}
            >
              <input
                className={`${styles.formCheckInput}`}
                type="checkbox"
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
              />
              <label
                className={`${styles.formCheckLabel} ms-1`}
                htmlFor="termsCheckbox"
                style={{ lineHeight: "1.5", margin: 0 }}
              >
                I agree to <a href="#">terms of use</a> and{" "}
                <a href="#">privacy policy</a>.
              </label>
            </div>
            {errors.termsAccepted && (
              <p className={`${styles.error}`}>{errors.termsAccepted}</p>
            )}

            <button
              type="submit"
              className="btn btn-success w-100 mt-4"
              style={{ backgroundColor: "#bb1314" }}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className={`${styles.login} mt-3`}>
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className={`${styles.loginLink}`}
              style={{ marginLeft: "5px" }}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
