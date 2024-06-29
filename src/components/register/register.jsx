import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Stepper from "./stepper";
import ControlSteps from "./control-steps";
import EmailValid from "./email-valid";
import YourName from "./your-name";
import GenerateCode from "./generate-code";
import Finish from "./finish";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Valid your email", "Your name", "Generate code", "Finish"];

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <EmailValid />;
      case 2:
        return <YourName />;
      case 3:
        return <GenerateCode />;
      case 4:
        return <Finish />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register | Biznes Armiya</title>
        <link rel="icon" href="/" />
      </Helmet>
      <main className="w-screen h-screen grid grid-cols-4">
        <section className="w-full h-full col-span-1 p-4">
          <div className="w-full h-full bg-primary rounded-[24px] p-t pt-[150px] flex justify-center">
            <div className="flex flex-col gap-3">
              <h1 className="clamp2 font-bold text-white">Get started</h1>
              <Stepper steps={steps} currentStep={currentStep} />
            </div>
          </div>
        </section>
        <section className="w-full h-full  col-span-3 px-6 py-4">
          <div className="relative w-full h-full bg-white rounded-[24px] flex flex-col p-6 items-center pt-[70px] gap-4">
            <h1 className="font-bold text-primary clamp3 w-full text-center">Step {currentStep}/4</h1>
            {displaySteps(currentStep)}
            <ControlSteps handleClick={handleClick} currentStep={currentStep} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
