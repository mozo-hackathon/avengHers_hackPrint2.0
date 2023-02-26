import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Requests, Validators } from "../../utils/index";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../store/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import validator from "validator";
const Login = (props) => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const validate = Yup.object({
    email: Validators.email,
    password: Validators.password,
  });
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
      <>
       
        <ToastContainer />
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            if (!values.email || !values.password) {
              toast.warn("Please fill all the fields");
              return;
            }
            if (!validateEmails(values.email)) {
              toast.error("Please Enter valid mail");
              return;
            }

            setLoading(true);
            const value = JSON.stringify(values);
            Requests.login(value)
              .then((res) => {
                localStorage.setItem("userinfo", res.data.token);
                localStorage.setItem("userId", res.data._id);
                props.login(res.data);
                toast.success("Logged in");
                setLoading(false);
                navigate("/");
              })
              .catch((err) => {
                setLoading(false);
                console.log(err.response.data.msg);
                toast.error(err.response.data.msg);
              });
          }}
        >
          {(formik) => (
            <div className=" h-screen py-20  my-10">
              <div className="w-80 md:w-[400px] text-center m-auto py-14 justify-center h-min border-auth">
                <h1 className="text-4xl p-4">Login</h1>
                <Form
                  className="p-4 space-y-4 mx-auto "
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <Field
                      className="w-full text-gray-500 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder={"Email"}
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
                  <div>
                    <Field
                      className="w-full text-gray-500 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder={"Password"}
                      name={"password"}
                      type={"password"}
                      onChange={formik.handleChange}
                    />
                    {/* {formik.errors.password && (
                <div className="text-red-500 font-bold">
                  {formik.errors.password}
                </div>
              )} */}
                  </div>
                  <div className="flex items-baseline justify-center py-3">
                    <button
                      className="text-xl p-4 px-8 text-black font-semibold border border-transparent rounded-xl bg-blue400 transition-all duration-300 hover:text-black hover:border-blue400 hover:bg-blue400/10"
                      type="button"
                      onClick={formik.handleSubmit}
                      disabled={loading ? true : false}
                    >
                      {loading ? <>loading..</> : "Login"}
                    </button>
                  </div>
                </Form>
                <p className="link p-1 flex space-x-2 justify-center">
                  <div className="text-xl">Dont have an account? </div>
                  <Link to="/auth/register" className="text-xl text-cyan-500">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          )}
        </Formik>
     
      </>
    </>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
  };
}
function mapActionToProps(dispatch) {
  return {
    login: (userData) => dispatch(login(userData)),
  };
}

export default connect(mapStateToProps, mapActionToProps)(Login);
