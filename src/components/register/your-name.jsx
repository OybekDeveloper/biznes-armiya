import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../reducer/event";

const YourName = () => {
  const { registerData, regsiterDataError } = useSelector(
    (state) => state.event
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number to only accept digits and + symbol
    if (name === "phone_number") {
      const phoneRegex = /^[+\d]*$/;
      if (!phoneRegex.test(value)) {
        return;
      }
    }

    dispatch(Action.postRegisterSlice({ name, value }));
  };

  return (
    <>
      <h1 className="text-black clamp2 font-bold text-center">
        F.I.SH & Telefon raqamni tasdiqlash
      </h1>
      <main className="flex flex-col gap-4">
        <form className="w-full flex flex-col gap-[20px]">
          <div>
            <label
              className="text-[14px] font-[700] text-thin"
              htmlFor="first_name"
            >
              Ism
            </label>
            <input
              onChange={handleChange}
              id="first_name"
              className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
              type="text"
              placeholder="Ismingizni kiriting..."
              name="first_name"
              value={registerData?.first_name}
            />
            {regsiterDataError?.first_name && (
              <p className="text-red-500">{regsiterDataError?.first_name}</p>
            )}
          </div>
          <div>
            <label
              className="text-[14px] font-[700] text-thin"
              htmlFor="last_name"
            >
              Familya
            </label>
            <input
              onChange={handleChange}
              className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
              type="text"
              placeholder="Familyangizni kiriting..."
              id="last_name"
              name="last_name"
              value={registerData?.last_name}
            />
            {regsiterDataError?.last_name && (
              <p className="text-red-500">{regsiterDataError?.last_name}</p>
            )}
          </div>
          <div>
            <label
              className="text-[14px] font-[700] text-thin"
              htmlFor="phone_number"
            >
              Telefon raqam
            </label>
            <input
              onChange={handleChange}
              className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
              type="tel"
              placeholder="+998919998090"
              id="phone_number"
              name="phone_number"
              value={registerData?.phone_number}
            />
            {regsiterDataError?.phone_number && (
              <p className="text-red-500">{regsiterDataError?.phone_number}</p>
            )}
          </div>
        </form>
      </main>
    </>
  );
};

export default YourName;
