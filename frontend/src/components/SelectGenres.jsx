import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import stepperGenres from "../assets/genres-stepper.svg";
import redTick from "../assets/red-tick.svg";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../styles/onboarding.module.css";
import api from "../network/api";

const SelectGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [limitMessage, setLimitMessage] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const dropdownRef = useRef();
  const buttonRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get("/content/genres");
        console.log("RESPONSE FROM GENRE:", response.data);
        setGenres(response.data || []);
      } catch (error) {
        console.error(
          "Error fetching genres:",
          error.response?.data || error.message
        );
      }
    };

    const storedGenres = JSON.parse(localStorage.getItem("USER_GENRES")) || [];
    setSelectedGenres(storedGenres); // Set as names directly

    Promise.all([fetchGenres()]).finally(() => setLoading(false));
  }, []);

  const handleGenreClick = (genre) => {
    let updatedGenres;

    if (selectedGenres.includes(genre)) {
      updatedGenres = selectedGenres.filter((item) => item !== genre);
    } else if (selectedGenres.length < 5) {
      updatedGenres = [...selectedGenres, genre];
    } else {
      setLimitMessage("You can select up to 5 genres only.");
      return;
    }

    localStorage.setItem("USER_GENRES", JSON.stringify(updatedGenres)); // Update localStorage first
    setSelectedGenres(updatedGenres);
    setLimitMessage(""); // Clear message
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    if (!dropdownOpen) {
      createPopper(buttonRef.current, dropdownRef.current, {
        placement: "bottom-start",
      });
    }
  };

  const handleDropdownSelect = (genre) => {
    let updatedGenres;

    if (selectedGenres.includes(genre)) {
      setLimitMessage(`"${genre}" is already selected.`);
      return;
    } else if (selectedGenres.length < 5) {
      updatedGenres = [...selectedGenres, genre];
    } else {
      setLimitMessage("You can select up to 5 genres only.");
      return;
    }

    setSelectedGenres(updatedGenres);
    localStorage.setItem("USER_GENRES", JSON.stringify(updatedGenres));
    setLimitMessage(""); // Clear message

    setDropdownValue(""); // Reset dropdown
    setDropdownOpen(false); // Close dropdown
  };

  const handleNext = async () => {
    if (selectedGenres.length < 3) {
      setLimitMessage("Please select at least 3 genres.");
      return;
    }

    setLimitMessage("");

    const genreObjects = selectedGenres
      .map((genreName) => {
        const genre = genres.find((g) => g.name === genreName);
        return genre ? { id: parseInt(genre.id, 10), name: genre.name } : null;
      })
      .filter((g) => g !== null);

    const payload = genreObjects;

    console.log("Final Payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await api.put("/auth/user/genres", payload);
      console.log("Genres updated successfully:", response.data);
      navigate("/goals", { state: { from: "/selectgenres" } });
    } catch (error) {
      console.error(
        "Error updating genres:",
        error.response?.data || error.message
      );
      setLimitMessage("Failed to save genres. Please try again.");
    }
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
            onClick={() => navigate("/onboarding")}
          >
            &lt; Back
          </button>
        </Col>
        <Col className="text-end">
          <button
            className={`${styles.btnTop}`}
            onClick={() => navigate("/insights")}
          >
            Skip
          </button>
        </Col>
      </Row>

      {/* Stepper Image */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} className="text-center">
          <img
            src={stepperGenres}
            alt="Progress Stepper"
            className={`${styles.stepperImg} img-fluid`}
          />
        </Col>
      </Row>

      {/* Header */}
      <Row className="justify-content-center text-center mb-4">
        <Col xs={12} md={8}>
          <h2 style={{ color: "#bb1314", fontWeight: "bold" }}>
            Choose Your Favorite Genres
          </h2>
          <p style={{ color: "#555555" }}>
            You can select up to 5 genres at the moment.
          </p>
        </Col>
      </Row>

      {/* Dropdown (Mobile View) */}
      <div
        className="d-block d-md-none mb-3"
        style={{ position: "relative", margin: "0 15px" }}
      >
        <button
          ref={buttonRef}
          className={`${styles.mobileDropDown} btn btn-light w-100 text-start dropdown-toggle`}
          onClick={toggleDropdown}
        >
          {dropdownValue || "Select a genre"}
        </button>

        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className={`${styles.mobileSelectedItems} dropdown-menu show w-100`}
          >
            {genres.map((genre, index) => (
              <button
                key={index}
                className="dropdown-item w-100 text-start"
                style={{
                  padding: "10px",
                  color: "#bb1314",
                }}
                onClick={() => handleDropdownSelect(genre.name)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}

        <div className="mt-3">
          {selectedGenres.map((genre, index) => (
            <button
              key={index}
              className={`${styles.mobileItems} btn btn-light border me-2 mt-2`}
              onClick={() => {
                const updatedGenres = selectedGenres.filter(
                  (item) => item !== genre
                );
                setSelectedGenres(updatedGenres);
                localStorage.setItem(
                  "USER_GENRES",
                  JSON.stringify(updatedGenres)
                ); // Update localStorage
              }}
            >
              {genre} &times;
            </button>
          ))}
        </div>

        {limitMessage && (
          <div
            className="text-danger mt-2"
            style={{ fontSize: "14px", fontWeight: "bold" }}
          >
            {limitMessage}
          </div>
        )}
      </div>

      {/* Genres Grid (Desktop) */}
      <div className="d-none d-md-block">
        <div className="d-flex flex-wrap justify-content-center">
          {genres.map((genre, index) => (
            <div key={index} className={`${styles.desktopGenreBody}`}>
              <button
                style={{
                  border: selectedGenres.includes(genre.name)
                    ? "2px solid #bb1314"
                    : "1px solid #ddd",
                }}
                className={`${styles.desktopItems}`}
                onClick={() => handleGenreClick(genre.name)}
              >
                {genre.name}
              </button>
              {selectedGenres.includes(genre.name) && (
                <img
                  src={redTick}
                  alt="Selected"
                  className={`${styles.desktopSelectedItems}`}
                />
              )}
            </div>
          ))}
        </div>
        {limitMessage && (
          <div className={`${styles.error} text-danger mt-2`}>
            {limitMessage}
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-center text-muted mb-4">
        This will help us recommend summaries that match your interests.
      </p>

      <div className="text-center">
        <button
          className={`${styles.footerMsg} btn-success`}
          onClick={() => handleNext()}
        >
          Next
        </button>
      </div>
    </Container>
  );
};

export default SelectGenres;
