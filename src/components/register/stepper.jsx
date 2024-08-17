import React, { useEffect, useRef, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newStep = [...steps];
    let count = 0;
    while (count < newStep.length) {
      if (count === stepNumber) {
        newStep[count] = {
          ...newStep[count],
          heighlighted: true,
          selected: false,
          completed: false,
          active: true,
        };
        count++;
      } else if (count < stepNumber) {
        newStep[count] = {
          ...newStep[count],
          heighlighted: false,
          selected: true,
          completed: true,
          active: false,
        };
        count++;
      } else {
        newStep[count] = {
          ...newStep[count],
          heighlighted: false,
          selected: false,
          completed: false,
          active: false,
        };
        count++;
      }
    }
    return newStep;
  };

  useEffect(() => {
    const stepState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          active: index === 0 ? true : false,
          completed: false,
          heighlighted: false,
          selected: index === 0 ? true : false,
        }
      )
    );
    stepRef.current = stepState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep?.map((step, index) => {
    return (
      <div
        key={index}
        className="w-full flex flex-col justify-start items-start gap-3"
      >
        <div className="relative flex items-center text-[#475467] font-[600] text-[18px] gap-2 ">
          <div
            className={`max-sm:hidden rounded-full flex flex-col items-center justify-center w-[32px] h-[32px] ${
              step.heighlighted
                ? "border-[2px] border-white"
                : step.completed
                ? "text-[#475467]  border-white"
                : "text-[#475467]  border-[#9fc6ff]"
            } bg-[#79afff] border-[2px]`}
          ></div>
          <div className=" text-start  font-[500] text-[#fff]">
            {step.description}
          </div>
        </div>
        {index + 1 < 4 && (
          <div
            className={`${
              !step.completed ? "border-white opacity-[0.5]" : "border-white"
            }
          ${
            step.heighlighted
              ? "border-white"
              : step.completed
              ? "border-white"
              : "max-sm:border-[#98A2B3] max-sm:text-[#475467]"
          }
          &{} 
          border-l-[2px] flex-auto w-[32px] h-[32px] ml-[16px]`}
          ></div>
        )}
      </div>
    );
  });

  return (
    <div className="flex flex-col justify-between items-center gap-3 px-3">
      {displaySteps}
    </div>
  );
};

export default Stepper;
