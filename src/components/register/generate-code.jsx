import React, { useState } from "react";
import { ApiService } from "../api.server";
import { useDispatch, useSelector } from "react-redux";
import { verifyGemerateCode } from "../../reducer/event";
const GenerateCode = () => {
  const { regsiterDataError } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const handleCheckGenerateCode = (e) => {
    const { value } = e.target;
    dispatch(verifyGemerateCode(value));
  };
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-black clamp2 font-bold text-center">
        Valid your email
      </h1>
      <form action="" className="w-full flex flex-col gap-[20px]">
        <div>
          <label
            className="text-[14px] font-[700] text-thin"
            htmlFor="generate"
          >
            Generate code
          </label>
          <input
            onChange={handleCheckGenerateCode}
            className="px-[18px] py-[12px] w-full border-[2px] border-solid border-primary rounded-[14px] outline-none focus:border-primary"
            type="text"
            placeholder="dsd2Afg..."
            id="generate"
          />
          {regsiterDataError.generate_code && (
            <p className="text-red-500">{regsiterDataError.generate_code}</p>
          )}
        </div>
      </form>
    </main>
  );
};

export default GenerateCode;
