import React from "react";

const Steps = ({ steps, activeStep }) => {
  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`w-10 h-10 flex items-center justify-center text-white font-medium ${
            activeStep === index
              ? "bg-indigo-500 rounded-full"
              : "bg-gray-300 rounded-full"
          }`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Steps;