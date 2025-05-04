import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavBar";
import styles from "../styles/home.module.css";
import Books from "../components/Books";
import BotdCard from "../components/BotdCard";
import Collections from "../components/Collections";
import BooksForYou from "../components/BooksForYou";
import NewFooter from "../components/NewFooter";

function HomePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768); // Sidebar open by default for large screens

  // Adjust sidebar visibility on window resize
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className={styles.layout}>
      {/* Top Navbar */}
      <Navbar toggleSidebar={toggleSidebar} className={styles.navbar} />

      <div className={styles.mainContainer}>
        {/* Sidebar (Visible on large screens, toggled on small screens) */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          className={styles.sidebar}
        />

        {/* Main Content Area */}
        <div className={styles.content}>
        <Books
            // url="sample"
            url="http://localhost:5000/api/books/"
            description="Lorem ipsum dolor sit amet consectetur."
            headings={["Recommended", "For You"]}
            pageId={"home"}
          />
          <BotdCard />
          <BooksForYou />
          <NewFooter />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
