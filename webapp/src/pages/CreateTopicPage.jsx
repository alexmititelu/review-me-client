import React, { useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import * as EmailValidator from "email-validator";
import FileBase64 from "react-file-base64";
import FormPropertyInput from "../components/FormPropertyInput";
import FormPropertyTextarea from "../components/FormPropertyTextarea";
import FormPropertyTags from "../components/FormPropertyTags";
import "./../css/create-topic-page.css";

const CreateTopicPage = () => {
  const [topicName, setTopicName] = useState("");
  const [topicNameError, setTopicNameError] = useState("");

  const [topicDescription, setTopicDescription] = useState("");
  const [topicDescriptionError, setTopicDescriptionError] = useState("");

  const [topicPhoto, setTopicPhoto] = useState("");

  const [topicContactName, setTopicContactName] = useState("");
  const [topicContactNameError, setTopicContactNameError] = useState("");

  const [topicContactEmail, setTopicContactEmail] = useState("");
  const [topicContactEmailError, setTopicContactEmailError] = useState("");

  const [topicTags, setTopicTags] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [validForm, setValidForm] = useState(false);

  const [createdTopicId, setCreatedTopicId] = useState("");

  const getFile = file => {
    setTopicPhoto(file[0].base64);
  };

  const startRedirectingProcess = async topicId => {
    setTimeout(() => {
      setCreatedTopicId(topicId);
    }, 2000);
  };

  const changeTopicName = newName => {
    setTopicName(newName);
    if (newName.length < 4 || newName.length > 40) {
      setValidForm(false);
      setTopicNameError(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Name must be between 4 and 40 characters</span>
        </React.Fragment>
      );
    } else {
      setValidForm(true);
      setTopicNameError("");
    }
  };

  const changeTopicDescription = newDescription => {
    setTopicDescription(newDescription);
    if (newDescription.length < 4 || newDescription.length > 200) {
      setValidForm(false);
      setTopicDescriptionError(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Description must be between 4 and 200 characters</span>
        </React.Fragment>
      );
    } else {
      setValidForm(true);
      setTopicDescriptionError("");
    }
  };

  const changeTopicContactName = newContactName => {
    setTopicContactName(newContactName);
    if (newContactName.length < 4 || newContactName.length > 30) {
      setValidForm(false);
      setTopicContactNameError(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Contact name must be between 4 and 30 characters</span>
        </React.Fragment>
      );
    } else {
      setValidForm(true);
      setTopicContactNameError("");
    }
  };

  const changeTopicContactEmail = newContactEmail => {
    setTopicContactEmail(newContactEmail);
    const valid = EmailValidator.validate(newContactEmail);

    if (!valid) {
      setValidForm(false);
      setTopicContactEmailError(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Invalid email address</span>
        </React.Fragment>
      );
    } else {
      setValidForm(true);
      setTopicContactEmailError("");
    }
  };

  const handleSubmit = () => {
    if (validForm) {
      const topic = {
        name: topicName,
        description: topicDescription,
        photo: topicPhoto,
        owner: {
          name: topicContactName,
          email: topicContactEmail
        },
        tags: topicTags
      };

      console.log(topic);

      axios
        .post("/api/rest/topics", topic)
        .then(({ data }) => {
          if (data.success === true) {
            setSuccessMessage(
              "Topic succesfully created. You will be redirected soon."
            );
            setErrorMessage("");
            startRedirectingProcess(data.id);
          } else {
            setSuccessMessage("");
            setErrorMessage("Ops.. try again later.");
          }
        })
        .catch(err => {
          setErrorMessage("Ops.. try again later.");
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
    <div className="topic-generator">
      {createdTopicId === "" ? (
        " "
      ) : (
        <Redirect to={"/topics/" + createdTopicId} />
      )}
      <h2>Create a new Topic</h2>
      <form>
        <FormPropertyInput
          type="text"
          label="Topic Name"
          placeholder="My Topic"
          changePropertyValue={changeTopicName}
          errorMessage={topicNameError}
        />

        <FormPropertyTextarea
          label="Description"
          placeholder="Lorem ipsum sin dolor"
          changePropertyValue={setTopicDescription}
          changePropertyValue={changeTopicDescription}
          errorMessage={topicDescriptionError}
        />

        <FormPropertyTags tags={topicTags} setTags={setTopicTags} />

        <div className="form-property-wrapper">
          <span className="form-property-label"> Photo </span>
          <div className="form-file-property">
            <FileBase64 multiple={true} onDone={file => getFile(file)} />
          </div>
          {topicPhoto ? (
            <img className="uploaded-image-preview" src={topicPhoto} />
          ) : (
            <br />
          )}
        </div>

        <FormPropertyInput
          type="text"
          label="Contact Name"
          placeholder="John Doe"
          changePropertyValue={changeTopicContactName}
          errorMessage={topicContactNameError}
        />

        <FormPropertyInput
          type="text"
          label="Contact Email"
          placeholder="john@doe.com"
          changePropertyValue={changeTopicContactEmail}
          errorMessage={topicContactEmailError}
        />
        <br />
        <div
          className="form-submit-button btn btn-info"
          onClick={() => handleSubmit()}
        >
          Create
        </div>

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
      </form>
    </div>
  );
};

export default CreateTopicPage;
