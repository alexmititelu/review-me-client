import React, { useState, useEffect } from "react";
import axios from "axios";
import * as EmailValidator from "email-validator";
import FileBase64 from "react-file-base64";
import ArticleData from "../components/ArticleData";
import FormPropertyInput from "../components/FormPropertyInput";
import FormPropertyTextarea from "../components/FormPropertyTextarea";
import "./../css/create-article-page.css";

const CreateArticlePage = ({ match }) => {
  const [articleName, setArticleName] = useState("");
  const [articleNameError, setArticleNameError] = useState("");

  const [articleDescription, setArticleDescription] = useState("");
  const [articleDescriptionError, setArticleDescriptionError] = useState("");

  const [articlePhoto, setArticlePhoto] = useState("");

  const [articleContactName, setArticleContactName] = useState("");
  const [articleContactNameError, setArticleContactNameError] = useState("");

  const [articleContactEmail, setArticleContactEmail] = useState("");
  const [articleContactEmailError, setArticleContactEmailError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [validForm, setValidForm] = useState(false);

  const getFile = file => {
    setArticlePhoto(file[0].base64);
  };

  const changeArticleName = newName => {
    setArticleName(newName);
    if (newName.length < 4 || newName.length > 20) {
      setValidForm(false);
      setArticleNameError(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Name must be between 4 and 20 characters</span>
        </React.Fragment>
      );
    } else {
      setValidForm(true);
      setArticleNameError("");
    }
  };

  const changeArticleDescription = newDescription => {
    setArticleDescription(newDescription);
    if (newDescription.length < 4 || newDescription.length > 200) {
      setValidForm(false);
      setArticleDescriptionError(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Description must be between 4 and 200 characters</span>
        </React.Fragment>
      );
    } else {
      setValidForm(true);
      setArticleDescriptionError("");
    }
  };

  const changeArticleContactName = newContactName => {
    setArticleContactName(newContactName);
    if (newContactName.length < 4 || newContactName.length > 30) {
      setValidForm(false);
      setArticleContactNameError(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Contact name must be between 4 and 30 characters</span>
        </React.Fragment>
      );
    } else {
      setValidForm(true);
      setArticleContactNameError("");
    }
  };

  const changeArticleContactEmail = newContactEmail => {
    setArticleContactEmail(newContactEmail);
    const valid = EmailValidator.validate(newContactEmail);

    if (!valid) {
      setValidForm(false);
      setArticleContactEmailError(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Invalid email address</span>
        </React.Fragment>
      );
    } else {
      setValidForm(true);
      setArticleContactEmailError("");
    }
  };

  const handleSubmit = () => {
    console.log("clicked");
    if (validForm) {
      const article = {
        name: articleName,
        description: articleDescription,
        photo: articlePhoto,
        owner: {
          name: articleContactName,
          email: articleContactEmail
        }
      };

      console.log(article);

      axios
        .post("http://localhost:5000/api/rest/articles", article, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log("success");
        })
        .catch(err => {
          console.log("error");
        });
    } else {
      setErrorMessage(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>One or more fields are invalid.</span>
        </React.Fragment>
      );
    }
  };

  return (
    <div className="article-generator">
      <h2>Create a new Article</h2>
      <form>
        <FormPropertyInput
          type="text"
          label="Article Name"
          placeholder="My Article"
          changePropertyValue={changeArticleName}
          errorMessage={articleNameError}
        />

        <FormPropertyTextarea
          label="Description"
          placeholder="Lorem ipsum sin dolor"
          changePropertyValue={setArticleDescription}
          changePropertyValue={changeArticleDescription}
          errorMessage={articleDescriptionError}
        />

        <div className="form-property-wrapper">
          <span className="form-property-label"> Photos </span>
          <div className="form-file-property">
            <FileBase64 multiple={true} onDone={file => getFile(file)} />
          </div>
          {articlePhoto ? (
            <img className="uploaded-image-preview" src={articlePhoto} />
          ) : (
            <br />
          )}
        </div>

        <FormPropertyInput
          type="text"
          label="Contact Name"
          placeholder="John Doe"
          changePropertyValue={changeArticleContactName}
          errorMessage={articleContactNameError}
        />

        <FormPropertyInput
          type="text"
          label="Contact Email"
          placeholder="john@doe.com"
          changePropertyValue={changeArticleContactEmail}
          errorMessage={articleContactEmailError}
        />
        <br />
        <div className="form-submit-button" onClick={() => handleSubmit()}>
          Create
        </div>

        <span className="form-error-message">
          {errorMessage ? (
            <React.Fragment>
              <br />
              {errorMessage}{" "}
            </React.Fragment>
          ) : (
            <br />
          )}
        </span>
      </form>
    </div>
  );
};

export default CreateArticlePage;
