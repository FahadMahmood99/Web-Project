import React, { useState } from "react";
import styles from "../styles/booksummary.module.css";
import bookCover from "../assets/deepwork.png";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import sampleAudio from "../assets/sampleaudio.mp3";

const BookAudio = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button className={styles.backButton}> &larr; Back </button>

      {/* Book Cover */}
      <div className={styles.bookCoverSection}>
        <img src={bookCover} alt="Book Cover" className={styles.bookCover} />
      </div>

      {/* Summary */}
      <div className={styles.summaryContainer}>
        <div className={styles.summarySection}>
          <div className={styles.summaryBox}>
            <p>
              Lorem ipsum dolor sit amet consectetur. Semper quis venenatis leo
              sagittis fusce semper...
            </p>
          </div>
        </div>
      </div>

      {/* Pagination Bar */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          « First
        </button>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          ‹ Back
        </button>
        <span className={styles.pageNumber}>{currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Next ›
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Last »
        </button>
      </div>

      {/* Audio Player */}
      <div className={styles.audioPlayerContainer}>
        <AudioPlayer
          src={sampleAudio}
          autoPlay={false}
          showJumpControls={false}
          layout="stacked-reverse"
          customVolumeControls={[]}
          customAdditionalControls={[]}
          className={styles.audioPlayer}
        />
      </div>
    </div>
  );
};

export default BookAudio;
