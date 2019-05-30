import React, { useState } from "react";
import { Redirect } from "react-router";

const getFormattedDate = isoDate => {
  const date = new Date(isoDate);
  if (new Date().toDateString() === date.toDateString()) {
    return (
      <React.Fragment>
        <span className="review-date">today</span>
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

const TopicSummary = ({
  _id,
  datePosted,
  description,
  name,
  owner: { name: ownerName, email: ownerEmail }
}) => {
  const [displaySpecificTopic, setDisplaySpecificTopic] = useState("");

  const handleTopicSummaryClick = topicIdToDisplay => {
    setDisplaySpecificTopic(topicIdToDisplay);
  };
  return (
    <div className="topic-summary" onClick={() => handleTopicSummaryClick(_id)}>
      {displaySpecificTopic === "" ? "" : <Redirect to={"/topics/" + _id} />}
      <div className="topic-summary-title">{name}</div>
      <div className="topic-summary-description">{description}</div>
      <hr className="topic-summary-separator" />
      <br />

      <div className="topic-summary-footer">
        by <span className="topic-owner">{ownerName} </span>
        {getFormattedDate(datePosted)}
      </div>
    </div>
  );
};

export default TopicSummary;
