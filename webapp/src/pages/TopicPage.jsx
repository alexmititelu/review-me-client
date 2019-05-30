import React, { useState, useEffect } from "react";
import axios from "axios";
import TopicData from "../components/TopicData";
import TopicReviews from "../components/TopicReviews";
import NewTopicReview from "../components/NewTopicReview";
import "./../css/topic-page.css";

const TopicPage = ({ match }) => {
  const [topicData, setTopicData] = useState({});
  const [topicReviews, setTopicReviews] = useState([]);

  const [initializedData, setInitializedData] = useState(false);
  const [loadMoreReviews, setLoadMoreReviews] = useState(true);
  const [newPostedReview, setNewPostedReview] = useState("");

  const addNewReview = async review => {
    let reviewsCopy = [review];
    console.log(review);
    console.log(topicReviews);
    reviewsCopy.push(...topicReviews);
    await setTopicReviews(reviewsCopy);
    console.log(reviewsCopy);
    setNewPostedReview(review);
  };

  const initTopic = ({
    name,
    description,
    qrCode,
    owner: { name: ownerName, email: ownerEmail },
    datePosted
  }) => {
    setTopicData({
      name,
      description,
      qrCode,
      ownerName,
      ownerEmail,
      datePosted
    });
    console.log(topicData);
  };

  const loadReviews = () => {
    axios
      .get(`/api/rest/topics/${match.params.id}/reviews`, {
        params: {
          page: Math.floor((topicReviews.length - 1) / 10) + 1
        }
      })
      .then(({ data }) => {
        let reviewsCopy = topicReviews;
        reviewsCopy.push(...data);
        setTopicReviews(reviewsCopy);
        setLoadMoreReviews(false);
      })
      .catch(err => {
        console.log("error");
      });
  };

  useEffect(() => {
    console.log("Mounting..");
    if (initializedData === false) {
      axios
        .get(`/api/rest/topics/${match.params.id}`)
        .then(({ data }) => {
          console.log(data);
          initTopic(data);
          setInitializedData(true);
        })
        .catch(err => {
          console.log("error");
        });
    }

    if (loadMoreReviews === true) {
      loadReviews();
    }

    if (newPostedReview) {
      console.log(newPostedReview);
      setNewPostedReview("");
    }
  }, [loadMoreReviews, newPostedReview]);

  return (
    <div className="topic-container">
      <TopicData {...topicData} />
      <NewTopicReview match={match} addNewReview={addNewReview} />
      <TopicReviews
        reviews={topicReviews}
        setLoadMoreReviews={setLoadMoreReviews}
      />
    </div>
  );
};

export default TopicPage;
