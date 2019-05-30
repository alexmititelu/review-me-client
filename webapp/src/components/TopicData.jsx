import React from "react";

const TopicData = ({
  name,
  description,
  ownerName,
  ownerEmail,
  qrCode,
  datePosted
}) => {
  return (
    <div>
      <span className="topic-main-property">{name}</span>
      <span className="topic-secondary-property">{description}</span>
      <span className="topic-secondary-property">
        Posted on {console.log(datePosted)}
        <span className="topic-date">
          {new Date(datePosted).toLocaleDateString()}
        </span>{" "}
        at{" "}
        <span className="topic-date">
          {new Date(datePosted).toLocaleTimeString()}
        </span>{" "}
        by <span className="topic-owner">{ownerName}</span>
      </span>
    </div>
  );
};

export default TopicData;
