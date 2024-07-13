import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Stepper from "./stepper";
import ControlSteps from "./control-steps";
import EmailValid from "./email-valid";
import YourName from "./your-name";
import GenerateCode from "./generate-code";
import Finish from "./finish";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../reducer/event";
import { ApiService } from "../api.server";
import { NavLink, useNavigate } from "react-router-dom";
import Loader1 from "../loader/loader1";
const Register = () => {
  const register = localStorage.getItem("register");
  const yourGroup = localStorage.getItem("your-group");
  const navigate = useNavigate();
  const { registerData, registerCode, generateCode } = useSelector(
    (state) => state.event
  );
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Valid your email", "Your name", "Generate code", "Finish"];

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <YourName />;
      case 2:
        return <EmailValid />;
      case 3:
        return <GenerateCode />;
      case 4:
        return <Finish />;
      default:
    }
  };
  const fetchData = async (data) => {
    try {
      dispatch(Action.registerLoadingSlice(true));
      const res = await ApiService.postData("/register", data);
      localStorage.setItem("register", JSON.stringify(res));
    } catch (error) {
      const newErrors = {};
      newErrors["email"] = error?.response?.data?.email[0];
      dispatch(Action.postRegisterError(newErrors));
    } finally {
      dispatch(Action.registerLoadingSlice(false));
    }
  };
  const fetchVerifyEmail = async (code) => {
    try {
      await ApiService.postData("/verify-email", { code });
      setCurrentStep(3);
    } catch (error) {
      const newErrors = {};
      newErrors["register_code"] = error?.response?.data?.detail;
      dispatch(Action.postRegisterError(newErrors));
    }
  };

  const fetchGenerateCode = async () => {
    try {
      const res = await ApiService.postData("/check-gr/", {
        code: generateCode,
      });
      localStorage.setItem("your-group", JSON.stringify(res));
      setCurrentStep(4);
    } catch (error) {
      const newErrors = {};
      console.log(generateCode);
      console.log(error);
      newErrors["generate_code"] = error?.response?.data?.detail;
      dispatch(Action.postRegisterError(newErrors));
    }
  };

  const handleClick = (direction) => {
    const newErrors = {};
    let newStep = currentStep;

    if (newStep === 1) {
      Object.keys(registerData).forEach((key) => {
        if (!registerData["first_name"]) {
          newErrors["first_name"] = `First Name is required`;
        }
        if (!registerData["last_name"]) {
          newErrors["last_name"] = `Last Name is required`;
        }
        if (!registerData["phone_number"]) {
          newErrors["phone_number"] = `Phone is required`;
        }
      });

      if (Object.keys(newErrors).length > 0) {
        dispatch(Action.postRegisterError(newErrors));
        return;
      } else {
        dispatch(Action.postRegisterError({}));
      }
    } else if (newStep === 2) {
      Object.keys(registerData).forEach((key) => {
        if (!registerData["email"]) {
          newErrors["email"] = `Email Name is required`;
        }
        if (!registerData["password"]) {
          newErrors["password"] = `Password is required`;
        }
      });
      if (Object.keys(newErrors).length > 0) {
        dispatch(Action.postRegisterError(newErrors));
        return;
      } else {
        const register = localStorage.getItem("register");
        if (!register) {
          fetchData(registerData);
        } else {
          if (!registerCode) {
            newErrors["register_code"] = `Code is required`;
            dispatch(Action.postRegisterError(newErrors));
            return;
          } else {
            fetchVerifyEmail(registerCode);
          }
        }
        dispatch(Action.postRegisterError({}));
        return;
      }
    } else if (newStep === 3) {
      if (!generateCode) {
        newErrors["generate_code"] = `Code is required`;
        dispatch(Action.postRegisterError(newErrors));
        return;
      } else {
        fetchGenerateCode(generateCode);
      }
      dispatch(Action.postRegisterError({}));
      return;
    }

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  useEffect(() => {
    if (register && yourGroup) {
      navigate("/");
    }
  }, [register, yourGroup]);

  if (register && yourGroup) {
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
        <title>Register | Biznes Armiya</title>
        <link rel="icon" href="/" />
      </Helmet>
      <main className="w-screen h-screen flex justify-center items-center md:grid grid-cols-4 max-lg:grid-cols-5 max-md:grid-cols-1">
        <section className="max-md:hidden w-full h-full col-span-1 max-lg:col-span-2 p-4">
          <div className="w-full h-full bg-primary rounded-[24px] p-t pt-[150px] flex justify-center">
            <div className="flex flex-col gap-3">
              <h1 className="clamp2 font-bold text-white">Get started</h1>
              <Stepper steps={steps} currentStep={currentStep} />
            </div>
          </div>
        </section>
        <section className="w-full h-full  col-span-3 md:px-6 md:py-4 max-md:col-span-1">
          <div className="relative w-full h-full md:bg-white rounded-[24px] flex flex-col p-6 items-center md:pt-[70px] gap-4">
            <h1 className="font-bold text-primary clamp3 w-full text-center">
              Step {currentStep}/4
            </h1>
            {displaySteps(currentStep)}
            <NavLink className={"font-[500]"} to={"/login"}>
              Do you already have an account?{" "}
              <span className="text-primary font-bold">Sign in</span>
            </NavLink>
            <ControlSteps handleClick={handleClick} currentStep={currentStep} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
