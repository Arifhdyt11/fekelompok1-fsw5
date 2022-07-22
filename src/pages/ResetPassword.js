import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function ResetPassword() {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 offset-sm-2 mt-5">
          <div className="card m-3">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <h3 className="card-header py-4 px-4">Reset Password</h3>
                  <div className="card-body p-4">
                    <div className="form-group mb-3">
                      <label>Password</label>
                      <Field
                        name="password"
                        type="password"
                        className={
                          "form-control" +
                          (errors.password && touched.password
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Confirm Password</label>
                      <Field
                        name="confirmPassword"
                        type="password"
                        className={
                          "form-control" +
                          (errors.confirmPassword && touched.confirmPassword
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-row mt-4">
                      <div className="form-group col">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary"
                        >
                          {isSubmitting && (
                            <span className="spinner-border spinner-border-sm mr-1"></span>
                          )}
                          Reset Password
                        </button>
                        <Link to="/login" className="btn btn-link">
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
