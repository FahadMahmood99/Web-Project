import React from "react";
import styles from "../styles/newfooter.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "../assets/flicker-footer-new.png";

const NewFooter = () => {
  return (
    <footer className={`${styles.footer} py-3`}>
      <Container>
        <Row className="align-items-center">
          {/* Left Side: Logo & Name */}
          <Col xs={12} md={4} className="d-flex align-items-center">
            <img
              src={logo} // Replace with your logo path
              alt="Flicker Logo"
              className={styles.logo}
            />
            <span className={`ms-2 fw-bold ${styles.brand}`}>FlickerApp</span>
          </Col>

          {/* Center: Links */}
          <Col xs={12} md={4} className="text-center">
            <a href="/" className={styles.link}>
              Privacy Policy
            </a>{" "}
            |
            <a href="/" className={styles.link}>
              {" "}
              Terms of Service
            </a>{" "}
            |
            <span className="text-muted">
              {" "}
              © 2024 Flicker. All Rights Reserved
            </span>
          </Col>

          {/* Right Side: Social Icons */}
          <Col xs={12} md={4} className="text-md-end text-center">
            <FaFacebookF className={styles.icon} />
            <FaLinkedinIn className={styles.icon} />
            <FaYoutube className={styles.icon} />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default NewFooter;
