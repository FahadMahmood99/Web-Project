import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import flickericon from "../assets/flicker-footer.png";
import common from "../styles/common.module.css";
import styles from "../styles/footer.module.css";

function Footer() {
  return (
    <footer className={`${styles.footerSection} text-white`}>
      <div className="container">
        <div className="row">
          {/* Flicker description */}
          <div className="col-md-4 col-sm-12 mb-4 text-center text-md-start">
            <img
              src={flickericon}
              alt="Flicker Icon"
              className={`${styles.flickerIcon} px-3`}
            />
            <p>
              Flicker App is a platform for busy readers, offering curated book
              summaries and personalized recommendations. Whether you prefer to
              read or listen, we help you learn and explore faster.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-2">
              <a href="/#" className="text-white text-decoration-none">
                <FaFacebookF />
              </a>
              <a href="/#" className="text-white text-decoration-none">
                <FaLinkedinIn />
              </a>
              <a href="/#" className="text-white text-decoration-none">
                <FaTwitter />
              </a>
              <a href="/#" className="text-white text-decoration-none">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-md-2 col-sm-6 mb-4 text-center text-md-start">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/#" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/#" className="text-white text-decoration-none">
                  Features
                </a>
              </li>
              <li>
                <a href="/#" className="text-white text-decoration-none">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/#" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Important links */}
          <div className="col-md-2 col-sm-6 mb-4 text-center text-md-start">
            <h5>Important Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/#" className="text-white text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/#" className="text-white text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/#" className="text-white text-decoration-none">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe section */}
          <div className="col-md-4 col-sm-12 mb-4 text-center text-md-start">
            <h5>Subscribe</h5>
            <p>
              Stay updated with the latest AI-curated content and special
              offers.
            </p>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
              />
              <button className="btn btn-light">→</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div
        className="container"
        style={{
          marginTop: "20px",
        }}
      >
        <div
          className={`d-flex flex-column flex-md-row justify-content-between align-items-center ${styles.footerLine}`}
        >
          <p className="mb-3 mb-md-0">
            © 2024 Flicker App. All Rights Reserved.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <a href="/#" className="text-white text-decoration-none">
              Privacy
            </a>
            <span>|</span>
            <a href="/#" className="text-white text-decoration-none">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
