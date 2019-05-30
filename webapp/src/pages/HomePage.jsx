import React, { useState, useEffect } from "react";
import axios from "axios";
import TopicsContainer from "./../components/TopicsContainer";
import "./../css/home-page.css";

const HomePage = () => {
  const [topics, setTopics] = useState([]);

  const [loadMoreTopics, setLoadMoreTopics] = useState(true);

  const loadTopics = () => {
    axios
      .get(`/api/rest/topics`, {
        params: {
          page: Math.floor((topics.length - 1) / 2) + 1
        }
      })
      .then(({ data }) => {
        let topicsCopy = topics;
        topicsCopy.push(...data);
        setTopics(topicsCopy);
        setLoadMoreTopics(false);
      })
      .catch(err => {
        console.log("error");
      });
  };

  useEffect(() => {
    if (loadMoreTopics === true) {
      loadTopics();
    }
  }, [loadMoreTopics]);

  return (
    <div className="home-page-body">
      <TopicsContainer topics={topics} setLoadMoreTopics={setLoadMoreTopics} />
    </div>
  );
};

export default HomePage;
