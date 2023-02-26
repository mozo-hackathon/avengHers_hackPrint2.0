import React, { useState } from "react";
import styled from "styled-components";
import InputBox from "../inputbox";
import Buttons from "../buttons";
import { Requests } from "../../utils/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import Spinner from "../Spinner";
const MainContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 70px;
  position: relative;
  :before {
    content: "";
    position: absolute;
    background: #f3e7f3;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  :after {
    content: "";
    position: absolute;
    background: #60a5fa;
    height: 4px;
    width: ${({ width }) => width};
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`;

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const StepStyle = styled.div`
  width: 40px;
  margin-top: 10px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid
    ${({ step }) => (step === "completed" ? "#075985" : "#60a5fa")};
  transition: 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepCount = styled.span`
  font-size: 19px;
  color: #000000;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const StepsLabelContainer = styled.div`
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StepLabel = styled.span`
  font-size: 19px;
  color: #155e75;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const CheckMark = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #60a5fa;
  -ms-transform: scaleX(-1) rotate(-46deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-46deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-46deg);
`;

const steps = [
  {
    label: "Step1",
    step: 1,
  },
  {
    label: "Step2",
    step: 2,
  },
  {
    label: "Step3",
    step: 3,
  },
];
const totalSteps = steps.length;
export default function Multistep() {
  const [formStep, setFormStep] = React.useState(0);
  const [estimate, setEstimate] = React.useState(0);
  const [formid, setFormid] = React.useState(0);
  const width = `${(100 / (totalSteps - 1)) * (formStep - 1)}%`;
  const [form0, setForm0] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    policyNumber: "",
    bank: "",
    hospital: "",
    periodOfInsurance: "",
  });
  const [form1, setForm1] = useState({
    age: "",
    bmi: "",
    children: "",
    smoker: "",
    illness: "",
    symptoms: "",
    investigation: "",
  });
  const [form2, setForm2] = useState({
    doctorName: "",
    frequencyOfVisits: "",
    qualificationOfDoc: "",
    visitDate: "",
    addressOfHospital: "",
    hospitalContact: "",
    insurerName: "",
    insuranceOfficeLocation: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange0 = (e) => {
    const { name, value } = e.target;
    setForm0({ ...form0, [name]: value });
    // console.log(form0);
  };
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setForm1({ ...form1, [name]: value });
    // console.log(form1);
  };
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setForm2({ ...form2, [name]: value });
    // console.log(form2);
  };
  const prevForm = (e) => {
    e.preventDefault();
    setFormStep((currentStep) => currentStep - 1);
  };

  const validateEmails = (email) => {
    if (validator.isEmail(email)) {
      return true;
    } else {
      return false;
    }
  };
  const nextForm = (e) => {
    e.preventDefault();
    if (formStep === 0) {
      for (const property in form0) {
        if (property === "email") {
          if (!validateEmails(form0.email)) {
            toast.error("Please Enter valid mail");
            return;
          }
        }
        if (property === "phone") {
          if (form0.phone.length < 10) {
            toast.error("Mobile Number must be 10 digit long");
            return;
          }
        }
        console.log(form0[property]);
        if (form0[property] === "") {
          toast.error("Please fill all input fields");
          console.log("error0");
          return;
        }
      }
    }
    if (formStep === 1) {
      for (const property in form1) {
        if (form1[property] === "") {
          toast.error("Please fill all input fields");
          console.log("error1");
          return;
        }
      }
    }
    if (formStep === 2) {
      for (const property in form2) {
        if (form2[property] === "") {
          toast.warn("Please fill all input fields");
          console.log("error2");
          return;
        }
      }
      console.log(form0);
      console.log(form1);
      console.log(form2);
    }

    setFormStep((currentStep) => currentStep + 1);
  };
  const handleSubmit = async (e) => {
    const userId = await localStorage.getItem("userId");
    const userid = { userId: userId };
    const userInfo = await localStorage.getItem("userinfo");
    const obj = Object.assign(userid, form0, form1, form2);
    setLoading(true);
    const value = JSON.stringify(obj);

    Requests.form(value, userInfo)
      .then((res) => {
        toast.success("Form submitted successfully");
        console.log(res.data);
        console.log(res.data._id);
        localStorage.setItem("formid", res.data._id);
        setFormid(res.data._id);
        setLoading(false);
        setFormStep((currentStep) => currentStep + 1);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
        console.log(err);
      });
    e.preventDefault();
  };

  const [claim, setClaim] = useState("");
  const handleGetClaimAmount = async (e) => {
    const userInfo = await localStorage.getItem("userinfo");
    setLoading(true);
    const obj = { id: formid };
    Requests.estimateClaim(obj)
      .then((res) => {
        setClaim(res.data);
        console.log(res.data);
        toast.success("Claim estimated successfully");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
        setLoading(false);
      });
    e.preventDefault();
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <MainContainer>
        <StepContainer width={width}>
          {steps.map(({ step, label }) => (
            <StepWrapper key={step}>
              <StepStyle
                step={formStep + 1 >= step ? "completed" : "incomplete"}
              >
                {formStep + 1 > step ? (
                  <CheckMark>L</CheckMark>
                ) : (
                  <StepCount>{step}</StepCount>
                )}
              </StepStyle>
              <StepsLabelContainer>
                <StepLabel key={step}>{label}</StepLabel>
              </StepsLabelContainer>
            </StepWrapper>
          ))}
        </StepContainer>

        <ToastContainer />
        <div className="border rounded-lg p-10 mx-5 lg:mx-20 my-10">
          <form action="">
            {/* Basic Info */}
            {formStep === 0 && (
              <>
                <p className="req-text">
                  All fields marked with * are compulsory to fill
                </p>
                <InputBox
                  name="name"
                  value={form0.name}
                  type="text"
                  label="Name"
                  placeholder="Name"
                  onChange={(e) => handleInputChange0(e)}
                  required
                />
                <InputBox
                  name="email"
                  value={form0.email}
                  type="email"
                  label="Email"
                  placeholder="Email"
                  onChange={(e) => handleInputChange0(e)}
                  required
                />

                <InputBox
                  name="phone"
                  value={form0.phone}
                  type="text"
                  label="Phone"
                  placeholder="Phone"
                  onChange={(e) => handleInputChange0(e)}
                  required
                />
                <InputBox
                  name="dob"
                  value={form0.dob}
                  type="text"
                  label="Date of Birth"
                  placeholder="DD/MM/YYYY"
                  onChange={(e) => handleInputChange0(e)}
                  required
                />

                <div className="ml-1 w-1/2">
                  <p className="input-label font-medium  text-black text-lg">
                    Gender <span className="req-text"> *</span>
                  </p>
                  <div className="relative w-full lg:w-full block px-0  text-sm">
                    <select
                      name="gender"
                      onChange={(event) => handleInputChange0(event)}
                      className="w-full h-14 bg-gray100 font-gilroy text-gold text-lg px-3 outline-0 border-1 border-transparent rounded-xl hover:border-light_blue focus:border-transparent focus:ring-1 focus:ring-light_blue focus:bg-gray100 /20"
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="" selected disabled className="text-white">
                        Select
                      </option>
                    </select>
                  </div>
                </div>
                <InputBox
                  name="address"
                  value={form0.address}
                  type="text"
                  label="Address"
                  placeholder="Address"
                  onChange={(e) => handleInputChange0(e)}
                  required
                />
                <InputBox
                  name="policyNumber"
                  value={form0.policyNumber}
                  type="number"
                  label="Policy Number"
                  placeholder="Policy Number"
                  onChange={(e) => handleInputChange0(e)}
                  required
                />
                <div className="relative z-0  w-full group">
                  <p className="input-label font-medium mb-3 text-black text-lg">
                    Bank <span className="req-text"> *</span>
                  </p>
                  <div className="relative w-full lg:w-full block px-0  text-sm">
                    <select
                      name={"bank"}
                      value={form0.bank}
                      onChange={(e) => handleInputChange0(e)}
                      className="w-full h-14 bg-gray100  font-gilroy text-gold text-lg px-3 outline-0 border-1 border-transparent rounded-xl hover:border-light_blue focus:border-transparent focus:ring-1 focus:ring-light_blue focus:bg-gray100 /20"
                      required
                    >
                      <option value="b1">State Bank of India</option>
                      <option value="b2">Axis Bank</option>
                      <option value="b3">HDFC Bank</option>
                      <option value="" selected disabled className="text-white">
                        Select
                      </option>
                    </select>
                  </div>
                </div>
                <div className="relative z-0  w-full group">
                  <p className="input-label font-medium mb-3 text-black text-lg">
                    Hospital <span className="req-text"> *</span>
                  </p>
                  <div className="relative w-full lg:w-full block px-0  text-sm">
                    <select
                      name={"hospital"}
                      value={form0.hospital}
                      onChange={(e) => handleInputChange0(e)}
                      className="w-full h-14 bg-gray100  font-gilroy text-gold text-lg px-3 outline-0 border-1 border-transparent rounded-xl hover:border-light_blue focus:border-transparent focus:ring-1 focus:ring-light_blue focus:bg-gray100 /20"
                      required
                    >
                      <option value="H1">Nobel Hospital</option>
                      <option value="H2">Bhartividyapeeth Hospital</option>
                      <option value="H3">Army Hospital</option>
                      <option value="" selected disabled className="text-white">
                        Select
                      </option>
                    </select>
                  </div>
                </div>
                <InputBox
                  name="periodOfInsurance"
                  value={form0.periodOfInsurance}
                  type="text"
                  label="Period of Insurance"
                  placeholder="Period of Insurance"
                  onChange={(e) => handleInputChange0(e)}
                  required
                />
              </>
            )}
            {/* Health Part 1 */}
            {formStep === 1 && (
              <>
                <p className="req-text">
                  All fields marked with * are compulsory to fill
                </p>
                <InputBox
                  name="age"
                  value={form1.age}
                  type="number"
                  label="Age"
                  placeholder="Age"
                  onChange={(e) => handleInputChange1(e)}
                />
                <InputBox
                  name="bmi"
                  value={form1.bmi}
                  type="number"
                  label="BMI"
                  placeholder="Body Mass Index"
                  onChange={(e) => handleInputChange1(e)}
                />
                <InputBox
                  name="children"
                  value={form1.children}
                  type="number"
                  label="Children"
                  placeholder="Number of children"
                  onChange={(e) => handleInputChange1(e)}
                />
                <div className="relative z-0  w-full group">
                  <p className="input-label font-medium mb-3 text-black text-lg">
                    Are you a Smoker <span className="req-text"> *</span>
                  </p>
                  <div className="relative w-full lg:w-full block px-0  text-sm">
                    <select
                      name={"smoker"}
                      value={form1.smoker}
                      onChange={(e) => handleInputChange1(e)}
                      className="w-full h-14 bg-gray100  font-gilroy text-gold text-lg px-3 outline-0 border-1 border-transparent rounded-xl hover:border-light_blue focus:border-transparent focus:ring-1 focus:ring-light_blue focus:bg-gray100 /20"
                    >
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                      <option value="" selected disabled className="text-white">
                        Select
                      </option>
                    </select>
                  </div>
                </div>

                <div className="relative z-0  w-full group">
                  <p className="input-label font-medium mb-3 text-black text-lg">
                    Diagnosis of Illness <span className="req-text"> *</span>
                  </p>
                  <div className="relative w-full lg:w-full block px-0  text-sm">
                    <select
                      name={"illness"}
                      value={form1.illness}
                      onChange={(e) => handleInputChange1(e)}
                      className="w-full h-14 bg-gray100  font-gilroy text-gold text-lg px-3 outline-0 border-1 border-transparent rounded-xl hover:border-light_blue focus:border-transparent focus:ring-1 focus:ring-light_blue focus:bg-gray100 /20"
                    >
                      <option value="1">Heart Attack</option>
                      <option value="2">Cancer</option>
                      <option value="3">Kidney</option>
                      <option value="4">Lungs</option>
                      <option value="" selected disabled className="text-white">
                        Select
                      </option>
                    </select>
                  </div>
                </div>

                <InputBox
                  name="symptoms"
                  value={form1.symptoms}
                  type="text"
                  label="Signs and symptoms of illness"
                  placeholder="Signs and symptoms of illness"
                  onChange={(e) => handleInputChange1(e)}
                />
                <InputBox
                  name="symptomsNoticeDate"
                  value={form1.symptomsNoticeDate}
                  type="text"
                  label="When did you first notice signs and symptoms of the illness?"
                  placeholder="Days/Months/Years ago"
                  onChange={(e) => handleInputChange1(e)}
                />
                <InputBox
                  name="investigation"
                  value={form1.investigation}
                  type="text"
                  label="Brief details of Investigation done with the results confirming diagnosis"
                  placeholder="Description"
                  onChange={(e) => handleInputChange1(e)}
                />
              </>
            )}
            {formStep === 2 && (
              <>
                <p className="req-text">
                  All fields marked with * are compulsory to fill
                </p>
                <InputBox
                  name="insurerName"
                  value={form2.insurerName}
                  type="text"
                  label="Name of the Insurer"
                  placeholder="Description"
                  onChange={(e) => handleInputChange2(e)}
                />
                <InputBox
                  name="doctorName"
                  value={form2.doctorName}
                  type="text"
                  label="Name of the Doctor consulted first"
                  placeholder="Description"
                  onChange={(e) => handleInputChange2(e)}
                />
                <InputBox
                  name="visitDate"
                  value={form2.visitDate}
                  type="text"
                  label="Date of visit in this regard"
                  placeholder="Description"
                  onChange={(e) => handleInputChange2(e)}
                />
                <InputBox
                  name="frequencyOfVisits"
                  value={form2.frequencyOfVisits}
                  type="text"
                  label="Frequency of visits"
                  placeholder="Description"
                  onChange={(e) => handleInputChange2(e)}
                />
                <InputBox
                  name="qualificationOfDoc"
                  value={form2.qualificationOfDoc}
                  type="text"
                  label="Qualification of treating Doctor"
                  placeholder="Description"
                  onChange={(e) => handleInputChange2(e)}
                />
                <InputBox
                  name="addressOfHospital"
                  value={form2.addressOfHospital}
                  type="text"
                  label="Address of the Hospital"
                  placeholder="Description"
                  onChange={(e) => handleInputChange2(e)}
                />
                <InputBox
                  name="hospitalContact"
                  value={form2.hospitalContact}
                  type="text"
                  label="Contact Details "
                  placeholder="Description"
                  onChange={(e) => handleInputChange2(e)}
                />
                <InputBox
                  name="insuranceOfficeLocation"
                  value={form2.insuranceOfficeLocation}
                  type="text"
                  label="Insurance Office location"
                  placeholder="Description"
                  onChange={(e) => handleInputChange2(e)}
                />
              </>
            )}
            <div className="flex justify-between">
              {formStep > 0 && formStep < 3 ? (
                <Buttons
                  className="mx-2 my-2"
                  value=" Previous Step"
                  onClick={prevForm}
                />
              ) : (
                ""
              )}

              {formStep === 2 ? (
                <Buttons
                  className=" mx-2 my-2 p-1 "
                  value="Submit"
                  onClick={handleSubmit}
                />
              ) : (
                formStep < 2 && (
                  <Buttons
                    className=" mx-2 my-2 p-1 "
                    value="Next Step"
                    onClick={nextForm}
                  />
                )
              )}

              {formStep === 3 && (
                <>
                  <h1 className="text-gold text-3xl">
                    Thank you for filling the form!!!
                  </h1>
                  <div className=" items-baseline justify-center py-3">
                    <button
                      className="text-xl p-3 px-10 text-black font-semibold border border-transparent rounded-xl bg-blue400 transition-all duration-300 hover:text-black hover:border-blue400 hover:bg-blue400/10"
                      type="button"
                      onClick={handleGetClaimAmount}
                    >
                      Get Claim Amount
                    </button>
                  </div>
                  {claim.length > 0 ? (
                    <>
                      <h1 className="text-lg p-8">
                        <a
                          className="text-2xl hover:underline text-black"
                          href="#"
                        >
                          Your Claim amount is Rs. {Math.round(claim) * 83}
                        </a>
                      </h1>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </MainContainer>
    </>
  );
}
