import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import stepperImage from "../assets/insight-stepper.svg";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../styles/onboarding.module.css";
import UserContext from "../context/UserContext";
import api from "../network/api";

const DailyGoals = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("");
  const { token } = useContext(UserContext);
  const location = useLocation();
  const backUrl = location.state?.from;

  const goalMapping = {
    "10 Minutes Per Day": "10",
    "15-20 Minutes Per Day": "15-20",
    "30 Minutes Per Day": "30",
    "45-60 Minutes Per Day": "45-60",
  };

  const handleComplete = async () => {
    if (!selectedOption) {
      setError("Please select an option before proceeding.");
      return;
    }

    setError(""); // Clear error message
    const dailyGoalValue = goalMapping[selectedOption]; // Get backend value

    try {
      const response = await api.put("/auth/daily-goal/", {
        daily_goal: dailyGoalValue,
      });

      console.log("Daily goal updated successfully", response.data);
      navigate("/analyze"); // Navigate to the next page
    } catch (error) {
      console.error("Error updating daily goal:", error.response?.data || error.message);
      setError("Failed to update daily goal. Please try again.");
    }
  };

  return (
    <Container
      fluid
      className={`${styles.genreBody} d-flex flex-column justify-content-between`}
    >
      {/* Navigation */}
      <Row className="px-4 mb-4">
        <Col className="text-start">
          <button
            className={`${styles.btnTop}`}
            onClick={() => navigate(backUrl)}
          >
            &lt; Back
          </button>
        </Col>
        <Col className="text-end">
        </Col>
      </Row>

      {/* Stepper Image */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} className="text-center">
          <img
            src={stepperImage}
            alt="Progress Stepper"
            className={`${styles.stepperImg} img-fluid`}
          />
        </Col>
      </Row>

      {/* Header */}
      <div className="container text-center mb-4">
        <h2 className="text-danger fw-bold">
          Set Your Daily Goals for Self-Improvement
        </h2>
        <p className="text-muted">
          Let us know how much time you want to dedicate each day to learning
          and self-growth, and we’ll tailor your experience to fit your
          schedule.
        </p>
      </div>

      {/* Options */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            {Object.keys(goalMapping).map((option, index) => (
              <button
                key={index}
                className={`btn w-100 mb-3 d-flex align-items-center justify-content-between p-3 
                  ${
                    selectedOption === option
                      ? "btn-outline-danger border-2"
                      : "btn-light"
                  }
                  ${styles.seelectedGoal}`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
                {selectedOption === option && (
                  <span className="text-danger">&#9679;</span>
                )}
              </button>
            ))}
            {error && <p className="text-danger text-center mt-2">{error}</p>}
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <div className="container text-center mt-4">
        <button
          className={`${styles.footerMsg} btn-success`}
          onClick={handleComplete}
        >
          Complete
        </button>
      </div>
    </Container>
  );
};

export default DailyGoals;
