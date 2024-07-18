import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { lightLogo, loginbgsvg, whiterightarrow } from "../../images";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader1 from "../loader/loader1";
import { ApiService } from "../api.server";
import toast from "react-hot-toast";

const Login = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const [errorMessage, setErrorMessage] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");

    const fetchLogin = async () => {
      try {
        const res = await ApiService.postRegisterData("/login", formData);
        setErrorMessage();
        localStorage.setItem("register", JSON.stringify(res));
        navigate("/");
        toast.success("You have successfully logged in!", { id: toastId });
      } catch (error) {
        setErrorMessage(error?.response?.data);
        toast.error("Login failed, please try again.", {
          id: toastId,
        });
      }
    };
    fetchLogin();
  };

  const handleChange = (e) => [
    setFormData({ ...formData, [e.target.name]: e.target.value }),
  ];

  useEffect(() => {
    if (register) {
      navigate("/");
    }
  }, [register]);

  if (register) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loader1 />
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | Biznes Armiya</title>
        <link rel="icon" href="/" />
      </Helmet>
      <main className="flex max-md:flex-col max-md:justify-center max-md:h-screen max-md:items-center h-full md:h-[calc(100vh-40px)] px-[20px] md:px-[40px] py-[20px] bg-bg_primary">
        <section className="max-md:hidden w-1/2 h-full bg-primary rounded-l-[24px] flex flex-col justify-center items-center gap-[32px]">
          <div className="flex justify-start items-center">
            <img className="w-20 h-20" src={lightLogo} alt="logo" />
            <h1 className="text-3xl text-white font-bold">Biznes Armiya</h1>
          </div>
          <h1 className="clamp3 font-[700] text-white text-center">
            Your place to work Plan. Create. Control.
          </h1>
          <img src={loginbgsvg} alt="" />
        </section>
        <section className="md:hidden flex justify-center items-center">
          <img className="w-20 h-20" src={lightLogo} alt="logo" />
          <h1 className="text-3xl font-[700] text-primary">Biznes Armiya</h1>
        </section>
        <section className="md:rounded-r-[24px] max-md:shadow-custom md:w-1/2 w-full md:h-full md:bg-white max-md:rounded-[24px] max-md:py-[26px]">
          <div className="mx-auto w-11/12 md:w-[80%] lg:w-[60%] h-full flex flex-col justify-center items-center gap-[33px]">
            <h1 className="text-[#0A1629] text-[22px] font-[700]">
              Sign In to Woorkroom
            </h1>
            <form action="" className="w-[300px] flex flex-col gap-[16px]">
              {errorMessage?.non_field_errors && (
                <p className="text-red-500">
                  Your email or password is incorrect
                </p>
              )}
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
                  value={formData?.email}
                  name="email"
                  placeholder="youremail@gmail.com"
                />
                {errorMessage?.email && (
                  <p className="text-red-500">{errorMessage?.email}</p>
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
                  value={formData?.password}
                  name="password"
                />
                {errorMessage?.password && (
                  <p className="text-red-500">{errorMessage?.password}</p>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="px-[40px] py-[12px] rounded-[14px] bg-primary text-[16px] font-[600] text-white flex justify-center gap-2"
              >
                Sign In
                <img src={whiterightarrow} alt="" />
              </button>
            </form>
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
