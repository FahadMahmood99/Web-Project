import React from "react";
import styles from "../styles/bookdetails.module.css"; // Import CSS Module
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { FaHeart, FaShareAlt } from "react-icons/fa"; // Import Icons
import bookCover from "../assets/deepwork.png";

const BookDetails = () => {
  return (
    <Container className={styles.bookContainer}>
      <Row className="align-items-start position-relative">
        {/* Book Image */}
        <Col xs={12} lg={3} className="d-flex justify-content-center">
          <div className={styles.bookImageWrapper}>
            <img
              src={bookCover}
              alt="Book Cover"
              className={styles.bookImage}
            />
          </div>
        </Col>

        {/* Book Info */}
        <Col xs={12} lg={9} className={`d-flex flex-column ${styles.bookInfoContainer}`}>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className={styles.bookTitle}>You Can Heal Your Life</h2>
            <Dropdown>
              <Dropdown.Toggle variant="light" className={styles.dropdownToggle}>
                Select Language
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Spanish</Dropdown.Item>
                <Dropdown.Item>French</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <p className={styles.author}>By Louise Hay</p>
          <p className={styles.description}>
            Focuses on the power of positive thinking and self-love to transform health and well-being.
          </p>

          {/* Meta Info */}
          <div className={styles.metaInfo}>
            <span>📖 15 Mins</span> <span>⭐ (20 Ratings)</span>
          </div>
        </Col>
      </Row>

      {/* White Container */}
      <div className={styles.whiteContainer}>
        <Row className="mt-4">
            <Col className="d-none d-lg-block"></Col>
          <Col className="d-flex justify-content-between">
            <div className="d-flex gap-2">
              <Button variant="dark" className={styles.readButton}>Read</Button>
              <Button variant="secondary" className={styles.readButton}>Audio</Button>
            </div>
            <div className="d-flex gap-1">
              <Button variant="light" className={styles.iconButton}><FaHeart /></Button>
              <Button variant="light" className={styles.iconButton}><FaShareAlt /></Button>
            </div>
          </Col>
        </Row>

        {/* Divider Line */}
        <Row className="my-3 justify-content-center">
        <Col lg={6} className="d-none d-lg-block"></Col>
          <Col xs={11} lg={5} className="border-bottom border-secondary mx-auto"></Col>
        </Row>

        {/* Tags Section */}
        <Row className="mt-3">
        <Col className="d-none d-lg-block"></Col>
          <Col className="d-flex flex-wrap gap-2 justify-content-center">
            <span className={styles.tag}>Self-Help</span>
            <span className={styles.tag}>Personal Development</span>
            <span className={styles.tag}>Spirituality</span>
            <span className={styles.tag}>Psychology</span>
            <span className={styles.tag}>Wellness</span>
          </Col>
        </Row>

        {/* Introduction Section */}
        <Row className="mt-4">
          <Col>
            <h4 className={styles.sectionTitle}>Introduction</h4>
            <p className={styles.introductionText}>
              <strong>You Can Heal Your Life</strong> by Louise Hay is a transformative self-help book that explores the connection between the mind and body, emphasizing the power of positive thinking and self-love.
            </p>
            <p className={styles.introductionText}>
              Through affirmations, visualization, and changing limiting beliefs, the book offers practical tools for healing and personal growth.
            </p>
            <Button variant="danger" className={styles.buyButton}>🛒 Buy on Amazon</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default BookDetails;
