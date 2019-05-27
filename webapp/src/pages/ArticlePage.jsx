import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleData from "../components/ArticleData";
import "./../css/article-page.css";

const ArticlePage = ({ match }) => {
  const [articleData, setArticleData] = useState({});

  const initArticle = ({
    name,
    description,
    qrCode,
    owner: { name: ownerName, email: ownerEmail },
    datePosted
  }) => {
    setArticleData({
      name,
      description,
      qrCode,
      ownerName,
      ownerEmail,
      datePosted
    });
    console.log(articleData);
  };

  useEffect(() => {
    console.log("Mounting..");
    axios
      .get(`/api/rest/articles/${match.params.id}`)
      .then(({ data }) => {
        console.log(data);
        initArticle(data);
      })
      .catch(err => {
        console.log("error");
      });
  }, [match.params.id]);

  return (
    <div className="article-container">
      <h2>Single Article Page {match.params.id}</h2>
      <ArticleData {...articleData} />
    </div>
  );
};

export default ArticlePage;
