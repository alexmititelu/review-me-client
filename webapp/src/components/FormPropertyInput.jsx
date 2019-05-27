import React, { useState } from "react";

const FormPropertyInput = ({
  type,
  label,
  placeholder,
  changePropertyValue,
  errorMessage
}) => {
  return (
    <div className="form-property-wrapper">
      <span className="form-property-label"> {label}: </span>
      <input
        className="form-property-input"
        type={type}
        placeholder={placeholder}
        onChange={ev => changePropertyValue(ev.target.value)}
      />
      <span className="form-property-error-message">
        {errorMessage ? errorMessage : <br />}
      </span>
    </div>
  );
};

export default FormPropertyInput;
