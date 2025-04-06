import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import stepperCategories from "../assets/categories-stepper.svg";
import growth from "../assets/growth.svg";
import goal from "../assets/goal.svg";
import leadership from "../assets/leadership.svg";
import proManagement from "../assets/project-management.svg";
import successImg from "../assets/success.svg";
import behaviouralPsy from "../assets/beh-psychology.svg";
import cogScience from "../assets/cog-science.svg";
import eq from "../assets/eq.svg";
import relationship from "../assets/relationship.svg";
import mentalhealth from "../assets/mental-health.svg";
import mindfulness from "../assets/mindfulness.svg";
import philosophy from "../assets/philosophy.svg";
import innerPeace from "../assets/inner-peace.svg";
import energy from "../assets/energy.svg";
import personal from "../assets/personal.svg";

const GenreSelection = () => {
  const categories = [
    { name: "Personal Growth", img: growth },
    { name: "Emotional Intelligence", img: eq },
    { name: "Mindfulness & Meditation", img: mindfulness },
    { name: "Leadership", img: leadership },
    { name: "Cognitive Science", img: cogScience },
    { name: "Personal Transformation", img: personal },
    { name: "Time Management", img: proManagement },
    { name: "Relationships", img: relationship },
    { name: "Philosophy & Spirituality", img: philosophy },
    { name: "Success Stories", img: successImg },
    { name: "Mental Health", img: mentalhealth },
    { name: "Energy Healing", img: energy },
    { name: "Goal Setting", img: goal },
    { name: "Behavioral Psychology", img: behaviouralPsy },
    { name: "Inner Peace", img: innerPeace },
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category.name)
        ? prev.filter((item) => item !== category.name)
        : [...prev, category.name]
    );
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-between min-vh-100"
      style={{ backgroundColor: "#fff9f6", padding: "40px 20px" }}
    >
      {/* Navigation */}
      <Row className="px-4 mb-4">
        <Col className="text-start">
          <button
            style={{
              background: "none",
              border: "none",
              color: "#bb1314",
              fontSize: "16px",
            }}
            onClick={() => navigate("/selectgenres")}
          >
            &lt; Back
          </button>
        </Col>
        <Col className="text-end">
          <button
            style={{
              background: "none",
              border: "none",
              color: "#bb1314",
              fontSize: "16px",
            }}
            onClick={() => alert("Skip")}
          >
            Skip
          </button>
        </Col>
      </Row>

      {/* Stepper Image */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} className="text-center">
          <img
            src={stepperCategories}
            alt="Progress Stepper"
            className="img-fluid"
            style={{ width: "90%", height: "auto", maxWidth: "600px" }}
          />
        </Col>
      </Row>

      {/* Header */}
      <Row className="justify-content-center text-center mb-4">
        <Col xs={12} md={8}>
          <h2 className="text-danger fw-bold">
            Follow Categories You’re Interested In
          </h2>
          <p className="text-muted">
            Choose categories within your selected genres to get the best
            recommendations tailored to your preferences.
          </p>
        </Col>
      </Row>

      {/* Category Grid */}
      <Row className="row-cols-1 row-cols-md-3 g-3 justify-content-center px-4">
        {categories.map((category, index) => (
          <Col key={index}>
            <Button
              className={`w-100 text-start py-2 px-3 ${
                selectedCategories.includes(category.name) ? "selected" : ""
              }`}
              onClick={() => toggleCategory(category)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: selectedCategories.includes(category.name)
                  ? "#bb1314"
                  : "#fff",
                color: selectedCategories.includes(category.name)
                  ? "#fff"
                  : "#333",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              }}
            >
              <img
                src={category.img || "https://via.placeholder.com/24"}
                alt={category.name}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <span style={{ fontSize: "14px", flex: 1 }}>{category.name}</span>
            </Button>
          </Col>
        ))}
      </Row>

      {/* Next Button */}
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Button
            style={{
              backgroundColor: "#bb1314",
              color: "#ffffff",
              padding: "10px 30px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={() => alert("Next")}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default GenreSelection;
