import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./signup.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomInputComponent from "../../components/CustomInputComponent/CustomInputComponent";
import { register } from "../../actions/auth";

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
});

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRegister = (values) => {
    dispatch(register(values.email, values.password, values.userName)).then(
      () => {
        history.push("/login");
      }
    );
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
                  component={CustomInputComponent}
                  className="register-input"
                  placeholder="Enter username"
                />
              </div>
              <div className="form-input-wrapper">
                <Field
                  name="email"
                  component={CustomInputComponent}
                  className="register-input"
                  placeholder="Enter email"
                />
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
      </div>
    </div>
  );
}

export default Register;
