/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

const CustomInputComponent = ({
  field,
  form: { touched, errors },
  ...props
}) => (
  <div>
    <input type="text" {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <div className="form-warn">{errors[field.name]}</div>
    )}
  </div>
);

export default CustomInputComponent;
