import React, { useEffect, useState } from "react";
import styles from "../styles/bookdetails.module.css";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get book ID from URL params
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/books/${id}/favorite`
      );
      setIsFavorite(res.data.book.favorites === 1);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookRes = await axios.get(
          `http://localhost:5000/api/books/${id}`
        );
        setBook(bookRes.data);
        setIsFavorite(bookRes.data.favorites === 1); // Set initial favorite state
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  const handleSummaryFetch = async (type) => {
    try {
      if (type === "read") {
        console.log("Book data", book);
        navigate("/booksummary", {
          state: { summaryData: book, id: id },
        });
      } else if (type === "audio") {
        navigate("/bookaudio", {
          state: { audioData: response.data, id: id },
        });
      }
    } catch (error) {
      console.error(`Error fetching ${type} summary:`, error);
    }
  };

  return (
    <Container className={styles.bookContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className="align-items-start position-relative">
            <Col xs={12} lg={3} className="d-flex justify-content-center">
              <div className={styles.bookImageWrapper}>
                <img
                  src={book.cover_image_url} // direct HTTP URL
                  alt={book.title}
                  className={styles.bookImage}
                />
              </div>
            </Col>

            <Col
              xs={12}
              lg={9}
              className={`d-flex flex-column ${styles.bookInfoContainer}`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h2 className={styles.bookTitle}>{book.title}</h2>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className={styles.dropdownToggle}
                  >
                    Select Language
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>English</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <p className={styles.author}>By {book.author}</p>
              <p className={styles.description}>
                {book.description || "No description available."}
              </p>

              <div className={styles.metaInfo}>
                <span>📖 {book.time || "N/A"} Mins</span>{" "}
                <span>⭐ ({book.rating || "0"} Ratings)</span>
              </div>
            </Col>
          </Row>

          <div className={styles.whiteContainer}>
            <Row className="mt-4">
              <Col className="d-none d-lg-block"></Col>
              <Col className="d-flex justify-content-between">
                <div className="d-flex gap-2">
                  <Button
                    variant="dark"
                    className={styles.readButton}
                    onClick={() => handleSummaryFetch("read")}
                  >
                    Read
                  </Button>
                </div>
                <div className="d-flex gap-1">
                  <Button
                    variant="light"
                    className={styles.iconButton}
                    onClick={handleFavoriteClick}
                  >
                    <FaHeart
                      style={{
                        color: isFavorite ? "red" : "white",
                        stroke: "red",
                        strokeWidth: "30",
                        fill: isFavorite ? "red" : "white",
                      }}
                    />
                  </Button>
                  <Button variant="light" className={styles.iconButton}>
                    <FaShareAlt />
                  </Button>
                </div>
              </Col>
            </Row>

            <Row className="my-3 justify-content-center">
              <Col lg={6} className="d-none d-lg-block"></Col>
              <Col
                xs={11}
                lg={5}
                className="border-bottom border-secondary mx-auto"
              ></Col>
            </Row>

            <Row className="mt-3">
              <Col className="d-none d-lg-block"></Col>
              <Col className="d-flex flex-wrap gap-2 justify-content-center">
                {(book.genres || [book.genre])?.map((genre, index) => (
                  <span key={index} className={styles.tag}>
                    {genre}
                  </span>
                ))}
              </Col>
            </Row>

            <Row className="mt-4">
              <Col>
                <h4 className={styles.sectionTitle}>Introduction</h4>
                <p
                  className={styles.introductionText}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {book.summary_section_1 || "No introduction available."}
                </p>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default BookDetails;
