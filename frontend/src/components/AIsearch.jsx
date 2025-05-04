import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";
import styles from "../styles/aiSearch.module.css";

const AISearch = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!input.includes(";")) {
      alert("Please enter input in the format: Book Title; Author Name");
      return;
    }

    const [bookName, authorName] = input.split(";").map((s) => s.trim());
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/openai/search-book",
        { bookName, authorName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiResponse = res.data;
      // Navigate to BookSummary and pass aiResponse as state
      navigate("/booksummary", {
        state: {
          summaryData: {}, // fallback in case book is not in DB
          aiData: aiResponse,
        },
      });
    } catch (err) {
      console.error("AI Search failed", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <Container className={styles.aiSearchPage}>
      <Row>
        <Col className="text-center">
          <h2 className={styles.title}>
            👋 Flicker AI - Your Personalized Reading Assistant
          </h2>
          <p className={styles.subtitle}>
            Tell Me About Your Goal, Challenge, Or Problem, And I'll Recommend
            Summaries From Our Vast Library To Help You Grow.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center my-3">
        <Col xs={10} md={8}>
          <div className={styles.searchBar}>
            <Form.Control
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter book title and author, e.g. Atomic Habits; James Clear"
            />
            <FaMicrophone className={styles.micIcon} />
            <Button variant="danger" onClick={handleSubmit}>
              <FaPaperPlane />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AISearch;
