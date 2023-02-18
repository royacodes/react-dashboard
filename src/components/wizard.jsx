import React, {useState} from "react";
import { useStepperContext } from "./contexts/StepperContext";

import Account from './steps/Account';
import Details from './steps/Details';
import Company from './steps/Company';
import Stepper from './stepper';
import { UseContextProvider } from "./contexts/StepperContext";
import StepperControl from './StepperControl';
import { useNavigate } from "react-router-dom";
import * as appPath from '../core/path';

import api from '../api/authapi';
const REGISTER_URL = '/auth/signup';


export default function Wizard() {

  const { userData, setUserData } = useStepperContext();


  console.log(`user data: ${userData["email"]}`);
  let navigate = useNavigate(); 

    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        "Account Information",
        "Personal Details",
        "Company Details",
      ];

      const handleSubmit = async () => {
        // e.preventDefault();

        let userData = localStorage.getItem('registerData');
          let data = JSON.parse(userData);
          console.log(`user data: ${data["email"]}`)
          let email = data["email"];
          let username = data["username"]
          let firstName = data["firstName"]
          let password = data["password"]
          let lastName = data["lastName"]
          // let city = data["city"]
          // let country = data["country"]
          let phoneNumber = data["phoneNumber"]
          let storeName = data["companyName"]
          let gender = 'Female'
          // let description = data["description"]
          console.log(`json: ${JSON.stringify({ username,email, password, firstName, lastName, phoneNumber, storeName, gender })}`)
    
        try {
          const response = await api.post(
            REGISTER_URL,
            JSON.stringify({ username,email, password, firstName, lastName, phoneNumber, storeName, gender }),
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: false,
            }
          );
    
          const message = response?.data?.message;
          console.log(`message: ${message}`);
          // setSuccess(true);
        } catch (err) {
          if (!err?.response) {
            // setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
            // setErrMsg('Missing Username or Password');
          } else if (err.response?.status === 401) {
            // setErrMsg('Unauthorized');
          } else {
            // setErrMsg('Login Failed');
          }
          // errRef.current.focus();
        }
      };

      const displayStep = (step) => {
        switch (step) {
          case 1:
            return <Account onSubmit={handleSubmit}/>;
          case 2:
            return <Details />;
          case 3:
            return <Company />;
          default:
        }
      };
      const handleClick = (direction) => {
        let newStep = currentStep;

        if(direction ==="submit") {
          handleSubmit();
        }
    
        direction === "next" ? newStep++ : newStep--;

        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
      };
    return (
        <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
          <h1
              className="mt-6 text-center text-5xl font-bold tracking-tight text-violet-700 font-passion">PaymentIsland</h1>
        {/* Stepper */}
        <div className="horizontal container mt-5 ">
          <Stepper steps={steps} currentStep={currentStep} />
  
          <div className="my-10 p-10 ">
            <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
          </div>
        </div>
  
        {/* navigation button */}
        {currentStep !== steps.length+1 && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    );
}