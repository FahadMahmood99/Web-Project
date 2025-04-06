import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import {
  FaPaperPlane,
  FaRedo,
  FaMicrophone,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";
import styles from "../styles/aiSearch.module.css";

const getTimeSince = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
};

const AISearch = () => {
  const [timestamps, setTimestamps] = useState(
    () => Array(2).fill(Date.now()) // Initial timestamps for each message
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamps([...timestamps]); // Force re-render to update time display
    }, 60000);
    return () => clearInterval(interval);
  }, [timestamps]);

  const messages = [
    {
      sender: "You",
      senderImg: "images/user.png",
      message: "Lorem ipsum Dolor Sit Amet Consectetur. Commoda.",
      aiResponse: "Lorem ipsum AI response text here...",
      aiImg: "images/chat_ai_icon.png",
      books: [
        { imgSrc: "images/book1.jpeg", title: "You Can Heal Your Life" },
        { imgSrc: "images/book2.jpeg", title: "You Can Heal Your Life" },
      ],
    },
    {
      sender: "You",
      senderImg: "images/user.png",
      message: "Lorem ipsum Dolor Sit Amet Consectetur. Nec Commoda.",
      aiResponse: "Another AI response goes here...",
      aiImg: "images/chat_ai_icon.png",
      books: [
        { imgSrc: "images/book3.jpeg", title: "Unshakable" },
        { imgSrc: "images/book4.jpeg", title: "Unshakable" },
      ],
    },
  ];

  return (
    <Container className={styles.aiSearchPage}>
      {/* Header */}
      <Row>
        <Col className="text-center">
          <h2 className={styles.title}>
            👋 Flicker AI - Your Personalized Reading Assistant
          </h2>
          <p className={styles.subtitle}>
            Tell Me About Your Goal, Challenge, Or Problem, And I'll Recommend
            Summaries From Our Vast Library To Help You Grow.
          </p>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row className="justify-content-center my-3">
        <Col xs={10} md={8}>
          <div className={styles.searchBar}>
            <Form.Control type="text" placeholder="Write a prompt here..." />
            <FaMicrophone className={styles.micIcon} />
            <Button variant="danger">
              <FaPaperPlane />
            </Button>
          </div>
        </Col>
      </Row>

      {/* AI Suggests */}
      <Row className="justify-content-center">
        <Col xs={10} md={8}>
          <div className={styles.aiSuggests}>
            <span> AI Suggests</span>
          </div>
          <div className={styles.suggestions}>
            <span className={styles.suggestion}>
              Where to Improve My Public Speaking Skills
            </span>
            <span className={styles.suggestion}>
              How Can I Be More Productive At Work?
            </span>
            <span className={styles.suggestion}>
              What Are Some Strategies For Achieving Work-Life Balance?
            </span>
          </div>
        </Col>
      </Row>

      {/* Chat Messages */}
      {messages.map((msg, index) => (
        <Row key={index} className="justify-content-center">
          <Col xs={10} md={8}>
            {/* User Message */}
            <div className={styles.userMessage}>
              <img src={msg.senderImg} alt="User" className={styles.userIcon} />
              <div>
                <strong>{msg.sender}</strong>
                <span className={styles.timestamp}>
                  {" "}
                  • {getTimeSince(timestamps[index])}
                </span>
                <p>{msg.message}</p>
              </div>
            </div>

            {/* AI Response */}
            <Card className={styles.aiResponse}>
              <Card.Body>
                <Row>
                  <Row>
                    <Col xs={2} style={{ paddingRight: 0 }}>
                      <img src={msg.aiImg} alt="AI" className={styles.aiIcon} />
                    </Col>
                    <Col xs={8} style={{ paddingLeft: 0 }}>
                      <Row xs={2}>
                        <strong>Chat AI</strong>
                        <span className={styles.timestamp}>
                          {" "}
                          • {getTimeSince(timestamps[index])}
                        </span>
                      </Row>
                      {/* Book Results */}
                      <Row xs={10}>
                        <p>{msg.aiResponse}</p>
                        {msg.books.map((book, bookIndex) => (
                          <Row key={bookIndex} xs={10}>
                            <Card className={styles.bookCard}>
                              <Card.Img src={book.imgSrc} alt={book.title} />
                              {/* <Card.Body>
                                <Card.Text className={styles.bookTitle}>
                                  {book.title}
                                </Card.Text>
                              </Card.Body> */}
                            </Card>
                          </Row>
                        ))}
                      </Row>
                    </Col>
                    <Col xs={2} style={{ paddingLeft: 0 }}>
                      <div className={styles.likeDislike}>
                        <FaThumbsUp className={styles.likeIcon} />
                        <FaThumbsDown className={styles.dislikeIcon} />
                      </div>
                    </Col>
                  </Row>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default AISearch;
