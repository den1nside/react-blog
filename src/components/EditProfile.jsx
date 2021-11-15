import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getUser } from "../actions/auth";
import UserService from "../api/user-service";
import CustomInputComponent from "./CustomInputComponent/CustomInputComponent";
import CustomTextArea from "./CustomTextArea";
import Button from "../style/Button.styled";
import InputWrapper from "../style/InputWrapper.styled";

const editProfileShema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  details: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  extraDetails: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  profession: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  skills: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
});

function EditProfile() {
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleEditProfile = (values, { resetForm }) => {
    UserService.editUser(id, values).then(() => {
      dispatch(getUser());
      resetForm();
    });
  };

  return (
    <div className="editProfile-wrapper">
      <div className="editProfile">
        <Formik
          initialValues={{
            name: "",
            extraDetails: "",
            skills: "",
            profession: "",
            details: "",
          }}
          validationSchema={editProfileShema}
          onSubmit={handleEditProfile}
        >
          {() => (
            <Form>
              <InputWrapper>
                <Field
                  name="name"
                  component={CustomInputComponent}
                  placeholder="Enter name"
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="profession"
                  component={CustomInputComponent}
                  placeholder="Enter profession"
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="extraDetails"
                  component={CustomTextArea}
                  placeholder="Enter extraDetails"
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="skills"
                  placeholder="Enter skills"
                  component={CustomTextArea}
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="details"
                  placeholder="Enter details"
                  component={CustomTextArea}
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <Button styled width="fit-content" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditProfile;
