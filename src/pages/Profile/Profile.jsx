/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../actions/auth";
import UserService from "../../api/user-service";
import EditProfile from "../../components/EditProfile";
import Container from "../../style/Container.styled";
import Button from "../../style/Button.styled";
import UserAvatar from "../../style/UserAvatar.styled";
import UserInfo from "../../style/UserInfo.styled";
import { UserServices, UserDataWrapper, UserData } from "./Profile.styled";

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
    <Container>
      <UserDataWrapper>
        <UserData>
          <UserInfo>
            <tbody>
              {avatar && (
                <UserAvatar>
                  <td>
                    <img
                      src={`${process.env.REACT_APP_IMAGE_SRC}${avatar}`}
                      alt="img"
                    />
                  </td>
                </UserAvatar>
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
          </UserInfo>
        </UserData>
        <UserServices>
          <Button
            type="button"
            width="50px"
            onClick={() => setShowEdit(!showEdit)}
          >
            Edit
          </Button>
          <Button type="button" width="50px" onClick={handleOnDelete}>
            Delete
          </Button>
        </UserServices>
        {showEdit ? (
          <div>
            <form onSubmit={handleOnSubmit}>
              <input type="file" ref={fileInput} />
              <Button width="fit-content" type="submit">
                Submit
              </Button>
            </form>
            <EditProfile />
          </div>
        ) : null}
      </UserDataWrapper>
    </Container>
  );
}

export default Profile;
