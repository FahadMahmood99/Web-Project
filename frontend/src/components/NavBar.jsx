import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import searchIcon from "../assets/search_icon.png"; // Custom search icon
import cancelIcon from "../assets/cancel_icon.png"; // Custom cancel icon
import menuIcon from "../assets/menu_icon.png";
import flickerLogo from "../assets/flickerapp.svg";

const Navbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    alert(`Search results for: ${searchQuery}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsFocused(false);
  };

  return (
    <nav className={styles.navbar}>
      {/* Keep only the menuIcon button for toggling sidebar */}
      <span className={styles.menuToggle} onClick={toggleSidebar}>
        <img src={flickerLogo} alt="icon" className={styles.menuIcon} />
      </span>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        {/* Search/Clear Icon (Left Side) */}
        <span className={styles.icon} onClick={isFocused ? clearSearch : null}>
          <img
            src={isFocused ? cancelIcon : searchIcon}
            alt="icon"
            className={styles.iconImage}
          />
        </span>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => searchQuery === "" && setIsFocused(false)}
          className={styles.searchInput}
        />

        {/* Search Button (Covers Entire Height) */}
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
      <span className={styles.menuToggle} onClick={toggleSidebar}>
        <img src={menuIcon} alt="icon" className={styles.menuIcon} />
      </span>
    </nav>
  );
};

export default Navbar;
