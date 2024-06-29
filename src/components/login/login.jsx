import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { loginbgsvg, whiterightarrow } from "../../images";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // const fetchData = async () => {
  //   try {
  //     const res = await axios({
  //       method: "POST",
  //       url: "http://13.60.80.160:8000/api/register",
  //       header: {
  //         accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       data:{
  //         "email": "user11@example.com",
  //         "first_name": "11",
  //         "last_name": "11",
  //         "phone_number": "11",
  //         "password": "st1ring"
  //       }
  //     });
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // fetchData();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | Biznes Armiya</title>
        <link rel="icon" href="/" />
      </Helmet>
      <main className="flex max-md:flex-col max-md:justify-center max-md:items-center h-full md:h-[calc(100vh-40px)] px-[20px] md:px-[40px] py-[20px] bg-bg_primary">
        <section className="max-md:hidden w-1/2 h-full bg-primary rounded-l-[24px] flex flex-col justify-center items-center gap-[32px]">
          <div className="flex justify-start items-center">
            <img src="" alt="logo" />
            <h1 className="clamp2 text-white font-bold">Biznes Armiya</h1>
          </div>
          <h1 className="clamp2 font-[700] text-white">
            Your place to work <br />
            Plan. Create. Control.
          </h1>
          <img src={loginbgsvg} alt="" />
        </section>
        <section className="md:hidden flex justify-center items-center">
          <img src="" alt="sadf" />
          <h1 className="text-[20px] font-[700] text-primary">Biznes Armiya</h1>
        </section>
        <section className="md:rounded-r-[24px] max-md:shadow-custom max-md:mt-[30px] md:w-1/2 w-full md:h-full bg-white max-md:rounded-[24px] max-md:py-[26px]">
          <div className="mx-auto w-11/12 md:w-[80%] lg:w-[60%] h-full flex flex-col justify-center items-center gap-[33px]">
            <h1 className="text-[#0A1629] text-[22px] font-[700]">
              Sign In to Woorkroom
            </h1>
            <form action="" className="w-full flex flex-col gap-[10px]">
              <div>
                <label
                  className="text-[14px] font-[700] text-thin"
                  htmlFor="text"
                >
                  Email Address
                </label>
                <input
                  className="px-[18px] py-[12px] w-full border-[1px] border-solid border-[#D8E0F0] rounded-[14px] "
                  type="text"
                  placeholder="youremail@gmail.com"
                />
              </div>
              <div>
                <label
                  className="text-[14px] font-[700] text-thin"
                  htmlFor="text"
                >
                  Email Address
                </label>
                <input
                  className="px-[18px] py-[12px] w-full border-[1px] border-solid border-[#D8E0F0] rounded-[14px] "
                  type="text"
                  placeholder="youremail@gmail.com"
                />
              </div>
            </form>
            <button className="px-[40px] py-[12px] rounded-[14px] bg-primary text-[16px] font-[600] text-white flex justify-center gap-2">
              Sign In
              <img src={whiterightarrow} alt="" />
            </button>
            <NavLink
              to={"/register"}
              className={"text-primary text-[16px] font-[600]"}
            >
              Don’t have an account?
            </NavLink>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
