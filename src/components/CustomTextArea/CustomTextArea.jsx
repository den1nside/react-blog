/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

const CustomTextArea = ({ field, form: { touched, errors }, ...props }) => (
  <div>
    <textarea type="text" {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <div className="form-warn">{errors[field.name]}</div>
    )}
  </div>
);

export default CustomTextArea;
