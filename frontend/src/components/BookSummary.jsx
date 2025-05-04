import React, { useState } from "react";
import styles from "../styles/booksummary.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const BookSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const summaryData = location.state?.summaryData;
  const id = location.state?.id;
  const aiData = location.state?.aiData;

  if (!summaryData) {
    return <div>No summary data available. Please go back and try again.</div>;
  }

  // Destructure the data and create the sections array from the summary fields
  const {
    cover_image_url,
    summary_section_1,
    summary_section_2,
    summary_section_3,
    summary_section_4,
    summary_section_5,
  } = summaryData;
  const sections = [
    { title: "Section 1:", section: summary_section_1 || aiData.section1 },
    { title: "Section 2:", section: summary_section_2 || aiData.section2 },
    { title: "Section 3:", section: summary_section_3 || aiData.section3 },
    { title: "Section 4:", section: summary_section_4 || aiData.section4 },
    { title: "Section 5: ", section: summary_section_5 || aiData.section5 },
  ];

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const currentSection = sections[currentSectionIndex];

  const handlePrev = () => {
    setCurrentSectionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentSectionIndex((prev) => Math.min(prev + 1, sections.length - 1));
  };

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      {/* Book Cover Section */}
      <div className={styles.bookCoverSection}>
        <img
          src={cover_image_url}
          alt="Image not available"
          className={styles.bookCover}
        />
      </div>

      {/* Book Title & Icons */}
      <div className={styles.bookHeader}>
        <h1 className={styles.bookTitle}>
          {summaryData.title || "Book Summary"}
        </h1>

      </div>

      {/* Summary Section */}
      <div className={styles.summaryContainer}>
        <div className={styles.summarySection}>
          <h3>
            {currentSectionIndex + 1}/{sections.length} –{" "}
            <span className={styles.sectionTitle}>{currentSection.title}</span>
          </h3>
          <div className={styles.summaryBox}>
            <p>{currentSection.section}</p>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className={styles.paginationControls}>
          <button
            onClick={handlePrev}
            disabled={currentSectionIndex === 0}
            className={styles.paginationButton}
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentSectionIndex === sections.length - 1}
            className={styles.paginationButton}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSummary;
