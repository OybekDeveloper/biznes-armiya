import React from "react";

const GenerateCode = () => {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-black clamp2 font-bold text-center">
        Valid your email
      </h1>
      <form action="" className="w-full flex flex-col gap-[20px]">
        <div>
          <label className="text-[14px] font-[700] text-thin" htmlFor="text">
          Generate code
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

export default GenerateCode;
