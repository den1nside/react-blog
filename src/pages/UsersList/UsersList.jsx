/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useMemo } from "react";
import UserService from "../../api/user-service";
import "./usersList.css";

function UsersList() {
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    UserService.getAllUsers().then((res) => {
      setAllUsers(res.data.data);
    });
  }, []);

  const sorted = useMemo(() => {
    return allUsers
      .sort((a, b) => {
        if (a[sortKey] > b[sortKey]) {
          return -1;
        }
        if (a[sortKey] < b[sortKey]) {
          return 1;
        }
        return 0;
      })
      .filter((user) => {
        if (user.name) {
          return user.name.toLowerCase().includes(search.toLowerCase());
        }
        return null;
      });
  }, [allUsers, sortKey, search]);

  return (
    <div className="wrapper">
      <div className="operations users-operations">
        <div className="search">
          <input
            type="text"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select onChange={(e) => setSortKey(e.target.value)}>
            <option value="" hidden>
              Sort by
            </option>
            <option value="name">username</option>
            <option value="dateCreated">dateCreated</option>
          </select>
        </div>
      </div>
      <div className="user-entry">
        {sorted.map((user) => {
          return (
            <table key={user._id} className="user-info">
              <tbody>
                {user.avatar && (
                  <tr className="user-avatar">
                    <td>
                      <img
                        src={`${process.env.REACT_APP_IMAGE_SRC}${user.avatar}`}
                        alt="img"
                      />
                    </td>
                  </tr>
                )}
                <tr>
                  <th>Username:</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th>UserId:</th>
                  <td>{user._id}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Details:</th>
                  <td>{user.details}</td>
                </tr>
                <tr>
                  <th>Extra:</th>
                  <td>{user.extra_details}</td>
                </tr>
                <tr>
                  <th>Profesion:</th>
                  <td>{user.profession}</td>
                </tr>
                <tr>
                  <th>Skills:</th>
                  <td>{user.skills}</td>
                </tr>
                <tr>
                  <th>Created:</th>
                  <td>{user.dateCreated}</td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
}

export default UsersList;
