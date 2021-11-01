import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import addPost from "../../actions/posts";
import CustomInputComponent from "../CustomInputComponent/CustomInputComponent";
import "./addPost.css";

const addPostSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  fullText: Yup.string()
    .min(30, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
});

function AddPost() {
  const dispatch = useDispatch();

  const handleAddPost = (values, { resetForm }) => {
    dispatch(addPost(values.title, values.description, values.fullText)).then(
      () => {
        resetForm();
      }
    );
  };

  return (
    <div className="addPost-wrapper">
      <div className="addPost">
        <span className="addPost-title">Add your post</span>
        <Formik
          initialValues={{
            title: "",
            description: "",
            fullText: "",
          }}
          validationSchema={addPostSchema}
          onSubmit={handleAddPost}
        >
          {({ errors, touched }) => (
            <Form className="addPost-form">
              <div className="form-input-wrapper">
                <Field
                  name="title"
                  component={CustomInputComponent}
                  className="title-input"
                  placeholder="Enter title"
                />
              </div>
              <div className="form-input-wrapper">
                <Field
                  name="description"
                  component={CustomInputComponent}
                  className="description-input"
                  placeholder="Enter description"
                />
              </div>
              <div className="form-input-wrapper">
                <Field
                  name="fullText"
                  className="fullText-input"
                  placeholder="Enter text"
                  as="textarea"
                />
                {errors.fullText && touched.fullText ? (
                  <div className="form-warn">{errors.fullText}</div>
                ) : null}
              </div>
              <button type="submit" className="addPost-button">
                Post
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddPost;
