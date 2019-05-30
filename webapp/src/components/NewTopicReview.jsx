import React, { useState, useEffect } from "react";
import axios from "axios";
import FormPropertyInput from "./FormPropertyInput";
import FormPropertyTextarea from "./FormPropertyTextarea";
import * as EmailValidator from "email-validator";

const NewTopicReview = ({ match, addNewReview }) => {
  const [displayAddReviewSection, setDisplayAddReviewSection] = useState(false);
  const toggleAddReviewSection = () => {
    setDisplayAddReviewSection(!displayAddReviewSection);
  };

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewTitleError, setReviewTitleError] = useState("");

  const [reviewerName, setReviewerName] = useState("");
  const [reviewerNameError, setReviewerNameError] = useState("");

  const [reviewContactEmail, setReviewContactEmail] = useState("");
  const [reviewContactEmailError, setReviewContactEmailError] = useState("");

  const [reviewText, setReviewText] = useState("");
  const [reviewTextError, setReviewTextError] = useState("");

  const [validForm, setValidForm] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const changeReviewTitle = newTitle => {
    setReviewTitle(newTitle);
    if (newTitle.length < 4 || newTitle.length > 40) {
      setValidForm(false);
      setReviewTitleError(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Title must be between 4 and 40 characters</span>
        </React.Fragment>
      );
    } else {
      setValidForm(true);
      setReviewTitleError("");
    }
  };

  const changeReviewText = newText => {
    setReviewText(newText);
    if (newText.length < 4 || newText.length > 200) {
      setValidForm(false);
      setReviewTextError(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Description must be between 4 and 200 characters</span>
        </React.Fragment>
      );
    } else {
      setValidForm(true);
      setReviewTextError("");
    }
  };

  const changeReviewerName = newReviewerName => {
    setReviewerName(newReviewerName);
    if (
      newReviewerName.length > 0 &&
      (newReviewerName.length < 4 || newReviewerName.length > 30)
    ) {
      setValidForm(false);
      setReviewerNameError(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Name must be between 4 and 30 characters</span>
        </React.Fragment>
      );
    } else {
      setValidForm(true);
      setReviewerNameError("");
    }
  };

  const changeReviewContactEmail = newContactEmail => {
    setReviewContactEmail(newContactEmail);
    const valid = EmailValidator.validate(newContactEmail);

    if (!valid) {
      setValidForm(false);
      setReviewContactEmailError(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Invalid email address</span>
        </React.Fragment>
      );
    } else {
      setValidForm(true);
      setReviewContactEmailError("");
    }
  };

  const submitReviewHandler = () => {
    const review = {
      owner: {
        email: reviewContactEmail,
        name: reviewerName
      },
      text: reviewText,
      title: reviewTitle
    };
    axios
      .post(`/api/rest/topics/${match.params.id}/reviews`, review)
      .then(({ data }) => {
        if (data.success === true) {
          setSuccessMessage("Review-ul a fost adaugat cu succes.");
          setDisplayAddReviewSection(false);
          //   addNewReview(data.review);
          window.location.reload();
        }
      })
      .catch(err => {
        setErrorMessage("A intervenit o eroare.");
      });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <button
        className="btn btn-light add-review-button"
        onClick={() => toggleAddReviewSection()}
      >
        <span className="add-review-button"> Add Review </span>
      </button>

      {displayAddReviewSection === true ? (
        <>
          <div className="new-review-container">
            <form>
              <FormPropertyInput
                type="text"
                label="Title"
                placeholder="My Review Title"
                changePropertyValue={changeReviewTitle}
                errorMessage={reviewTitleError}
              />

              <FormPropertyTextarea
                label="Review Message"
                placeholder=""
                changePropertyValue={changeReviewText}
                errorMessage={reviewTextError}
              />

              <FormPropertyInput
                type="text"
                label="Name*"
                placeholder="John Doe"
                changePropertyValue={changeReviewerName}
                errorMessage={reviewerNameError}
              />

              <FormPropertyInput
                type="text"
                label="Email"
                placeholder="john@doe.com"
                changePropertyValue={changeReviewContactEmail}
                errorMessage={reviewContactEmailError}
              />
            </form>
          </div>

          <button
            className="btn btn-light add-review-button"
            onClick={() => submitReviewHandler()}
          >
            <span className="add-review-button"> Submit </span>
          </button>

          <div className="form-error-message">
            {errorMessage ? (
              <React.Fragment>
                <br />
                {errorMessage}{" "}
              </React.Fragment>
            ) : (
              <br />
            )}
          </div>
        </>
      ) : (
        ""
      )}
      <div className="form-success-message">
        {successMessage ? (
          <React.Fragment>
            <br />
            {successMessage}{" "}
          </React.Fragment>
        ) : (
          <br />
        )}
      </div>
    </div>
  );
};

export default NewTopicReview;
