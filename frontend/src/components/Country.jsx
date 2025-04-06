import React, { useMemo, useState, useContext } from "react";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/form.module.css";
import { useNavigate } from "react-router-dom";
import api from "../network/api";
import UserContext from "../context/UserContext";

const Country = () => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    country: null,
  });
  const [errors, setErrors] = useState({});

  const options = useMemo(() => countryList().getData(), []);
  const navigate = useNavigate();
  const [dbError, setdbError] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Validation rules
    if (!formData.country) newErrors.country = "Country is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        console.log("Form submitted successfully:", formData.country.value);

        // Make the correct PUT request
        await api.put("/auth/country/", { code: formData.country.value });

        // Fetch updated user details
        const updatedUserResponse = await api.get("/auth/user");
        // setUser(updatedUserResponse.data);

        // Redirect to onboarding after success
        navigate("/onboarding");
      } catch (err) {
        console.error("Error updating country:", err);
        setdbError(err.response?.data?.message || "Failed to update country.");
      }
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mt-4 mb-4">
      <div
        className={`${styles.SignupUser} col-10 col-sm-8 col-md-8 col-lg-6 col-xl-4 p-4`}
      >
        <h3 className="text-center">Country</h3>
        <p className={styles.desc}>Select your country</p>
        <form className={`${styles.SignupUserForm}`} onSubmit={handleSubmit}>
          <div className={`${styles.inputGroup}`}>
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
                    zIndex: 1050,
                  }),
                }}
              />
            </fieldset>
            {errors.country && (
              <p className={`${styles.error}`}>{errors.country}</p>
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
      </div>
    </div>
  );
};

export default Country;
