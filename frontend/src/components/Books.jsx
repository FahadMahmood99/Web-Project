import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { FaClock } from "react-icons/fa";
import common from "../styles/common.module.css";
import styles from "../styles/books.module.css";
import sampleImg from "../assets/sample.jpg";
import BookCard from "./BookCard";

function Books({ url, description, headings }) {
  // Books data for each category
  const booksData = [
    {
      title: "The Courage To Be Disliked",
      author: "By Ichiro Kishimi",
      description:
        "Balances efficiency with well-being for happy, fulfilling achievement",
      // imgSrc: "images/book1.jpeg",
      imgSrc: sampleImg,
      time: "15 Mins",
      rating: "4.5",
      reviews: "(20)",
      color: "#ffe8b3",
    },
    {
      title: "The Power of Now",
      author: "By Eckhart Tolle",
      description:
        "A guide to spiritual enlightenment through the power of living in the present moment.",
      imgSrc: "images/power_of_now.jpg",
      time: "18 Mins",
      rating: "4.7",
      reviews: "(15)",
      color: "#98DAE4",
    },
    {
      title: "You Can Heal Your Life",
      author: "By Louise Hay",
      description:
        "Focuses on the power of positive thinking and self-love to transform health and well-being",
      imgSrc: "images/book3.png",
      time: "15 Mins",
      rating: "4.8",
      reviews: "(20)",
      color: "#EDD8B9",
    },
    {
      title: "Smarter Faster Better",
      author: "By Charles Duhigg",
      description:
        "Better focus on improving productivity through better choices and mental focus",
      imgSrc: "images/book4.jpg",
      time: "15 Mins",
      rating: "4.0",
      reviews: "(20)",
      color: "#FF9458",
    },
    {
      title: "Thinking, Fast and Slow",
      author: "By Daniel Kahneman",
      description:
        "Explores the two systems of thinking that drive our decisions: fast, intuitive thinking and slow, rational thinking.",
      imgSrc: "images/thinking_fast_slow.jpg",
      time: "22 Mins",
      rating: "4.6",
      reviews: "(25)",
      color: "#EAECEC",
    },
    {
      title: "Influence: The Psychology of Persuasion",
      author: "By Robert B. Cialdini",
      description:
        "Reveals the powerful psychological principles behind why people say yes.",
      imgSrc: "images/influence.jpg",
      time: "17 Mins",
      rating: "4.7",
      reviews: "(30)",
      color: "#265E7F",
    },
    {
      title: "The Power of Habit",
      author: "By Charles Duhigg",
      description:
        "Explores how habits work and how they can be changed to improve your life.",
      imgSrc: "images/power_of_habit.jpg",
      time: "18 Mins",
      rating: "4.5",
      reviews: "(20)",
      color: "#F7EA8F",
    },
    {
      title: "Man’s Search for Meaning",
      author: "By Viktor E. Frankl",
      description:
        "Chronicles a Holocaust survivor's lessons on finding meaning even in suffering.",
      imgSrc: "images/mans_search_meaning.jpg",
      time: "16 Mins",
      rating: "4.9",
      reviews: "(40)",
      color: "#717489",
    },
    {
      title: "Start with Why",
      author: "By Simon Sinek",
      description:
        "Discover the power of knowing your 'why' to inspire leaders and organizations towards long-term success.",
      imgSrc: "images/start_with_why.jpg",
      time: "20 Mins",
      rating: "4.8",
      reviews: "(30)",
      color: "#B5583D",
    },
    {
      title: "The Lean Startup",
      author: "By Eric Ries",
      description:
        "A revolutionary approach to building businesses with lean principles.",
      imgSrc: "images/lean_startup.jpg",
      time: "18 Mins",
      rating: "4.6",
      reviews: "(28)",
      color: "#5D86B9",
    },
    {
      title: "Good to Great",
      author: "By Jim Collins",
      description:
        "Explores why some companies make the leap to greatness while others don’t.",
      imgSrc: "images/good_to_great.jpg",
      time: "19 Mins",
      rating: "4.7",
      reviews: "(25)",
      color: "#FD6D55",
    },
    {
      title: "Zero to One",
      author: "By Peter Thiel",
      description:
        "Insights into building the future by creating groundbreaking startups.",
      imgSrc: "images/zero_to_one.jpg",
      time: "15 Mins",
      rating: "4.5",
      reviews: "(22)",
      color: "#E9AD46",
    },
    {
      title: "Atomic Habits",
      author: "By James Clear",
      description:
        "Offers practical strategies to form good habits, break bad ones, and master tiny behaviors for life-changing results.",
      imgSrc: "images/atomic_habits.jpg",
      time: "17 Mins",
      rating: "4.9",
      reviews: "(40)",
      color: "#0D3772",
    },
    {
      title: "Why We Sleep",
      author: "By Matthew Walker",
      description:
        "Explores the vital importance of sleep to our health and well-being.",
      imgSrc: "images/why_we_sleep.jpg",
      time: "20 Mins",
      rating: "4.8",
      reviews: "(33)",
      color: "#0F3D69",
    },
    {
      title: "How Not to Die",
      author: "By Michael Greger",
      description:
        "Focuses on the lifestyle choices that can prevent chronic diseases and increase longevity.",
      imgSrc: "images/how_not_die.jpeg",
      time: "18 Mins",
      rating: "4.7",
      reviews: "(29)",
      color: "#509168",
    },
    {
      title: "The Four Hour Body",
      author: "By Tim Ferriss",
      description:
        "Presents unconventional approaches to losing weight, gaining muscle, and improving performance.",
      imgSrc: "images/four_hour_body.jpg",
      time: "22 Mins",
      rating: "4.5",
      reviews: "(21)",
      color: "#E3B061",
    },
    {
      title: "Sapiens: A Brief History of Humankind",
      author: "By Yuval Noah Harari",
      description:
        "Traces the evolution of Homo sapiens from ancient foragers to modern global powers, questioning what it means to be human.",
      imgSrc: "images/sapiens.avif",
      time: "25 Mins",
      rating: "4.7",
      reviews: "(35)",
      color: "#E15943",
    },
    {
      title: "A Brief History of Time",
      author: "By Stephen Hawking",
      description:
        "Explores the mysteries of the universe, from black holes to the big bang.",
      imgSrc: "images/brief_history_time.jpeg",
      time: "21 Mins",
      rating: "4.8",
      reviews: "(40)",
      color: "#73748A",
    },
    {
      title: "The Selfish Gene",
      author: "By Richard Dawkins",
      description:
        "A groundbreaking look at evolution from the perspective of gene-centric natural selection.",
      imgSrc: "images/selfish_gene.jpeg",
      time: "19 Mins",
      rating: "4.6",
      reviews: "(22)",
      color: "#A29276",
    },
    {
      title: "Cosmos",
      author: "By Carl Sagan",
      description:
        "A captivating journey through the cosmos, exploring the wonders of the universe.",
      imgSrc: "images/cosmos.jpg",
      time: "24 Mins",
      rating: "4.9",
      reviews: "(38)",
      color: "#DE9041",
    },
  ];

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className={styles.booksSection}>
      <div className={styles.header}>
        <h2>
          <span className={styles.recommended}>{headings[0]}</span>{" "}
          <span className={styles.forYou}>{headings[1]}</span>
        </h2>
        <p>{description}</p>
      </div>

      <button className={styles.scrollButton} onClick={scrollLeft}>
        {"<"}
      </button>

      <div className={styles.booksWrapper} ref={scrollContainerRef}>
        {booksData.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>

      <button className={styles.scrollButton} onClick={scrollRight}>
        {">"}
      </button>
    </div>
  );
}

export default Books;
