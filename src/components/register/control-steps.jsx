import React from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const ControlSteps = ({ handleClick, currentStep }) => {
  return (
    <div className="absolute bottom-0 left-0 p-4 border-t-[#E4E6E8] border-t-[2px] w-full flex justify-between items-center">
      {currentStep === 1 ? (
        <div></div>
      ) : (
        <button
          className={`flex justify-start items-center gap-3`}
        >
         
        </button>
      )}

      <button
        onClick={() => handleClick("next")}
        className="py-2 px-4 bg-primary rounded-[12px] flex justify-end items-center shadow-custom"
      >
        <h1 className="text-white font-[500] clamp3">Next Step</h1>
        <GrFormNextLink className="text-[32px] text-white font-bold" />
      </button>
    </div>
  );
};

export default ControlSteps;
