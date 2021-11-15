import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setDarkTheme, setLightTheme } from "../../actions/theme";
import Header from "../Header/Header";
import Login from "../../pages/Login";
import Register from "../../pages/Signup";
import Home from "../../pages/Home/Home";
import SinglePost from "../../pages/SinglePost/SinglePost";
import Profile from "../../pages/Profile/Profile";
import UsersList from "../../pages/UsersList";
import PrivateRoute from "../../utils/PrivateRoute";
import GlobalStyle from "../../style/global";
import { LightTheme, DarkTheme } from "../../style/themes";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const themeToggler = () => {
    if (theme === "Light") {
      dispatch(setDarkTheme());
    } else {
      dispatch(setLightTheme());
    }
  };

  return (
    <ThemeProvider theme={theme === "Light" ? LightTheme : DarkTheme}>
      <GlobalStyle />
      <Router>
        <Header />
        <div>
          <input
            onClick={themeToggler}
            type="checkbox"
            id="toggle-button"
            className="toggle-button"
          />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/posts/:post_id" component={SinglePost} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/users-list" component={UsersList} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
