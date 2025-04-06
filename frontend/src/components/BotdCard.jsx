import React from "react";
import styles from "../styles/botdcard.module.css";
// import bookCover from "../assets/deep-work.jpg"; // Add the actual book image
import bookCover from "../assets/deepwork.png";

const BotdCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>
          <span className={styles.recommended}>Book</span>{" "}
          <span className={styles.forYou}>Of The Day</span>
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <div className={`row ${styles.cardContainer}`} style={{ margin: 0 }}>
        {/* Book Cover */}
        <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
          <img src={bookCover} alt="Deep Work" className={styles.bookImage} />
        </div>

        {/* Book Details */}
        <div className="col-12 col-md-8">
          <h3 className={styles.title}>Deep Work</h3>
          <p className={styles.author}>By Cal Newport</p>
          <p className={styles.description}>
            Deep Work highlights the value of intense, focused work in achieving
            greater productivity and mastering complex tasks...{" "}
            <span className={styles.seeMore}>See More</span>
          </p>

          {/* Time & Rating */}
          <div className={styles.info}>
            <span>⏳ 15 Mins</span>
            <span>⭐⭐⭐⭐☆ (20)</span>
          </div>

          {/* Book Tags */}
          <div className={styles.tags}>
            {[
              "Non-Fiction",
              "Psychology",
              "Self-Help",
              "Productivity",
              "Personal Development",
            ].map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotdCard;
