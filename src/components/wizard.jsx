import React, {useState} from "react";
import { useStepperContext } from "./contexts/StepperContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


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
          let confirmPassword = data["confirmpassword"]
          let lastName = data["lastName"]
          // let city = data["city"]
          // let country = data["country"]
          let phoneNumber = data["phoneNumber"]
          let storeName = data["storeName"]
          let gender = 'Female'
          // let description = data["description"]
          console.log(`json: ${JSON.stringify({ username,email, password, firstName, lastName, phoneNumber, storeName, gender })}`)
          if(!username || username === "") {
            setError(true);
            toast.info('Enter your username in first step', {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
          });
          }
          if(!email || email === "") {
            setError(true);
            toast.info('Enter your Email in first step', {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
          });
          }
          if(!password || password === "") {
            setError(true);
            toast.info('Enter your password in first step', {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
          });
          }
          if(!confirmPassword || confirmPassword === "") {
            setError(true);
            toast.info('Enter your confirm password in first step', {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
          });
          }
          if(confirmPassword !== password) {
            setError(true);
            toast.info('Password do not match', {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
          });
          }
          if(!firstName || firstName === "") {
            setError(true);
            toast.info('Enter your first name in second step', {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
          });
        }
          if(!lastName || lastName === "") {
            setError(true);
            toast.info('Enter your last name in second step', {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
          });
          }
          if(!phoneNumber || phoneNumber === "") {
            setError(true);
            toast.info('Enter your phone number in second step', {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
          });
          }
          if(!storeName || storeName === "") {
            setError(true);
            toast.info('Enter your company name in third step', {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
          });
          }
          if(error) {
              try {
                setLoading(true);
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
                setLoading(false);
                // setSuccess(true);
              } catch (err) {
                setLoading(false);
                if (!err?.response) {
                  toast.error('No Server Response', {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "colored",
                });
                } else {
                  toast.error(err.response?.data['message'], {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "colored",
                });
                }
              }
            
          }
      };

      const displayStep = (step) => {
        switch (step) {
          case 1:
            return <Account onSubmit={handleSubmit}/>;
          case 2:
            return <Details onSubmit={handleSubmit} />;
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
              className="mt-6 text-center text-5xl font-bold tracking-tight text-violet-700 font-skranji">Payment Island</h1>
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
                <ToastContainer />

      </div>
    );
}