import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/auth";
import "./profile.css";

function Profile() {
  const dispatch = useDispatch();

  const { id, userName, email } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <div className="user-data-wrapper">
        <div className="user-data">
          <h1>User Data</h1>
          <p>
            <strong>id: </strong>
            {id}
          </p>
          <p>
            <strong>Name: </strong>
            {userName}
          </p>
          <p>
            <strong>Email: </strong>
            {email}
          </p>
        </div>
      </div>
    </>
  );
}

export default Profile;
