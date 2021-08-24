import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { CONSTANTS } from "../../app/constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearState,
  loginAsync,
  selectAuthError,
  selectAutIsLoading,
} from "../../app/store/authSlice";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { ErrorMsg } from "../../components/ErrorMsg";
import "./login.scss";
import { LoginFormValues } from "./types";

const LoginSchema = Yup.object().shape({
  username: Yup.string().min(5).required("Required"),
  password: Yup.string().required("Required"),
});

const initialValues: LoginFormValues = { username: "", password: "" };

export const Login: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAutIsLoading);
  const authError = useAppSelector(selectAuthError);

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  const handleSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    dispatch(loginAsync(values.username, values.password));
    actions.setSubmitting(false);
  };

  return (
    <div className="Login">
      <div className="Login-root">
        <Card className="Login-card">
          <h1 className="Login-title">Login</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={LoginSchema}>
            {({ isValid, dirty, isSubmitting, errors }) => (
              <Form>
                <Field id="username" name="username" placeholder="User name" />
                <ErrorMsg msg={errors.username} />
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  autoComplete="off"
                />
                <ErrorMsg msg={errors.password} />
                <Button
                  className="Login-submitBtn"
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting || isLoading}>
                  Submit
                </Button>
                <ErrorMsg msg={authError} />
              </Form>
            )}
          </Formik>
          <div className="Login-bottomText">
            Don't have user?{" "}
            <Link to={CONSTANTS.ROUTES.REGISTER_PAGE}>register</Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
