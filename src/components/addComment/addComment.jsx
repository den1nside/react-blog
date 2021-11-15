import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CommentService from "../../api/comment-service";
import CustomTextArea from "../CustomTextArea";
import Button from "../../style/Button.styled";
import InputWrapper from "../../style/InputWrapper.styled";
import AddCommentTitle from "./addComment.styled";

const addCommentSchema = Yup.object().shape({
  text: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function AddComment({
  postId,
  followedCommentID,
  setAllComments,
  setShowReply,
  setShowEdit,
  method,
  commentId,
  backgroundDark,
}) {
  const handleAddComment = (values, { resetForm }) => {
    if (commentId) {
      method(commentId, values.text).then(() => {
        CommentService.getAllComments(postId).then((res) => {
          setAllComments(res.data);
        });
        resetForm();
        setShowEdit(false);
      });
    } else {
      method(postId, values.text, followedCommentID).then(() => {
        CommentService.getAllComments(postId).then((res) => {
          setAllComments(res.data);
        });
        resetForm();
        if (setShowReply) {
          setShowReply(false);
        }
      });
    }
  };

  return (
    <div>
      <div>
        {!commentId &&
          (postId === followedCommentID ? (
            <AddCommentTitle>Add your comment</AddCommentTitle>
          ) : (
            <AddCommentTitle>Reply</AddCommentTitle>
          ))}

        <Formik
          initialValues={{
            text: "",
          }}
          validationSchema={addCommentSchema}
          onSubmit={handleAddComment}
        >
          {() => (
            <Form>
              <InputWrapper>
                <Field
                  name="text"
                  placeholder="Enter text"
                  component={CustomTextArea}
                  backgroundDark={backgroundDark}
                />
              </InputWrapper>
              <Button type="submit" styled width="fit-content">
                Submit
              </Button>
              {setShowEdit && (
                <Button
                  type="button"
                  width="fit-content"
                  onClick={() => setShowEdit(false)}
                >
                  Edit
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddComment;
