import React, { useState } from "react";

const FormPropertyTextarea = ({
  label,
  placeholder,
  changePropertyValue,
  errorMessage
}) => {
  return (
    <div className="form-property-wrapper">
      <span className="form-property-label"> {label} </span>
      <textarea
        className="form-property-textarea"
        placeholder={placeholder}
        cols={50}
        rows={4}
        onChange={ev => changePropertyValue(ev.target.value)}
      />
      <span className="form-property-error-message">
        {errorMessage ? errorMessage : <br />}
      </span>
    </div>
  );
};

export default FormPropertyTextarea;
