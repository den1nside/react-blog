import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PostService from "../../api/posts-service";
import CustomInputComponent from "../CustomInputComponent/CustomInputComponent";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import getAllPostsOrdered from "../../utils/getAllPostsOrdered";
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

function AddPost(props) {
  const { postId, setPostData, setAllPosts } = props;
  const handleAddPost = (values, { resetForm }) => {
    if (postId) {
      props
        .method(props.postId, values.title, values.description, values.fullText)
        .then(() => {
          PostService.getSinglePost(postId).then((res) => {
            setPostData(res.data);
          });
          resetForm();
        });
    } else {
      props
        .method(values.title, values.description, values.fullText)
        .then(() => {
          getAllPostsOrdered().then(setAllPosts);
          resetForm();
        });
    }
  };

  return (
    <div className="addPost-wrapper">
      <div className="addPost">
        {postId ? null : <span className="addPost-title">Add your post</span>}
        <Formik
          initialValues={{
            title: "",
            description: "",
            fullText: "",
          }}
          validationSchema={addPostSchema}
          onSubmit={handleAddPost}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="addPost-form"
            >
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
                  component={CustomTextArea}
                />
              </div>
              <button type="submit" className="addPost-button">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddPost;
