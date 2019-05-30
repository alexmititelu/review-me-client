import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TopicReview from "./TopicReview";

const TopicReviews = ({ reviews, setLoadMoreReviews }) => {
  const showMoreButton = useRef(null);

  return (
    <React.Fragment>
      {reviews.length > 0 ? (
        <>
          <div className="topic-reviews-section">
            {reviews.map((review, index) => (
              <TopicReview {...review} key={index} />
            ))}
          </div>
        </>
      ) : (
        <span>No reviews found</span>
      )}

      {reviews.length > 0 && reviews.length % 10 === 0 ? (
        <>
          <div
            className="button show-more-section"
            onClick={() => setLoadMoreReviews(true)}
          >
            Show more
          </div>
        </>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default TopicReviews;
