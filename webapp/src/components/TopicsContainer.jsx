import React from "react";
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
        </>
      ) : (
        <div className="topics-container-message">No topics found</div>
      )}

      {topics.length > 0 && topics.length % 10 === 0 ? (
        <>
          <div
            className="button show-more-section"
            onClick={() => setLoadMoreTopics(true)}
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

export default TopicsContainer;
