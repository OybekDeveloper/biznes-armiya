import React from "react";
import { MdInfo } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../reducer/event";
const EmailValid = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const { registerData, regsiterDataError, registerLoading, registerCode } =
    useSelector((state) => state.event);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(Action.postRegisterSlice({ name, value }));
    localStorage.removeItem("register");
  };
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-black clamp2 font-bold text-center">
        Valid your email
      </h1>
      <form action="" className="w-full flex flex-col gap-[20px]">
        {!register && (
          <>
            <div>
              <label
                className="text-[14px] font-[700] text-thin"
                htmlFor="email"
              >
                Email Address
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
              {regsiterDataError.email && (
                <p className="text-red-500">{regsiterDataError.email}</p>
              )}
            </div>
            <div>
              <label
                className="text-[14px] font-[700] text-thin"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={handleChange}
                className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                type="text"
                placeholder="oybek1234"
                id="password"
                value={registerData?.password}
                name="password"
              />
              {regsiterDataError.password && (
                <p className="text-red-500">{regsiterDataError.password}</p>
              )}
            </div>
          </>
        )}

        {!registerLoading ? (
          register && (
            <>
              <div className="flex bg-background-secondary py-[21px] px-[12px] rounded-[14px] justify-around items-center">
                <MdInfo className="clamp3 text-primary" />
                <h1 className="text-[14px] text-primary font-[500]">
                  SMS has been sent to your email
                </h1>
              </div>
              <div className="">
                <label
                  className="text-[14px] font-[700] text-thin"
                  htmlFor="register_code"
                >
                  Enter code
                </label>
                <input
                  onChange={(e) =>
                    dispatch(Action.verifyEmailSlices(e.target.value))
                  }
                  id="register_code"
                  className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                  type="text"
                  placeholder="123456"
                  name="register_code"
                  value={registerCode}
                />
                {regsiterDataError.register_code && (
                  <p className="text-red-500">
                    {regsiterDataError.register_code}
                  </p>
                )}
              </div>
            </>
          )
        ) : (
          <div>Loading...</div>
        )}
      </form>
    </main>
  );
};

export default EmailValid;
