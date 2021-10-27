import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./signup.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { register } from "../../actions/auth";

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
});

function Register() {
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const [successful, setSuccessful] = useState(null);

  const handleRegister = (values) => {
    dispatch(register(values.email, values.password, values.userName))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="register-wrapper">
      <div className="register">
        <span className="register-title">Register</span>
        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched }) => (
            <Form className="register-form">
              <div className="form-input-wrapper">
                <Field
                  name="userName"
                  className="register-input"
                  placeholder="Enter username"
                />
                {errors.userName && touched.userName ? (
                  <div className="form-warn">{errors.userName}</div>
                ) : null}
              </div>
              <div className="form-input-wrapper">
                <Field
                  name="email"
                  className="register-input"
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
                  className="register-input"
                  placeholder="Enter password"
                />
                {errors.password && touched.password ? (
                  <div className="form-warn">{errors.password}</div>
                ) : null}
              </div>
              <button type="submit" className="register-button">
                Register
              </button>
            </Form>
          )}
        </Formik>

        <span>or</span>
        <Link to="/login">
          <button type="button" className="login-button">
            Login
          </button>
        </Link>

        {successful ? <Redirect to="/login" /> : null}
        {successful === false ? (
          <div className="form-response">{message}</div>
        ) : null}
      </div>
    </div>
  );
}

export default Register;
