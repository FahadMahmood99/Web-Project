import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaStar, FaRegThumbsUp } from "react-icons/fa"; // Import icons
import styles from "../styles/reviews.module.css"; // Import CSS Module

const reviews = [
  {
    id: 1,
    name: "Olivia S.",
    profilePic: "https://i.pravatar.cc/50?img=1",
    rating: 5,
    review:
      "I love how easy it is to find exactly what I’m in the mood for. The AI recommendations are spot on, and the design is so user-friendly. This app has quickly become my go-to for both audiobooks and movies!",
    likes: 2,
    time: "2 days ago",
  },
  {
    id: 2,
    name: "Michael T.",
    profilePic: "https://i.pravatar.cc/50?img=2",
    rating: 5,
    review:
      "The app has a great selection and the summaries are perfect for when I'm short on time. The interface is clean, and I really appreciate the offline listening option. It’s almost perfect!",
    likes: 5,
    time: "5 days ago",
  },
];

const Reviews = () => {
  return (
    <Container className={styles.reviewsContainer}>
      {/* Heading */}
      <h2 className={styles.heading}>
        <span className={styles.redText}>Ratings</span> <em>And Reviews</em>
      </h2>
      <p className={styles.subtitle}>Lorem ipsum dolor sit amet consectetur.</p>

      {/* Average Rating Box */}
      <Row className="justify-content-between">
        <Col md={8} className={styles.ratingBox}>
          <strong>Average Rating:</strong>
          <span className={styles.stars}>
            <FaStar className={styles.star} />
            <FaStar className={styles.star} />
            <FaStar className={styles.star} />
            <FaStar className={styles.star} />
            <FaStar className={styles.halfStar} />
          </span>
          <span className={styles.ratingText}>4.2 (24 ratings)</span>
        </Col>
        <Col md={4} className="text-end" style={{ paddingRight: 0, margin: "auto 0" }}>
          <Button variant="link" className={styles.addReview}>
            Add Review
          </Button>
        </Col>
      </Row>

      {/* Reviews Section */}
      {reviews.map((review) => (
        <Row key={review.id} className={styles.reviewItem}>
          <Col xs={2} className="text-center" style={{padding:0}}>
            <img
              src={review.profilePic}
              alt="User"
              className={styles.profilePic}
            />
          </Col>
          <Col xs={10}>
            <div className={styles.reviewHeader}>
              <strong>{review.name}</strong>
              <span className={styles.reviewStars}>
                {[...Array(review.rating)].map((_, index) => (
                  <FaStar key={index} className={styles.star} />
                ))}
              </span>
            </div>
            <p className={styles.reviewText}>{review.review}</p>
            <div className={styles.reviewMeta}>
              <span className={styles.likeButton}>
                <FaRegThumbsUp /> {review.likes} Likes
              </span>
              <span className={styles.timeAgo}>{review.time}</span>
            </div>
          </Col>
        </Row>
      ))}

      {/* Load More Button */}
      <div className="text-center mt-3">
        <Button className={styles.loadMore}>
          Load More <span>&#x2193;</span>
        </Button>
      </div>
    </Container>
  );
};

export default Reviews;
