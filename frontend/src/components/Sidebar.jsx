import React from "react";
import styles from "../styles/Sidebar.module.css";
import flickerLogo from "../assets/flickerapp.svg";
import cancelIcon from "../assets/cancel_icon.png";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}

      <div className={`${styles.sidebar} ${isOpen ? styles.show : ""}`}>
        <button className={styles.closeBtn} onClick={toggleSidebar}>
          <img src={cancelIcon} alt="Close" />
        </button>

        <div className={styles.appLogo}>
          <img src={flickerLogo} alt="FlickerApp Logo" />
          <span className={styles.appName}>FlickerApp</span>
        </div>

        <ul className={styles.menu}>
          <li className={styles.active}>
            <Link to="/" onClick={toggleSidebar}>
              <span className={styles.icon}>🏠</span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/aisearch" onClick={toggleSidebar}>
              <span className={styles.icon}>🎧</span>
              <span>AI Search</span>
            </Link>
          </li>
          <li>
            <Link to="/favourites" onClick={toggleSidebar}>
              <span className={styles.icon}>❤️</span>
              <span>Favourites</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={toggleSidebar}>
              <span className={styles.icon}>⚙️</span>
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/logout" onClick={toggleSidebar}>
              <span className={styles.icon}>🚪</span>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;