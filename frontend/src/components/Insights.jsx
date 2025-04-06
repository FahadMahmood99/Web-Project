import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stepperImage from "../assets/insight-stepper.svg";
import productivityIcon from "../assets/insight-1.svg";
import successIcon from "../assets/insight-2.svg";
import disciplineIcon from "../assets/insight-3.svg";
import motivationIcon from "../assets/insight-4.svg";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../styles/onboarding.module.css";
import api from "../network/api";

const Insights = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // Load selected insights from localStorage
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/content/categories");
        console.log("Fetched Categories:", response.data);
        setCategories(response.data || []);
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error.response?.data || error.message
        );
      }
    };
  
    // Retrieve stored insights
    const storedInsights = JSON.parse(localStorage.getItem("USER_INSIGHTS")) || [];
    setSelectedOptions(storedInsights); 
  
    Promise.all([fetchCategories()]).finally(() => setLoading(false));
  }, []);

  const toggleSelection = (categoryTitle) => {
    setSelectedOptions((prev) => {
      let updatedSelections;
  
      if (prev.includes(categoryTitle)) {
        updatedSelections = prev.filter((item) => item !== categoryTitle);
      } else if (prev.length < 3) {
        updatedSelections = [...prev, categoryTitle];
      } else {
        return prev; // Do nothing if already 3 selected
      }
  
      // Save updated selections correctly
      localStorage.setItem("USER_INSIGHTS", JSON.stringify(updatedSelections));
  
      return updatedSelections;
    });
  };

  // Save selected insights and navigate to the next screen
  const handleNext = async () => {
    if (selectedOptions.length < 2) {
      setError("Please select at least 2 option.");
      return;
    }
    if (selectedOptions.length > 3) {
      setError("You can select a maximum of 3 options.");
      return;
    }
    setError(""); // Clear error message before navigating

    // Format payload (same as SelectGenres)
    const payload = selectedOptions
      .map((categoryTitle) => {
        const category = categories.find((c) => c.title === categoryTitle);
        return category
          ? { id: parseInt(category.id, 10), title: category.title }
          : null;
      })
      .filter((c) => c !== null);

    console.log("Final Payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await api.put("/auth/user/categories", payload);
      console.log("Categories updated successfully:", response.data);
      navigate("/goals", { state: { from: "/insights" } });
    } catch (error) {
      console.error(
        "Error updating categories:",
        error.response?.data || error.message
      );
      setLimitMessage("Failed to save categories. Please try again.");
    }

    navigate("/goals", { state: { from: "/insights" } });
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }

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
        <Col className="text-end">
          {/* <button className={`${styles.btnTop}`} onClick={() => alert("Skip")}>
            Skip
          </button> */}
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
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2 style={{ color: "#bb1314", fontWeight: "bold" }}>
              Let’s Get to Know You Better
            </h2>
            <p className="text-muted">
              Answer a few quick questions to personalize your recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`${styles.insightSelection} question-btn btn w-100 mb-3 d-flex align-items-center p-3`}
                onClick={() => toggleSelection(category.title)}
                style={{
                  backgroundColor: selectedOptions.includes(category.title)
                    ? "#bb1314"
                    : "#fff",
                  color: selectedOptions.includes(category.title)
                    ? "#fff"
                    : "#333",
                }}
              >
                <img
                  src={productivityIcon}
                  alt="icon"
                  className={`${styles.insightImg} me-3`}
                />
                <span className={`${styles.insightImg} flex-grow-1`}>
                  {category.title}
                </span>
                {/* {selectedOptions.includes(category.title) && (
                  <span style={{ padding: "0 2px" }}>&#10003;</span>
                )} */}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-danger text-center mt-2">{error}</p>}

      {/* Next Button */}
      <div className="container text-center mt-4">
        <div className="row justify-content-center">
          <div className="col-auto">
            <button
              className={`${styles.footerMsg} btn-success`}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Insights;
