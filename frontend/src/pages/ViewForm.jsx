import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import { Requests } from "../utils/index";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputBox from "../components/inputbox";
import Buttons from "../components/buttons";
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

export default function ViewForm() {
  const location = useLocation();
  const { formid } = location.state;
  const [formStep, setFormStep] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const width = `${(100 / (totalSteps - 1)) * (formStep - 1)}%`;
  const [form, setForm] = useState([]);
  const [claim, setClaim] = useState("");
  

  const nextForm = (e) => {
    e.preventDefault();
    setFormStep((currentStep) => currentStep + 1);
  };

  const prevForm = (e) => {
    e.preventDefault();
    setFormStep((currentStep) => currentStep - 1);
  };
  const handleGetForm = async (e) => {
    const userInfo = await localStorage.getItem("userinfo");
    console.log(userInfo);
    setLoading(true);
    Requests.getFormById(formid, userInfo)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
        setLoading(false);
      });
    e.preventDefault();
  };


  const handleGetClaimAmount = async (e) => {
    const userInfo = await localStorage.getItem("userinfo");
    setLoading(true);
    const obj = {id: formid}
    Requests.estimateClaim(obj)
      .then((res) => {
        setClaim(res.data);
        console.log(res.data);
        toast.success("Claim estimated successfully")
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
        setLoading(false);
      });
      e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);
    handleGetForm();
    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
    
      <MainContainer>
        {console.log(form)}
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
                  value={form.name}
                  type="text"
                  label="Name"
                  placeholder={form.name}
                  required
                  disabled
                />
                <InputBox
                  name="email"
                  value={form.email}
                  type="email"
                  label="Email"
                  placeholder={form.email}
                  required
                  disabled
                />

                <InputBox
                  name="phone"
                  value={form.phone}
                  type="text"
                  label="Phone"
                  placeholder={form.phone}
                  disabled
                  required
                />
                <InputBox
                  name="dob"
                  value={form.dob}
                  type="text"
                  label="Date of Birth"
                  placeholder={form.dob}
                  disabled
                  required
                />
                <InputBox
                  name="gender"
                  value={form.gender}
                  type="text"
                  label="Date of Birth"
                  placeholder={form.gender}
                  disabled
                  required
                />
                <InputBox
                  name="address"
                  value={form.address}
                  type="text"
                  label="Address"
                  placeholder={form.address}
                  disabled
                  required
                />
                <InputBox
                  name="policyNumber"
                  value={form.policyNumber}
                  type="number"
                  label="Policy Number"
                  placeholder={form.policyNumber}
                  disabled
                  required
                />
                <InputBox
                  name="bank"
                  value={form.bank}
                  type="text"
                  label="Bank"
                  placeholder={form.bank}
                  disabled
                  required
                />
                <InputBox
                  name="hospital"
                  value={form.hospital}
                  type="text"
                  label="Hospital Name"
                  placeholder={form.hospital}
                  disabled
                  required
                />

                <InputBox
                  name="periodOfInsurance"
                  value={form.periodOfInsurance}
                  type="text"
                  label="Period of Insurance"
                  placeholder={form.periodOfInsurance}
                  disabled
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
                  value={form.age}
                  type="number"
                  label="Age"
                  placeholder={form.age}
                  disabled
                />
                <InputBox
                  name="bmi"
                  value={form.bmi}
                  type="number"
                  label="BMI"
                  placeholder={form.bmi}
                  disabled
                />
                <InputBox
                  name="children"
                  value={form.children}
                  type="number"
                  label="Children"
                  placeholder={form.children}
                  disabled
                />
                <InputBox
                  name="smoker"
                  value={form.smoker}
                  type="number"
                  label="Are you a Smoker"
                  placeholder={form.smoker}
                  disabled
                />
                <InputBox
                  name="illness"
                  value={form.illness}
                  type="number"
                  label="Diagnosis of Illness"
                  placeholder={form.illness}
                  disabled
                />
                <InputBox
                  name="symptoms"
                  value={form.symptoms}
                  type="text"
                  label="Signs and symptoms of illness"
                  placeholder={form.symptoms}
                  disabled
                />
                <InputBox
                  name="symptomsNoticeDate"
                  value={form.symptomsNoticeDate}
                  type="text"
                  label="When did you first notice signs and symptoms of the illness?"
                  placeholder={form.symptomsNoticeDate}
                  disabled
                />
                <InputBox
                  name="investigation"
                  value={form.investigation}
                  type="text"
                  label="Brief details of Investigation done with the results confirming diagnosis"
                  placeholder={form.investigation}
                  disabled
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
                  value={form.insurerName}
                  type="text"
                  label="Name of the Insurer"
                  placeholder={form.insurerName}
                  disabled
                />
                <InputBox
                  name="doctorName"
                  value={form.doctorName}
                  type="text"
                  label="Name of the Doctor consulted first"
                  placeholder={form.doctorName}
                  disabled
                />
                <InputBox
                  name="visitDate"
                  value={form.visitDate}
                  type="text"
                  label="Date of visit in this regard"
                  placeholder={form.visitDate}
                  disabled
                />
                <InputBox
                  name="frequencyOfVisits"
                  value={form.frequencyOfVisits}
                  type="text"
                  label="Frequency of visits"
                  placeholder={form.frequencyOfVisits}
                  disabled
                />
                <InputBox
                  name="qualificationOfDoc"
                  value={form.qualificationOfDoc}
                  type="text"
                  label="Qualification of treating Doctor"
                  placeholder={form.qualificationOfDoc}
                  disabled
                />
                <InputBox
                  name="addressOfHospital"
                  value={form.addressOfHospital}
                  type="text"
                  label="Address of the Hospital"
                  placeholder={form.addressOfHospital}
                  disabled
                />
                <InputBox
                  name="hospitalContact"
                  value={form.hospitalContact}
                  type="text"
                  label="Contact Details "
                  placeholder={form.hospitalContact}
                  disabled
                />
                <InputBox
                  name="insuranceOfficeLocation"
                  value={form.insuranceOfficeLocation}
                  type="text"
                  label="Insurance Office location"
                  placeholder={form.insuranceOfficeLocation}
                  disabled
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
                  value="Get Claim amount"
                  onClick={nextForm}
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
                  <div className="flex items-baseline justify-center py-3">
                    <button
                      className="text-xl p-3 px-10 text-black font-semibold border border-transparent rounded-xl bg-blue400 transition-all duration-300 hover:text-black hover:border-blue400 hover:bg-blue400/10"
                      type="button"
                      onClick={ handleGetClaimAmount}
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
