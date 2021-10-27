import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./login.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { login } from "../../actions/auth";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
});

function Login() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const handleLogin = (values) => {
    dispatch(login(values.email, values.password));
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <span className="login-title">Login</span>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SigninSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form className="login-form">
              <div className="form-input-wrapper">
                <Field
                  name="email"
                  className="login-input"
                  placeholder="Enter email"
                />
                {errors.email && touched.email ? (
                  <div className="form-warn">{errors.email}</div>
                ) : null}
              </div>
              <div className="form-input-wrapper">
                <Field
                  name="password"
                  type="password"
                  className="login-input"
                  placeholder="Enter password"
                />
                {errors.password && touched.password ? (
                  <div className="form-warn">{errors.password}</div>
                ) : null}
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </Form>
          )}
        </Formik>
        <span>or</span>
        <Link to="/register">
          <button type="button" className="login-button">
            Register
          </button>
        </Link>

        {message ? <div className="form-response">{message}</div> : null}
        {isLoggedIn && <Redirect to="/profile" />}
      </div>
    </div>
  );
}

export default Login;
