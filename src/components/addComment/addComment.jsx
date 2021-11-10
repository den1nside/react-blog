import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CommentService from "../../api/comment-service";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import "./addComment.css";

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
    <div className="addComment-wrapper">
      <div className="addComment">
        {!commentId &&
          (postId === followedCommentID ? (
            <span className="addComment-title">Add your comment</span>
          ) : (
            <span className="addComment-title">Reply</span>
          ))}

        <Formik
          initialValues={{
            text: "",
          }}
          validationSchema={addCommentSchema}
          onSubmit={handleAddComment}
        >
          {() => (
            <Form className="addComment-form">
              <div className="form-input-wrapper">
                <Field
                  name="text"
                  className="text-input"
                  placeholder="Enter text"
                  component={CustomTextArea}
                />
              </div>
              <button type="submit" className="addComment-button">
                Submit
              </button>
              {setShowEdit && (
                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="button button-edit"
                >
                  Edit
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddComment;
