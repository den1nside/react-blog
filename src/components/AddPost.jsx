import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PostService from "../api/posts-service";
import CustomInputComponent from "./CustomInputComponent/CustomInputComponent";
import CustomTextArea from "./CustomTextArea";
import getAllPostsOrdered from "../utils/getAllPostsOrdered";
import Button from "../style/Button.styled";
import InputWrapper from "../style/InputWrapper.styled";
import Title from "../style/Title.styled";

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
    <div>
      <div>
        {postId && <Title>Add your post</Title>}
        <Formik
          initialValues={{
            title: "",
            description: "",
            fullText: "",
          }}
          validationSchema={addPostSchema}
          onSubmit={handleAddPost}
        >
          {() => (
            <Form className="addPost-form">
              <InputWrapper>
                <Field
                  name="title"
                  component={CustomInputComponent}
                  placeholder="Enter title"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="description"
                  component={CustomInputComponent}
                  placeholder="Enter description"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="fullText"
                  placeholder="Enter text"
                  component={CustomTextArea}
                />
              </InputWrapper>
              <Button styled width="100px" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddPost;
