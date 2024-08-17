import React from "react";
import { useTranslation } from "react-i18next";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const ControlSteps = ({ handleClick, currentStep }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${
        currentStep === 5 && "hidden"
      } absolute bottom-0 left-0 p-4 border-t-hr-color border-t-[2px] w-full flex justify-between items-center`}
    >
      <div></div>
      <button
        type="button"
        onClick={() => handleClick("next")}
        className="py-2 px-4 bg-primary rounded-[12px] flex justify-end items-center shadow-custom"
      >
        <h1 className="text-white font-[500] clamp3">
          {t("register_next_btn")}
        </h1>
        <GrFormNextLink className="text-[32px] text-white font-bold" />
      </button>
    </div>
  );
};

export default ControlSteps;
