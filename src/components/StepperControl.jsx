import { CircularProgress } from '@mui/material';



export default function StepperControl({ handleClick, currentStep, steps, loading }) {
  return (
    <div className="container mt-4 mb-8 flex justify-around">
      <button
        onClick={() => handleClick()}
        className={`cursor-pointer w-40 rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white  ${
          currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
        }`}
      >
        Previous
      </button>
      {loading && <CircularProgress style={{ 'color': '#5B21B6' }}></CircularProgress>}
      {!loading &&  <button
        onClick={() => handleClick(currentStep === steps.length ? "submit" : "next")} 
        className="cursor-pointer w-40 rounded-xl bg-violet-700 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-violet-900 hover:text-white"
      >
        {currentStep === steps.length ? "Submit" : "Next"}
      </button>}
     
    </div>
  );
}
