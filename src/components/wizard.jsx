import React, {useState} from "react";

import Account from './steps/Account';
import Details from './steps/Details';
import Company from './steps/Company';
import Stepper from './stepper';
import { UseContextProvider } from "./contexts/StepperContext";
import StepperControl from './StepperControl';
import { useNavigate } from "react-router-dom";


export default function Wizard() {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/dashboard'; 
    navigate(path);
  }

    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        "Account Information",
        "Personal Details",
        "Company Details",
      ];

      const displayStep = (step) => {
        switch (step) {
          case 1:
            return <Account />;
          case 2:
            return <Details />;
          case 3:
            return <Company />;
          default:
        }
      };
      const handleClick = (direction) => {
        let newStep = currentStep;
    
        direction === "next" ? newStep++ : direction === "submit" ?  navigate('/dashboard') : newStep--;

        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
      };
    return (
        <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
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