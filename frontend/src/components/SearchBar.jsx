import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Navbar.module.css";
import searchIcon from "../assets/search_icon.png";
import cancelIcon from "../assets/cancel_icon.png";
import { Row, Col } from "react-bootstrap";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchResults();
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchResults = async () => {
    setLoading(true);
    setShowDropdown(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/books/search?q=${searchQuery}`
      );
      const data = response.data;
      console.log("Search ", data);
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }
    setLoading(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsFocused(false);
    setShowDropdown(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.searchContainer} ref={dropdownRef}>
      <span className={styles.icon} onClick={isFocused ? clearSearch : null}>
        <img
          src={isFocused ? cancelIcon : searchIcon}
          alt="icon"
          className={styles.iconImage}
        />
      </span>

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          if (searchQuery.trim() !== "") {
            if (searchResults.length > 0) {
              setShowDropdown(true);
            } else {
              fetchResults();
            }
          }
        }}
        className={styles.searchInput}
      />

      <button className={styles.searchButton} onClick={() => {}}>
        Search
      </button>

      {showDropdown && (
        <div className={styles.searchDropdown}>
          {loading ? (
            <Loader />
          ) : searchResults.length > 0 ? (
            searchResults.map((item, idx) => {
              const imageUrl = item.cover_image_url;
              return (
                <div
                  key={idx}
                  className={styles.dropdownItem}
                  onClick={() => {
                    console.log("Selected:", item);
                    navigate(`/bookdetails/${item._id}`);
                    clearSearch();
                  }}
                >
                  <Row>
                    <Col sm={4}>
                      <img
                        src={imageUrl}
                        alt="Book cover"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                    </Col>
                    <Col sm={8}>
                      <div>
                        <strong>{item.title}</strong>
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "#555" }}>
                        {item.author || "Unknown Author"}
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })
          ) : (
            <div className={styles.dropdownItem}>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
