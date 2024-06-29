import React from "react";
import { MdInfo } from "react-icons/md";

const EmailValid = () => {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-black clamp2 font-bold text-center">Valid your email</h1>
      <form action="" className="w-full flex flex-col gap-[20px]">
        <div>
          <label className="text-[14px] font-[700] text-thin" htmlFor="text">
            Email Address
          </label>
          <input
            className="px-[18px] py-[12px] w-full border-[2px] border-solid border-[#D8E0F0] rounded-[14px] outline-none focus:border-primary"
            type="text"
            placeholder="youremail@gmail.com"
          />
        </div>
        <div className="bg-[#faf9fd] py-[21px] px-[12px] rounded-[14px] flex justify-around items-center">
        <MdInfo className="clamp3 text-primary"/>
          <h1 className="clamp4 text-primary font-[500]">SMS has been sent to your email</h1>
        </div>
        <div>
          <label className="text-[14px] font-[700] text-thin" htmlFor="text">
          Code from SMS
          </label>
          <input
            className="px-[18px] py-[12px] w-full border-[2px] border-solid border-[#D8E0F0] rounded-[14px] outline-none focus:border-primary"
            type="text"
            placeholder="1234"
          />
        </div>
      </form>
    </main>
  );
};

export default EmailValid;
