import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/books.module.css";
import BookCard from "./BookCard";
import Loader from "./Loader";
import axios from "axios";

function Books({ url, description, headings, pageId }) {
  const [booksData, setBooksData] = useState([]);
  const scrollContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        console.log("book get :: ", data);
        if (pageId === "home" || pageId === "bookdetail") {
          // In these pages, you are directly using the book data
          setBooksData(data);
        } else if (pageId === "favorites") {
          // For favorite page, extract the book data from each favorite object
          const favoriteBooks = data.map((fav) => fav.book);
          console.log("FAv books ", favoriteBooks)
          setBooksData(favoriteBooks);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [url, pageId]); // Re-fetch when the url or pageId changes

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className={styles.booksSection}>
      <div className={styles.header}>
        <h2>
          <span className={styles.recommended}>{headings[0]}</span>{" "}
          <span className={styles.forYou}>{headings[1]}</span>
        </h2>
        <p>{description}</p>
      </div>

      <button className={styles.scrollButton} onClick={scrollLeft}>
        {"<"}
      </button>

      <div className={styles.booksWrapper} ref={scrollContainerRef}>
        {loading ? (
          <Loader />
        ) : (
          booksData.map((book, index) => {
            return (
              <BookCard
                key={index}
                book={{
                  id: book._id,
                  title: book.title,
                  author: book.author,
                  description: book.description || "No description available", // Ensure a default description
                  imgSrc: book.cover_image_url,
                  time: book.time || "N/A", // Placeholder for time
                  rating: book.rating || "N/A", // Placeholder for rating
                  reviews: book.reviews || 0, // Placeholder for reviews count
                }}
              />
            );
          })
        )}
      </div>

      <button className={styles.scrollButton} onClick={scrollRight}>
        {">"}
      </button>
    </div>
  );
}

export default Books;
