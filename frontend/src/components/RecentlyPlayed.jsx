import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaPlay, FaPause } from "react-icons/fa";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "../styles/recentlyPlayed.module.css";

const booksData = [
  {
    title: "Predictably Irrational",
    author: "By Dan Ariely",
    imgSrc: "images/book1.jpeg",
    audioSrc: "audio/sample1.mp3",
    duration: "15 Mins",
    progress: "6:30 / 14:28",
    rating: "⭐️⭐️⭐️⭐️⭐️ (20)",
  },
  {
    title: "The Tipping Point",
    author: "By Malcolm Gladwell",
    imgSrc: "images/book2.jpeg",
    audioSrc: "audio/sample2.mp3",
    duration: "15 Mins",
    progress: "6:30 / 14:28",
    rating: "⭐️⭐️⭐️⭐️⭐️ (20)",
  },
  {
    title: "Games People Play",
    author: "By Eric Berne",
    imgSrc: "images/book3.jpeg",
    audioSrc: "audio/sample3.mp3",
    duration: "15 Mins",
    progress: "6:31 / 14:28",
    rating: "⭐️⭐️⭐️⭐️⭐️ (20)",
  },
];

function RecentlyPlayed() {
  return (
    <Container className={styles.recentlyPlayed}>
      <h2>
        <span className={styles.recently}>Recently</span>{" "}
        <span className={styles.played}>Played</span>
      </h2>
      <p className={styles.description}>
        Listen to your favorite books anytime, anywhere.
      </p>

      <Row className="justify-content-between">
        {booksData.map((book, index) => (
          <Col
            key={index}
            md={6}
            lg={4}
            className="d-flex justify-content-center"
          >
            <Card className={styles.bookCard}>
              <Row className="g-0">
                <Col xs={4} className="d-flex align-items-center">
                  <Card.Img
                    src={book.imgSrc}
                    alt={book.title}
                    className={styles.bookImage}
                  />
                </Col>
                <Col xs={8}>
                  <Card.Body className="p-2">
                    <Card.Title className={styles.bookTitle}>
                      {book.title}
                    </Card.Title>
                    <Card.Text className={styles.bookAuthor}>
                      {book.author}
                    </Card.Text>
                    <Card.Text className={styles.bookDuration}>
                      ⏳ {book.duration}
                    </Card.Text>
                    <Card.Text className={styles.bookRating}>
                      {book.rating}
                    </Card.Text>

                    {/* Audio Player */}
                    <div className={styles.audioPlayerContainer}>
                      <AudioPlayer
                        // src={sampleAudio}
                        autoPlay={false}
                        showJumpControls={false}
                        layout="stacked-reverse"
                        customVolumeControls={[]}
                        customAdditionalControls={[]}
                        className={styles.audioPlayer}
                      />
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default RecentlyPlayed;
