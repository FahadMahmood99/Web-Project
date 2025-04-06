import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { FaClock } from "react-icons/fa";
import styles from "../styles/bookcard.module.css";

function BookCard({ book }) {
  return (
    <Card className={styles.bookCard}>
      <div className={styles.cardDiv}>
        <Card.Img
          src={book.imgSrc}
          alt={book.title}
          className={styles.cardImg}
        />
      </div>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>{book.title}</Card.Title>
        <Card.Subtitle className={`${styles.cardSubTitle} mb-1 text-muted`}>
          {book.author}
        </Card.Subtitle>
        <Card.Text className={styles.cardText}>{book.description}</Card.Text>
        <div className={styles.bookFooter}>
          <div className={styles.bookTime}>
            <FaClock className={styles.icon} />
            <span>{book.time}</span>
          </div>
          <div className={styles.bookRating}>
            <span className={styles.ratingWrapper}>
              <span className={styles.rating}>★ {book.rating}</span>
              <p>{book.reviews}</p>
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
