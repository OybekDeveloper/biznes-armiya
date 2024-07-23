import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../reducer/event";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const EmailValid = () => {
  const [showPassword, setShowPassword] = useState(true);
  const register = JSON.parse(localStorage.getItem("register"));
  const { registerData, regsiterDataError } = useSelector(
    (state) => state.event
  );
  const dispatch = useDispatch();

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(Action.postRegisterSlice({ name, value }));
    dispatch(Action.postRegisterError());
  };
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-black clamp2 font-bold text-center">
        E-mailni tasqilash
      </h1>
      <form className="w-full flex flex-col gap-[20px]">
        {!register && (
          <>
            <div>
              <label
                className="text-[14px] font-[700] text-thin"
                htmlFor="email"
              >
                E-mail pochta
              </label>
              <input
                onChange={handleChange}
                className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                type="email"
                id="email"
                value={registerData?.email}
                name="email"
                placeholder="youremail@gmail.com"
              />
              {regsiterDataError?.email && (
                <p className="text-red-500">{regsiterDataError?.email}</p>
              )}
            </div>
            <div>
              <label
                className="text-[14px] font-[700] text-thin"
                htmlFor="password"
              >
                Parol
              </label>
              <div className="w-full relative flex items-center">
                <input
                  onChange={handleChange}
                  className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                  type={showPassword ? "password" : "text"}
                  placeholder="*******"
                  id="password"
                  value={registerData?.password}
                  name="password"
                />
                {registerData?.password !== "" &&
                  (showPassword ? (
                    <button
                      className="absolute right-4"
                      onClick={togglePasswordVisibility}
                    >
                      <FaRegEye />
                    </button>
                  ) : (
                    <button
                      className="absolute right-4"
                      onClick={togglePasswordVisibility}
                    >
                      <FaRegEyeSlash />
                    </button>
                  ))}
              </div>
              {regsiterDataError?.password && (
                <p className="text-red-500">{regsiterDataError?.password}</p>
              )}
            </div>
          </>
        )}
      </form>
    </main>
  );
};

export default EmailValid;
