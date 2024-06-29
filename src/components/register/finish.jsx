import React from "react";
import { finishimg } from "../../images";
import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Finish = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <img src={finishimg} alt="" />
      <h1 className="text-black font-bold clamp3">You are successfully registered!</h1>
      <NavLink to={'/'} className="p-3 rounded-[14px] bg-primary flex justify-center items-center gap-3 clamp3 font-bold text-white">
        Let's Start
        <FaArrowRight />
      </NavLink>
    </div>
  );
};

export default Finish;
