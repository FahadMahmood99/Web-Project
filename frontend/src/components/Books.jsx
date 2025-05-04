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
        console.log("API response:", data);
  
        if (pageId === "home" || pageId === "bookdetail") {
          setBooksData(data);
        } else if (pageId === "favorites") {
          // No need to extract `book`—data is already the books array
          setBooksData(data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [url, pageId]);
  
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
        ) : booksData.length > 0 ? (
          booksData
            .filter((book) => book?._id) // Ensure book has an `_id`
            .map((book) => (
              <BookCard
                key={book._id} // Use `_id` instead of index
                book={{
                  id: book._id,
                  title: book.title,
                  author: book.author,
                  description: book.description || "No description available",
                  imgSrc: book.cover_image_url,
                }}
              />
            ))
        ) : (
          <p>No books found.</p>
        )}
      </div>

      <button className={styles.scrollButton} onClick={scrollRight}>
        {">"}
      </button>
    </div>
  );
}

export default Books;