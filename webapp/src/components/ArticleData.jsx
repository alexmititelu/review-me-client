import React, { useState, useEffect } from "react";
import axios from "axios";

const ArticleData = ({
  name,
  description,
  ownerName,
  ownerEmail,
  qrCode,
  datePosted
}) => {
  return (
    <div>
      <span className="article-main-property">{name}</span>
      <span className="article-secondary-property">{description}</span>
      <span className="article-secondary-property">
        Posted on {console.log(datePosted)}
        <span className="article-date">
          {new Date(datePosted).toLocaleDateString()}
        </span>{" "}
        at{" "}
        <span className="article-date">
          {new Date(datePosted).toLocaleTimeString()}
        </span>{" "}
        by <span className="article-owner">{ownerName}</span>
      </span>
    </div>
  );
};

export default ArticleData;
