import React, { useRef } from "react";
import styles from "../styles/collections.module.css";
import collection1 from "../assets/collection1.png";
import collection2 from "../assets/collection2.png";
import collection3 from "../assets/collection3.png";
import collection4 from "../assets/collection4.png";

const collectionsData = [
  {
    title: "The Path to Personal Growth",
    category: "Collection",
    description: "Unlock your potential with these transformative reads",
    image: collection1,
  },
  {
    title: "Efficiency Boosters",
    category: "Collection",
    description: "Master the art of getting things done efficiently",
    image: collection2,
  },
  {
    title: "Mindfulness & Wellbeing",
    category: "Collection",
    description: "Curated for mental wellness, balance, and self-care",
    image: collection3,
  },
  {
    title: "Money Mastery",
    category: "Collection",
    description: "Take control of your finances with these expert guides",
    image: collection4,
  },
];

const Collections = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2>
          <span className={styles.recommended}>Collections</span>{" "}
          <span className={styles.forYou}>For You</span>
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>

      {/* Scrollable Cards Section */}
      <div className={styles.collectionsWrapper} ref={scrollRef}>
        {collectionsData.map((collection, index) => (
          <div key={index} className={styles.card}>
            <img
              src={collection.image}
              alt={collection.title}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                {collection.title} <br />
                <span className={styles.cardCategory}>
                  {collection.category}
                </span>
              </h3>
              <p className={styles.cardDescription}>{collection.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className={styles.navButton} onClick={scrollLeft}>
        &lt;
      </button>
      <button className={styles.navButton} onClick={scrollRight}>
        &gt;
      </button>
    </div>
  );
};

export default Collections;
