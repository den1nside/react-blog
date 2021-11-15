import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomInputComponent from "../components/CustomInputComponent/CustomInputComponent";
import { register } from "../actions/auth";
import Button from "../style/Button.styled";
import FormWrapper from "../style/FormWrapper.styled";
import Title from "../style/Title.styled";
import FormEntry from "../style/FormEntry.styled";
import InputWrapper from "../style/InputWrapper.styled";
import Warn from "../style/Warn.styled";

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
    <FormWrapper>
      <FormEntry>
        <Title>Register</Title>
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
            <Form>
              <InputWrapper>
                <Field
                  name="userName"
                  component={CustomInputComponent}
                  placeholder="Enter username"
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="email"
                  component={CustomInputComponent}
                  placeholder="Enter email"
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="password"
                />
                {errors.password && touched.password ? (
                  <Warn>{errors.password}</Warn>
                ) : null}
              </InputWrapper>
              <Button styled type="submit">
                Register
              </Button>
            </Form>
          )}
        </Formik>

        <span>or</span>
        <Link to="/login">
          <Button styled type="button">
            Login
          </Button>
        </Link>
      </FormEntry>
    </FormWrapper>
  );
}

export default Register;
