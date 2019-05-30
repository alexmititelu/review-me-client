import React from "react";

const getFormattedSentiment = sentiment => {
  if (sentiment === "NEUTRAL") {
    return (
      <span>
        <span role="img" aria-labelledby="neutral">
          😐
        </span>{" "}
        NEUTRAL{" "}
        <span role="img" aria-labelledby="neutral">
          😐
        </span>
      </span>
    );
  }

  if (sentiment === "POSITIVE") {
    return (
      <span>
        <span role="img" aria-labelledby="positive">
          🙂😉
        </span>{" "}
        POSITIVE{" "}
        <span role="img" aria-labelledby="positive">
          😉🙂
        </span>
      </span>
    );
  }

  if (sentiment === "NEGATIVE") {
    return (
      <span>
        <span role="img" aria-labelledby="negative">
          😒
        </span>{" "}
        NEGATIVE{" "}
        <span role="img" aria-labelledby="negative">
          😒
        </span>
      </span>
    );
  }

  if (sentiment === "MIXED") {
    return (
      <span>
        <span role="img" aria-labelledby="mixed">
          🙃
        </span>{" "}
        MIXED{" "}
        <span role="img" aria-labelledby="mixed">
          🙃
        </span>
      </span>
    );
  }
};

const getFormattedDate = isoDate => {
  const date = new Date(isoDate);

  if (new Date().toDateString() === date.toDateString()) {
    return (
      <React.Fragment>
        , <span className="review-date">today</span>
        {" at "}
        <span className="review-date">{date.toLocaleTimeString()}</span>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        on<span className="review-date"> {date.toLocaleDateString()}</span>
        {" at "}
        <span className="review-date">{date.toLocaleTimeString()}</span>
      </React.Fragment>
    );
  }
};

const TopicReview = ({
  datePosted,
  text,
  title,
  sentiment,
  owner: { name, email }
}) => {
  return (
    <div className="topic-review-wrapper">
      <span className="topic-review-body">
        <span className="topic-review-title">{title}</span>
        <span className="topic-review-sentiment">
          {getFormattedSentiment(sentiment)}
        </span>
        <span className="topic-review-text">{text}</span>
      </span>
      <span className="topic-review-reviewer-section">
        by <span className="review-owner">{name ? name : email}</span>
        {getFormattedDate(datePosted)}
      </span>
    </div>
  );
};

export default TopicReview;
