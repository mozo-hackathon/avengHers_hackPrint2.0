import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { connect } from "react-redux";
import { login, logout } from "../../store/actions";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
const logo = require('../../images/logo.png');
function Nav(props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    navigate("/");
    toast.success("Logout Successfully");
    props.logout();
  };
  let navigate = useNavigate();
  return (
    <div>
      {/* <ToastContainer/> */}
      <nav className="bg-gray700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between">
              <Link to={"/"}>
                <div className="flex-shrink-0">
                  <img
                    className="h-20 w-20 p-2"
                    src={logo}
                    alt="Workflow"
                  />
                </div>
              </Link>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to={"/"}
                    className="text-gray300 hover:bg-gray400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Insurance Claim Portal
                  </Link>
                  <a
                    href="/#about"
                    className=" hover:bg-gray400 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About Us
                  </a>

                  <a
                    href="/#contact"
                    className=" hover:bg-gray400 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact Us
                  </a>
                  <a
                    href="/#faqs"
                    className=" hover:bg-gray400 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    FAQs
                  </a>

                  {props.isAuthenticated ? (
                    <>
                      <a
                        href="/dashboard"
                        className="text-gray300 hover:bg-gray400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Dashboard
                      </a>
                    </>
                  ) : (
                    <></>
                  )}
                  <Link
                    to={props.isAuthenticated ? "/form" : "/auth/login"}
                    className="text-gray300 hover:bg-gray400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Claim
                  </Link>
                  <a
                    href="/webteam"
                    className=" hover:bg-gray400 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    WebTeam
                  </a>

                  <a
                    href=""
                    className="text-gray300 hover:bg-gray400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {" "}
                    {props.isAuthenticated ? (
                      <button onClick={handleLogout}>Logout</button>
                    ) : (
                      <a href="/auth/login">Login/Signup</a>
                    )}
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray inline-flex items-center justify-center p-2 rounded-md text-gray400 hover:text-white hover:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div
                ref={ref}
                className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3"
              >
                <Link
                  to={"/"}
                  className="text-gray300 hover:bg-gray400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Insurance Claim Portal
                </Link>
                <Link
                  to={"/#about"}
                  className=" hover:bg-gray400 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About Us
                </Link>

                <a
                  href="/#contact"
                  className=" hover:bg-gray400 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact Us
                </a>
                <a
                  href="/#faqs"
                  className=" hover:bg-gray400 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  FAQs
                </a>

                {props.isAuthenticated?<><a
                    href="/dashboard"
                    className="text-gray300 hover:bg-gray400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                        Dashboard
                  </a></>:<></>}
                <Link
                  to={props.isAuthenticated ? "/form" : "/auth/login"}
                  className="text-gray300 hover:bg-gray400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Claim
                </Link>
                <a
                  href=""
                  className="text-gray300 hover:bg-gray400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {props.isAuthenticated ? (
                    <button onClick={handleLogout}>Logout</button>
                  ) : (
                    <a href="/auth/login">Login/Signup</a>
                  )}
                </a>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
    userData: state.userData,
  };
}
function mapActionToProps(dispatch) {
  return {
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapActionToProps)(Nav);
