import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function ForgotPassword() {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
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
                  <h3 className="card-header py-4 px-4">Forgot Password</h3>
                  <div className="card-body p-4">
                    <div className="form-group">
                      <label>Email</label>
                      <Field
                        name="email"
                        type="text"
                        className={
                          "form-control" +
                          (errors.email && touched.email ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="email"
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
                           Submit
                        </button>
                        <Link to="/login" className="btn btn-link" >
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

export default ForgotPassword;
