import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Stepper from "./stepper";
import ControlSteps from "./control-steps";
import EmailValid from "./email-valid";
import YourName from "./your-name";
import GenerateCode from "./generate-code";
import SmsValid from "./sms-valid";
import Finish from "./finish";
import Loader1 from "../loader/loader1";
import * as Action from "../../reducer/event";
import { ApiService } from "../api.server";

const Register = () => {
  const register = localStorage.getItem("register");
  const navigate = useNavigate();
  const {
    registerData,
    regsiterDataError,
    registerCode,
    generateCode,
    registerSuccessData,
  } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "F.I.SH & Telefonni tasdiqlash",
    "E-mailni tasdiqlash",
    "Guruh kodi",
    "Tasdiqlash kodi",
  ];

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <YourName />;
      case 2:
        return <EmailValid />;
      case 3:
        return <GenerateCode />;
      case 4:
        return <SmsValid />;
      default:
        return null;
    }
  };

  const fetchData = async (data) => {
    dispatch(Action.registerLoadingSlice(true));
    try {
      const res = await ApiService.postRegister("/register", data);
      dispatch(Action.setRegisterSuccessData(res));
      setCurrentStep(4);
    } catch (error) {
      setCurrentStep(2);
      
      console.log(error);
      if (error.response.data.email) {
        dispatch(
          Action.postRegisterError({
            email: error?.response?.data?.email[0]
              ? error?.response?.data?.email
              : {},
          })
        );
      }
    } finally {
      dispatch(Action.registerLoadingSlice(false));
    }
  };

  const fetchVerifyEmail = async (code) => {
    try {
      dispatch(Action.registerLoadingSlice(false));
      await ApiService.postRegisterData("/verify-email", { code });
      setCurrentStep(3);
      localStorage.setItem("register", JSON.stringify(registerSuccessData));
    } catch (error) {
      const newErrors = {};
      newErrors["register_code"] = error?.response?.data?.detail;
      dispatch(Action.postRegisterError(newErrors));
    }
  };

  const fetchGenerateCode = async () => {
    dispatch(Action.registerLoadingSlice(true));
    try {
      await ApiService.postRegister("/check-gr/", {
        code: generateCode,
      });
      dispatch(Action.postRegisterError({}));
      fetchData(registerData);
    } catch (error) {
      const newErrors = {};
      newErrors["generate_code"] = error?.response?.data?.detail;
      dispatch(Action.postRegisterError(newErrors));
      dispatch(Action.registerLoadingSlice(false));
    }
  };

  const handleClick = (direction) => {
    const newErrors = {};
    let newStep = currentStep;
    if (regsiterDataError?.email) {
      setCurrentStep(2);
      return;
    }
    if (newStep === 1) {
      if (!registerData.first_name) {
        newErrors["first_name"] = "First Name is required";
      }
      if (!registerData.last_name) {
        newErrors["last_name"] = "Last Name is required";
      }
      if (!registerData.phone_number) {
        newErrors["phone_number"] = "Phone is required";
      }

      if (Object.keys(newErrors).length > 0) {
        dispatch(Action.postRegisterError(newErrors));
        return;
      } else {
        dispatch(Action.postRegisterError({}));
      }
    } else if (newStep === 2) {
      if (!registerData.email) {
        newErrors["email"] = "Email is required";
      }
      if (!registerData.password) {
        newErrors["password"] = "Password is required";
      }
      if (Object.keys(newErrors).length > 0) {
        dispatch(Action.postRegisterError(newErrors));
        return;
      }
    } else if (newStep === 3) {
      if (!generateCode) {
        newErrors["generate_code"] = "Code is required";
        dispatch(Action.postRegisterError(newErrors));
        return;
      }
      fetchGenerateCode();
      return;
    } else if (newStep === 4) {
      if (regsiterDataError?.email) {
        return;
      }
      if (!registerCode) {
        newErrors["register_code"] = "Code is required";
        dispatch(Action.postRegisterError(newErrors));
        return;
      } else {
        fetchVerifyEmail(registerCode);
      }
      dispatch(Action.postRegisterError({}));
      return;
    }

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  useEffect(() => {
    dispatch(
      Action.resetRegisterData({
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        password: "",
      })
    );
    localStorage.setItem("theme", "light");
  }, []);

  if (register) {
    navigate("/");
    return <Loader1 />;
  }
  return (
    <main className="w-screen h-screen flex justify-center items-center md:grid grid-cols-4 max-lg:grid-cols-5 max-md:grid-cols-1">
      <section className="max-md:hidden w-full h-full col-span-1 max-lg:col-span-2 p-4">
        <div className="w-full h-full bg-primary rounded-[24px] pt-[150px] flex justify-center">
          <div className="flex flex-col gap-3">
            <h1 className="clamp2 font-bold text-white">Boshlash</h1>
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
        </div>
      </section>
      <section className="w-full h-full col-span-3 md:px-6 md:py-4 max-md:col-span-1">
        <div className="relative w-full h-full md:bg-white rounded-[24px] flex flex-col p-6 items-center md:pt-[70px] gap-4">
          <h1 className="font-bold text-primary clamp3 w-full text-center">
            Qadam {currentStep}/4
          </h1>
          {displaySteps(currentStep)}
          <NavLink className="font-[500]" to="/login">
            Sizda hisob mavjudmi?{" "}
            <span className="text-primary font-bold">Kirish</span>
          </NavLink>
          <ControlSteps handleClick={handleClick} currentStep={currentStep} />
        </div>
      </section>
    </main>
  );
};

export default Register;
