import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { CONSTANTS } from "../../app/constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearState,
  registerAsync,
  selectAuthError,
  selectAutIsLoading,
} from "../../app/store/authSlice";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { ErrorMsg } from "../../components/ErrorMsg";
import "./register.scss";
import { IRegisterFormValues } from "./types";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(5).required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const initialValues: IRegisterFormValues = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const Register: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAutIsLoading);
  const authError = useAppSelector(selectAuthError);

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  const handleSubmit = (
    values: IRegisterFormValues,
    actions: FormikHelpers<IRegisterFormValues>
  ) => {
    dispatch(registerAsync(values.username, values.email, values.password));
    actions.setSubmitting(false);
  };

  return (
    <div className="Register">
      <div className="Register-root">
        <Card className="Register-card">
          <h1 className="Register-title">Register</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={RegisterSchema}>
            {({ isValid, dirty, isSubmitting, errors }) => (
              <Form>
                <Field id="username" name="username" placeholder="User name" />
                <ErrorMsg msg={errors.username} />
                <Field id="email" name="email" placeholder="Email" />
                <ErrorMsg msg={errors.email} />
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  autoComplete="off"
                />
                <ErrorMsg msg={errors.password} />
                <Field
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  placeholder="Confirm password"
                  type="password"
                  autoComplete="off"
                />
                <ErrorMsg msg={errors.passwordConfirmation} />
                <Button
                  className="Register-submitBtn"
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting || isLoading}>
                  Submit
                </Button>
                <ErrorMsg msg={authError} />
              </Form>
            )}
          </Formik>
          <div className="Register-bottomText">
            Already have user?{" "}
            <Link to={CONSTANTS.ROUTES.LOGIN_PAGE}>login</Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
