import React from "react";
import styles from "../styles/booksummary.module.css";
import bookCover from "../assets/deepwork.png"; // Replace with actual image

// Dummy Data for Summary Sections
const summarySections = [
  {
    sectionNumber: 1,
    title: "INTRODUCTION",
    content:
      "Lorem ipsum dolor sit amet consectetur. Semper quis venenatis leo sagittis fusce semper...",
  },
  {
    sectionNumber: 2,
    title: "POWER OF THOUGHTS",
    content:
      "Metus sit aliquet aliquam nunc mi. Et est malesuada ut dolor et vel sit...",
  },
  {
    sectionNumber: 3,
    title: "SELF-HEALING",
    content:
      "Porta ante aliquam mauris neque nibh risus morbi volutpat arcu...",
  },
  {
    sectionNumber: 4,
    title: "FORGIVENESS & GROWTH",
    content:
      "Aliquet sit amet arcu tellus in risus venenatis at sodales at...",
  },
];

const BookSummary = () => {
  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button className={styles.backButton}> &larr; Back </button>

      {/* Book Cover Section */}
      <div className={styles.bookCoverSection}>
        <img src={bookCover} alt="Book Cover" className={styles.bookCover} />
      </div>

      {/* Book Title & Icons */}
      <div className={styles.bookHeader}>
        <h1 className={styles.bookTitle}>You Can Heal Your Life</h1>
        <div className={styles.icons}>
          <span className={styles.icon}>❤️</span> {/* Like Icon */}
          <span className={styles.icon}>🔗</span> {/* Share Icon */}
        </div>
      </div>

      {/* Summary Sections */}
      <div className={styles.summaryContainer}>
        {summarySections.map((section, index) => (
          <div key={index} className={styles.summarySection}>
            <h3>
              {index + 1}/{summarySections.length} –{" "}
              <span className={styles.sectionTitle}>
                SECTION {section.sectionNumber}: {section.title}
              </span>
            </h3>
            <div className={styles.summaryBox}>
              <p>{section.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mark as Done Button */}
      <button className={styles.doneButton}>Mark as Done</button>
    </div>
  );
};

export default BookSummary;
