import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";
import stepperImage from "../assets/insight-stepper.svg";
import styles from "../styles/onboarding.module.css";
import UserContext from "../context/UserContext";
import api from "../network/api";
import { IS_ONBOARDED, VERIFIED } from "../constants/constants";

const Analyze = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const { token, user, setUser } = useContext(UserContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getProgressMessage = () => {
    if (progress >= 100) return ""; // Hide message when progress reaches 100%
    if (progress < 20) return "Analyzing your selected genres...";
    if (progress < 40) return "Refining your preferences...";
    if (progress < 60) return "Curating personalized recommendations...";
    if (progress < 80) return "Fine-tuning your reading experience...";
    return "Finalizing your setup...";
  };

  const completeOnboarding = async () => {
    if (progress < 100) return;

    try {
      const response = await api.patch("/auth/onboarding/", {
        is_onboarded: true,
      });

      const res = await api.get("/auth/user");

      localStorage.setItem(IS_ONBOARDED, res.data.is_onboarded);
      localStorage.setItem(VERIFIED, res.data.email_verified);

      // Store user data in context
      // setUser(res.data);
      // localStorage.setItem("USER", JSON.stringify(res.data));

      console.log("Onboarding status updated successfully", response.data);
      navigate("/home"); // Navigate to home after success
    } catch (error) {
      console.error(
        "Error updating onboarding:",
        error.response?.data || error.message
      );
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
            onClick={() => navigate("/selectgenres")}
          >
            &lt; Back
          </button>
        </Col>
        <Col className="text-end"></Col>
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
      <Row className="justify-content-center text-center mb-4">
        <Col xs={12} md={8}>
          <h2 className="text-danger fw-bold">
            Hang Tight! We’re Personalizing Your Journey
          </h2>
          <p className="text-muted">
            You're almost ready to start your personalized reading and listening
            experience! We're setting up your recommendations based on the
            genres, goals, and time preferences you've shared with us. This will
            only take a moment.
          </p>
        </Col>
      </Row>

      {/* Progress Bar */}
      <Row className="justify-content-center text-center mb-4">
        <Col xs={10} md={6}>
          <div style={{ position: "relative" }}>
            <ProgressBar
              now={progress}
              variant="danger"
              style={{ height: "25px", backgroundColor: "#f8d7da" }}
            />
            <span className={`${styles.progressText}`}>{progress}%</span>
          </div>
          <p className="text-danger mt-2">{getProgressMessage()}</p>
        </Col>
      </Row>

      {/* Completion Button */}
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button
            className={`${styles.progressBtn}`}
            style={{
              backgroundColor: progress === 100 ? "#a00" : "#dc3545",
              opacity: progress === 100 ? "1" : "0.6",
              cursor: progress === 100 ? "pointer" : "not-allowed",
            }}
            onClick={completeOnboarding}
            disabled={progress < 100}
          >
            You're All Set
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Analyze;
