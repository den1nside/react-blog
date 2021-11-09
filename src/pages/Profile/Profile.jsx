/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../actions/auth";
import UserService from "../../api/user-service";
import EditProfile from "../../components/editProfile/EditProfile";
import "./profile.css";

function Profile() {
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();
  const {
    id,
    name,
    email,
    dateCreated,
    details,
    extra_details,
    profession,
    skills,
    avatar,
  } = useSelector((state) => state.auth);
  const fileInput = useRef();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleOnDelete = () => {
    UserService.deleteUser(id).then(() => {
      dispatch(logout());
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    UserService.uploadAvatar(id, fileInput.current.files[0]).then(() => {
      dispatch(getUser());
    });
  };

  return (
    <div className="container">
      <div className="user-data-wrapper">
        <div className="user-data">
          <table className="user-info">
            <tbody>
              {avatar && (
                <tr className="user-avatar">
                  <td>
                    <img
                      src={`${process.env.REACT_APP_IMAGE_SRC}${avatar}`}
                      alt="img"
                    />
                  </td>
                </tr>
              )}

              <tr>
                <th>Username:</th>
                <td>{name}</td>
              </tr>
              <tr>
                <th>UserId:</th>
                <td>{id}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{email}</td>
              </tr>
              <tr>
                <th>Details:</th>
                <td>{details}</td>
              </tr>
              <tr>
                <th>Extra:</th>
                <td>{extra_details}</td>
              </tr>
              <tr>
                <th>Profession:</th>
                <td>{profession}</td>
              </tr>
              <tr>
                <th>Skills:</th>
                <td>{skills}</td>
              </tr>
              <tr>
                <th>Created:</th>
                <td>{dateCreated}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="user-services">
          <button
            type="button"
            onClick={() => setShowEdit(!showEdit)}
            className="button button-edit"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleOnDelete}
            className="button button-delete"
          >
            Delete
          </button>
        </div>
        {showEdit ? (
          <div className="edit-form">
            <form onSubmit={handleOnSubmit}>
              <input type="file" ref={fileInput} />
              <button className="button submit" type="submit">
                Submit
              </button>
            </form>
            <EditProfile />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Profile;
