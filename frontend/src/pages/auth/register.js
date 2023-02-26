import React, { useState } from "react";
import { Form, Field } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Requests } from "../../utils/index";
import { login } from "../../store/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import validator from "validator";
import Spinner from "../../components/Spinner";
const Register = (props) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const validateEmails = (email) => {
    if (validator.isEmail(email)) {
      return true;
    } else {
      return false;
    }
  };

  if(loading){
    return <Spinner/>
  }
  return (
    <>
    
      <ToastContainer />
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          phone: "",
        }}
        onSubmit={async (values) => {
          if (
            !values.email ||
            !values.password ||
            !values.phone ||
            !values.name
          ) {
            toast.warn("Please fill all the fields");
            return;
          }
          if (!validateEmails(values.email)) {
            toast.error("Please Enter valid mail");
            return;
          }
          if (values.password.length < 6) {
            toast.error("Password length must be minimum 6");
            return;
          }
          setLoading(true);
          const value = JSON.stringify(values);
          Requests.register(value)
            .then((res) => {
              toast.success("Login Successful");
              setLoading(false);
              console.log(value);
              props.login(value);
              navigate("/auth/login");
            })
            .catch((err) => {
              setLoading(false);
              toast.error(err.response.data.msg);
              console.log(err.response.data.msg);
            });
        }}
      >
        {(formik) => (
          <div className="w-full min-h-scree py-20 px-20 my-10">
            <div className="w-80 md:w-[400px] text-center m-auto py-14 justify-center h-min border-auth">
              <h1 className="text-4xl p-4">Register</h1>
              <Form
                className="p-4 space-y-4 mx-auto "
                onSubmit={formik.handleSubmit}
              >
                <div className="">
                  <Field
                    className="w-full text-gray-500 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder={"First Name"}
                    name={"name"}
                    type={"name"}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="">
                  <Field
                    className="w-full text-gray-500 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder={"email"}
                    name={"email"}
                    type={"email"}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && (
                    <div className="text-red-500 font-bold">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="">
                  <Field
                    className="w-full text-gray-500 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder={"Password"}
                    name={"password"}
                    type={"password"}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && (
                    <div className="text-red-500 font-bold">
                      {formik.errors.password}
                    </div>
                  )}
                </div>

                <div className="">
                  <Field
                    className="w-full text-gray-500 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder={"Phone number"}
                    name={"phone"}
                    type={"Number"}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="flex items-baseline justify-center py-3">
                  <button
                    className="text-xl p-4 px-8 text-black font-semibold border border-transparent rounded-xl bg-blue400 transition-all duration-300 hover:text-black hover:border-blue400 hover:bg-blue400/10"
                    type="button"
                    onClick={formik.handleSubmit}
                    disabled={loading ? true : false}
                  >
                    {loading ? <>loading..</> : "Register"}
                  </button>
                </div>
              </Form>
              <p className="link p-1 flex space-x-2 justify-center">
                <div className="text-xl">Already have an account? </div>
                <Link to="/auth/login" className="text-xl text-cyan-500">
                  Login
                </Link>
              </p>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
