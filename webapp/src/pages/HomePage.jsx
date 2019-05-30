import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import TopicsContainer from "./../components/TopicsContainer";
import "./../css/home-page.css";

const HomePage = () => {
  const [topics, setTopics] = useState([]);
  const [redirectToCreatePage, setRedirectToCreatePage] = useState(false);
  const [loadMoreTopics, setLoadMoreTopics] = useState(true);

  const loadTopics = () => {
    axios
      .get(`/api/rest/topics`, {
        params: {
          page: Math.floor((topics.length - 1) / 10) + 1
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
      <h1 className="home-page-title">Review Me</h1>
      {redirectToCreatePage === true ? <Redirect to={"/new-topic"} /> : ""}
      <button
        className="btn btn-info"
        onClick={() => setRedirectToCreatePage(true)}
      >
        Create New Topic
      </button>
      <TopicsContainer topics={topics} setLoadMoreTopics={setLoadMoreTopics} />
    </div>
  );
};

export default HomePage;
