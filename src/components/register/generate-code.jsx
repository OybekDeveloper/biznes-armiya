import React, { useState } from "react";
import { ApiService } from "../api.server";
import { useDispatch, useSelector } from "react-redux";
import { verifyGemerateCode } from "../../reducer/event";
import Loader1 from "../loader/loader1";
import { useTranslation } from "react-i18next";
const GenerateCode = () => {
  const { t } = useTranslation();
  const { regsiterDataError, registerLoading } = useSelector(
    (state) => state.event
  );
  const dispatch = useDispatch();
  const handleCheckGenerateCode = (e) => {
    const { value } = e.target;
    dispatch(verifyGemerateCode(value));
  };
  return (
    <>
      {registerLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center flex-col z-10">
          <div className="flex justify-center items-center flex-col gap-4">
            <Loader1 />
          </div>
        </div>
      )}
      <main className="flex flex-col gap-4">
        <h1 className="text-black clamp2 font-bold text-center">
          {t("register_step3_title")}
        </h1>
        <form action="" className="w-full flex flex-col gap-[20px]">
          <div>
            <label
              className="text-[14px] font-[700] text-thin"
              htmlFor="generate"
            >
              {t("rstep3_input1_label")}
            </label>
            <input
              onChange={handleCheckGenerateCode}
              className="px-[18px] py-[12px] mt-2 w-full border-[2px] border-solid border-primary rounded-[14px] outline-none focus:border-primary"
              type="text"
              placeholder="dsd2Afg..."
              id="generate"
            />
            {regsiterDataError?.generate_code && (
              <p className="text-red-500">{t("rstep3_input1_error")}</p>
            )}
          </div>
        </form>
      </main>
    </>
  );
};

export default GenerateCode;
