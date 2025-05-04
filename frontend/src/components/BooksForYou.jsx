import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/books.module.css";
import BookCard from "./BookCard";

function BooksForYou() {
  const [booksByGenre, setBooksByGenre] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [genres, setGenres] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/books/")
      .then((res) => res.json())
      .then((data) => {
        const groupedBooks = {};
        console.log("data for grp ", data);
        data.forEach((book) => {
          const genre = book.genre || "Unknown";
          if (!groupedBooks[genre]) {
            groupedBooks[genre] = [];
          }
          groupedBooks[genre].push(book);
        });

        const genreList = Object.keys(groupedBooks);
        setBooksByGenre(groupedBooks);
        setGenres(genreList);
        setSelectedCategory(genreList[0] || "Unknown");
        console.log("grp books ", groupedBooks);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

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
          <span className={styles.recommended}>Books</span>{" "}
          <span className={styles.forYou}>For You</span>
        </h2>
        <p>Discover the best books curated for you.</p>
      </div>

      {/* Genre Buttons */}
      <div className={styles.categories}>
        {genres.map((genre, index) => (
          <Button
            key={index}
            variant={selectedCategory === genre ? "danger" : "outline-danger"}
            className={styles.categoryButton}
            onClick={() => setSelectedCategory(genre)}
          >
            {genre}
          </Button>
        ))}
      </div>

      {/* Book Cards */}
      <button className={styles.scrollButton} onClick={scrollLeft}>
        {"<"}
      </button>

      <div className={styles.booksWrapper} ref={scrollContainerRef}>
        {booksByGenre[selectedCategory]?.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>

      <button className={styles.scrollButton} onClick={scrollRight}>
        {">"}
      </button>
    </div>
  );
}

export default BooksForYou;
