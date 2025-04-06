import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/onboarding.svg";
import styles from "../styles/onboarding.module.css";

const Onboarding = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.onboardingBody} container-fluid d-flex justify-content-center align-items-center`}
    >
      <div className="col-10 col-sm-8 col-md-8 col-lg-6 col-xl-4">
        <h2 style={{ color: "#bb1314", fontWeight: "bold" }}>
          Welcome To Flicker
        </h2>
        <h5 style={{ color: "#555555", marginBottom: "20px" }}>
          Discover key insights from books in just minutes
        </h5>
        <img
          src={img1}
          alt="Onboarding Illustration"
          className={`${styles.onboardingImg}`}
        />
        <p style={{ color: "#666666", fontSize: "16px" }}>
          Get the best summaries of popular books, tailored to your interests.
          Let's set up your profile to get started!
        </p>
        <button
          className={`${styles.onboardingBtn} btn btn-success w-100 mt-4`}
          onClick={() => navigate("/selectgenres")} // Navigate to /onboarding
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
