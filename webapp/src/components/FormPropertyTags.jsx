import React, { useState, useRef, useEffect } from "react";

const FormPropertyTags = ({ tags, setTags }) => {
  const [newTag, setNewTag] = useState("");
  const [tagErrorMessage, setTagErrorMessage] = useState("");
  const [existingTags, setExistingTags] = useState("");
  const inputTagRef = useRef(null);

  const removeTagHandler = tag => {
    console.log(tag);
    let tagsCopy = tags;
    let idx = tagsCopy.indexOf(tag);
    if (idx !== -1) {
      tagsCopy.splice(idx, 1);
      setTags(tagsCopy);
      console.log(tags);
    }
  };

  const addTagHandler = () => {
    inputTagRef.current.value = "";
    if (!newTag) {
      setTagErrorMessage(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Tag must not be empty</span>
        </React.Fragment>
      );
    } else if (tags.indexOf(newTag) !== -1) {
      setTagErrorMessage(
        <React.Fragment>
          <i className="fas fa-times-circle error-icon" />{" "}
          <span>Tag already exists</span>
        </React.Fragment>
      );
    } else {
      let tagsCopy = tags;
      tagsCopy.push(newTag);
      setTags(tagsCopy);
      // let temp = existingTags + " " + newTag;
      // setExistingTags(temp);
      setNewTag("");
    }
  };

  useEffect(() => {
    console.log(tags);
  }, [setTags]);

  return (
    <div className="form-property-wrapper">
      <span className="form-property-label"> Tags:</span>
      <div className="existing-tags-section">
        {tags.map((element, index) => (
          <span className="tag-in-list" key={index}>
            {element}
            {/*
              <span onClick={() => removeTagHandler(element)}>
                <i className="fas fa-minus-circle delete-tag-icon" />
              </span>
            */}
          </span>
        ))}
      </div>

      <input
        className="form-control form-property-input-new-tag"
        type="text"
        placeholder={"yourtag"}
        onChange={ev => setNewTag(ev.target.value)}
        ref={inputTagRef}
      />
      <div
        className="add-new-tag-button"
        onClick={() => {
          addTagHandler();
        }}
      >
        <i className="fas fa-plus-square fa-2x" />
      </div>

      <div className="form-property-error-message">
        {tagErrorMessage ? tagErrorMessage : <br />}
      </div>
    </div>
  );
};

export default FormPropertyTags;
