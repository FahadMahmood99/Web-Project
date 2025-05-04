import React from "react";
import styles from "../styles/Navbar.module.css";
import menuIcon from "../assets/menu_icon.png";
import flickerLogo from "../assets/flickerapp.svg";
import SearchBar from "./SearchBar";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className={styles.navbar}>
      <span className={styles.menuToggle} onClick={toggleSidebar}>
        <img src={flickerLogo} alt="icon" className={styles.menuIcon} />
      </span>
      <SearchBar />
      <span className={styles.menuToggle} onClick={toggleSidebar}>
        <img src={menuIcon} alt="icon" className={styles.menuIcon} />
      </span>
    </nav>
  );
};

export default Navbar;
