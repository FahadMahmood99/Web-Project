import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/flickerapp.svg";
import styles from "../styles/navigation.module.css";
import common from "../styles/common.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navigatebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <Navbar
      expanded={expanded}
      expand="lg" // Ensure it collapses only for 'lg' and smaller devices
      className={`${common.wrapperDiv}`}
    >
      <Container fluid style={{ padding: 0 }}>
        {/* Brand Section */}
        <div className="d-flex justify-content-start align-items-center">
          <img className={`${styles.navIcon}`} src={logo} alt="" />
          <Navbar.Brand
            href="#"
            className={`${styles.navIconText} ${styles.navbarBrand}`}
          >
            Flicker App
          </Navbar.Brand>
        </div>

        {/* Collapsible Toggle */}
        <Navbar.Toggle
          aria-controls="navbarScroll"
          className={`${styles.navbarToggler}`}
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />

        {/* Navbar Links Section */}
        <Navbar.Collapse
          id="navbarScroll"
          className={`${styles.navbarCollapse}`}
        >
          <div
            className={`${styles.navBarDiv} d-flex justify-content-center w-100 flex-wrap`}
          >
            <Nav className="mx-auto">
              <Nav.Link
                href="#about"
                className={`${styles.navLink} px-3`}
                onClick={() => setExpanded(false)}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                href="#genre"
                className={`${styles.navLink} px-3`}
                onClick={() => setExpanded(false)}
              >
                Popular Genre
              </Nav.Link>
              <Nav.Link
                href="#testimonials"
                className={`${styles.navLink} px-3`}
                onClick={() => setExpanded(false)}
              >
                Testimonials
              </Nav.Link>
              <Nav.Link
                href="#collections"
                className={`${styles.navLink} px-3`}
                onClick={() => setExpanded(false)}
              >
                Top Collections
              </Nav.Link>
              <Nav.Link
                href="#pricing"
                className={`${styles.navLink} px-3`}
                onClick={() => setExpanded(false)}
              >
                Pricing
              </Nav.Link>
              <Nav.Link
                href="#faq"
                className={`${styles.navLink} px-3`}
                onClick={() => setExpanded(false)}
              >
                FAQ
              </Nav.Link>
            </Nav>
          </div>

          {/* Buttons Section */}
          <div className="d-none d-lg-flex justify-content-center align-items-center">
            <Button className={`${styles.navBtn1} me-2`} onClick={handleLogin}>
              Log In
            </Button>
            <Button className={`${styles.navBtn2}`} onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>

          {/* Centered buttons for small screens */}
          <div className="d-flex d-lg-none justify-content-center w-100 mt-2">
            <Button
              variant="outline-success"
              className={`${styles.navBtn1} me-2`}
              onClick={handleLogin}
            >
              Log In
            </Button>
            <Button
              variant="outline-success"
              className={`${styles.navBtn2}`}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigatebar;
