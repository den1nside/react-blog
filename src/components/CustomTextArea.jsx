/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Warn from "../style/Warn.styled";
import TextArea from "../style/TextArea.styled";

const CustomTextArea = ({
  field,
  form: { touched, errors },
  backgroundDark,
  ...props
}) => (
  <div>
    <TextArea
      type="text"
      backgroundDark={backgroundDark}
      {...field}
      {...props}
    />
    {touched[field.name] && errors[field.name] && (
      <Warn>{errors[field.name]}</Warn>
    )}
  </div>
);

export default CustomTextArea;
