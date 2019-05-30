import React, { useState, useEffect } from "react";
import axios from "axios";
import TopicSummary from "./TopicSummary";

const TopicsContainer = ({ topics, setLoadMoreTopics }) => {
  return (
    <React.Fragment>
      {topics.length > 0 ? (
        <>
          <div className="topics-container-section">
            {topics.map((topic, index) => (
              <TopicSummary {...topic} key={index} />
            ))}
          </div>
          <div
            className="button show-more-section"
            onClick={() => setLoadMoreTopics(true)}
          >
            Show more
          </div>
        </>
      ) : (
        <span>No topics found</span>
      )}
    </React.Fragment>
  );
};

export default TopicsContainer;
