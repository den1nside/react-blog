import React, { useState, useEffect } from "react";
import AuthServices from "../../api/auth-service";
import "./profile.css";

function Profile() {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
  });

  useEffect(() => {
    AuthServices.getUser().then((response) => {
      setUserData({
        userName: response.data.name,
        email: response.data.email,
      });
    });
  }, []);

  return (
    <>
      <div className="user-data-wrapper">
        <div className="user-data">
          <h1>User Data</h1>
          <p>
            <strong>Your name:</strong> {userData.userName}
          </p>
          <p>
            <strong>Your email:</strong> {userData.email}
          </p>
        </div>
      </div>
    </>
  );
}

export default Profile;
