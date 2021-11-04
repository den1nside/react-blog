import React from "react";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import UserService from "../../api/user-service";
import CustomInputComponent from "../CustomInputComponent/CustomInputComponent";
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
  const handleEditProfile = (values, { resetForm }) => {
    UserService.editUser(
      id,
      values.name,
      values.extraDetails,
      values.skills,
      values.profession,
      values.details
    ).then(() => {
      resetForm();
    });
    window.location.reload();
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
          {({ errors, touched }) => (
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
                  placeholder="Enter extraDetails"
                  as="textarea"
                />
                {errors.extraDetails && touched.extraDetails ? (
                  <div className="form-warn">{errors.extraDetails}</div>
                ) : null}
              </div>
              <div className="form-input-wrapper">
                <Field
                  name="skills"
                  className="skills-input"
                  placeholder="Enter skills"
                  as="textarea"
                />
                {errors.skills && touched.skills ? (
                  <div className="form-warn">{errors.skills}</div>
                ) : null}
              </div>
              <div className="form-input-wrapper">
                <Field
                  name="details"
                  className="details-input"
                  placeholder="Enter details"
                  as="textarea"
                />
                {errors.details && touched.details ? (
                  <div className="form-warn">{errors.details}</div>
                ) : null}
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
