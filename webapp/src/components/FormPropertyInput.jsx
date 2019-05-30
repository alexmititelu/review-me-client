import React from "react";

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
        className="form-property-input form-control"
        type={type}
        placeholder={placeholder}
        onChange={ev => changePropertyValue(ev.target.value)}
      />
      <div className="form-property-error-message">
        {errorMessage ? errorMessage : <br />}
      </div>
    </div>
  );
};

export default FormPropertyInput;
