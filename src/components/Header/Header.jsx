import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { StyledHeader, LinkItem, Links } from "./Header.styled";

function Header() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <StyledHeader>
      <Links>
        <Link to="/">
          <LinkItem>Home</LinkItem>
        </Link>
        <Link to="/profile">
          <LinkItem>Profile</LinkItem>
        </Link>
        <Link to="/users-list">
          <LinkItem>Users</LinkItem>
        </Link>
      </Links>
      <Links>
        {isLoggedIn ? (
          <LinkItem as="a" href="/login" onClick={logOut}>
            Logout
          </LinkItem>
        ) : (
          <Link to="/login">
            <LinkItem>Login</LinkItem>
          </Link>
        )}

        <Link to="/register">
          <LinkItem>Register</LinkItem>
        </Link>
      </Links>
    </StyledHeader>
  );
}

export default Header;
