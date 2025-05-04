import React, { useEffect, useState } from "react";
import styles from "../styles/botdcard.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BotdCard = () => {
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/bookdetails/${book.id}`);
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books/");
        if (res.data && res.data.length > 0) {
          setBook(res.data[0]); // Set first book
        }
      } catch (err) {
        console.error("Failed to fetch book of the day:", err);
      }
    };

    fetchBook();
  }, []);

  if (!book) return <p>Loading Book of the Day...</p>;

  return (
    <div className={styles.container} onClick={handleCardClick}>
      <div className={styles.header}>
        <h2>
          <span className={styles.recommended}>Book</span>{" "}
          <span className={styles.forYou}>Of The Day</span>
        </h2>
        <p>Check out our featured recommendation!</p>
      </div>
      <div className={`row ${styles.cardContainer}`} style={{ margin: 0 }}>
        {/* Book Cover */}
        <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
          <img
            src={book.cover_image_url}
            alt={book.title}
            className={styles.bookImage}
          />
        </div>

        {/* Book Details */}
        <div className="col-12 col-md-8">
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.author}>By {book.author}</p>
          <p className={styles.description}>
            {book.description || "No description available..."}{" "}
            {/* <span className={styles.seeMore}>See More</span> */}
          </p>

          {/* Time & Rating */}
          <div className={styles.info}>
            <span>⏳ {book.time || "N/A"}</span>
            <span>
              ⭐ {book.rating || "N/A"} ({book.reviews || 0})
            </span>
          </div>

          {/* Book Tags */}
          <div className={styles.tags}>
            {[book.genre, "Bestseller", "Recommended"]
              .filter(Boolean)
              .map((tag, index) => (
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
