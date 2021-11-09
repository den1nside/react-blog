import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getUser } from "../../actions/auth";
import UserService from "../../api/user-service";
import CustomInputComponent from "../CustomInputComponent/CustomInputComponent";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import "./editProfile.css";

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
            <Form className="editProfile-form">
              <div className="form-input-wrapper">
                <Field
                  name="name"
                  component={CustomInputComponent}
                  className="name-input"
                  placeholder="Enter name"
                />
              </div>
              <div className="form-input-wrapper">
                <Field
                  name="profession"
                  component={CustomInputComponent}
                  className="profession-input"
                  placeholder="Enter profession"
                />
              </div>
              <div className="form-input-wrapper">
                <Field
                  name="extraDetails"
                  className="extraDetails-input"
                  component={CustomTextArea}
                  placeholder="Enter extraDetails"
                />
              </div>
              <div className="form-input-wrapper">
                <Field
                  name="skills"
                  className="skills-input"
                  placeholder="Enter skills"
                  component={CustomTextArea}
                />
              </div>
              <div className="form-input-wrapper">
                <Field
                  name="details"
                  className="details-input"
                  placeholder="Enter details"
                  component={CustomTextArea}
                />
              </div>
              <button type="submit" className="editProfile-button">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditProfile;
