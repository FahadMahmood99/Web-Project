import React from "react";
import styles from "../styles/Sidebar.module.css";
import flickerLogo from "../assets/flickerapp.svg";
import cancelIcon from "../assets/cancel_icon.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for small screens */}
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.show : ""}`}>
        {/* Close Button (Only for small screens) */}
        <button className={styles.closeBtn} onClick={toggleSidebar}>
          <img src={cancelIcon} alt="Close" />
        </button>

        {/* Logo */}
        <div className={styles.appLogo}>
          <img src={flickerLogo} alt="FlickerApp Logo" />
          <span className={styles.appName}>FlickerApp</span>
        </div>

        {/* Navigation */}
        <ul className={styles.menu}>
          <li className={styles.active}>
            <span className={styles.icon}>🏠</span>
            <span>Home</span>
          </li>
          <li>
            <span className={styles.icon}>📚</span>
            <span>Library</span>
          </li>
          <li>
            <span className={styles.icon}>🎧</span>
            <span>Audio Books</span>
          </li>
          <li>
            <span className={styles.icon}>⚙️</span>
            <span>Settings</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
