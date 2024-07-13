import React from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const ControlSteps = ({ handleClick, currentStep }) => {
  return (
    <div
      className={`${
        currentStep === 4 && "hidden"
      } absolute bottom-0 left-0 p-4 border-t-hr-color border-t-[2px] w-full flex justify-between items-center`}
    >
      <div></div>
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
