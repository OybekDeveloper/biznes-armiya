import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { logo, messageicon, supportimg } from "../../images";
import { FiLogOut } from "react-icons/fi";
import "./saidbar.scss";

const Saidbar = () => {
  const { pathname } = useLocation();
  const saidbarData = [
    {
      id: 1,
      title: "Dashboard",
      icon: DashboardSVG(pathname === "/" ? "#3F8CFF" : "#7D8592"),
      link: "/",
    },
    {
      id: 2,
      title: "Vazifalar",
      icon: DashboardSVG(pathname === "/homework" ? "#3F8CFF" : "#7D8592"),
      link: "/homework",
    },
    {
      id: 3,
      title: "VAB tarixi",
      icon: DashboardSVG(pathname === "/history" ? "#3F8CFF" : "#7D8592"),
      link: "/history",
    },
    {
      id: 4,
      title: "Auktsion",
      icon: DashboardSVG(pathname === "/auktsion" ? "#3F8CFF" : "#7D8592"),
      link: "/auktsion",
    },
    {
      id: 5,
      title: "Talablar",
      icon: DashboardSVG(pathname === "/requirements" ? "#3F8CFF" : "#7D8592"),
      link: "/requirements",
    },
    {
      id: 6,
      title: "Tekshirish ro'yxati",
      icon: DashboardSVG(pathname === "/checklist" ? "#3F8CFF" : "#7D8592"),
      link: "/checklist",
    },
    {
      id: 7,
      title: "Yangiliklar",
      icon: DashboardSVG(pathname === "/news" ? "#3F8CFF" : "#7D8592"),
      link: "/news",
    },
  ];
  return (
    <main className="max-md:hidden pt-[29px] w-full h-full bg-white rounded-[24px] flex flex-col justify-between overflow-y-scroll saidbar-scrolbar pr-1">
      <div>
        <section className="px-[16px]">
          <img className="w-[60px] bg-primary" src={logo} alt="" />
        </section>
        <section className="mt-[50px] flex justify-start items-start flex-col gap-2 text-[16ppx] font-[600]">
          {saidbarData.map((item, idx) => (
            <NavLink
              to={item.link}
              key={idx}
              className={
                "pl-[16px] w-full flex justify-between items-center gap-[8px]"
              }
            >
              <div
                className={`${
                  pathname === item.link
                    ? "text-primary bg-[#ebf3ff]"
                    : "text-thin hover:bg-[#faf9fd]"
                } w-full rounded-[10px] flex justify-start items-center gap-[16px] py-[11px] px-[8px]`}
              >
                {item.icon}
                <h1>{item.title}</h1>
              </div>
              {pathname === item.link && (
                <div className="w-[4px] rounded-[4px] h-[44px] bg-primary"></div>
              )}
            </NavLink>
          ))}
        </section>
      </div>
      <section className="px-[16px] w-full flex justify-end items-end flex-col mb-[45px] gap-[24px] pt-[50px]">
        <div className="w-full ">
          <div className="bg-[#ebf3ff] w-full p-[18px] relative rounded-[24px]">
            <img className="absolute top-[-40px] " src={supportimg} alt="" />
            <button className="mt-[100px] rounded-[14px] shadow-btn_shadow bg-primary py-[13px] w-full flex justify-center items-center gap-[8px]">
              <img src={messageicon} alt="" />
              <h1 className="text-[14px] font-[700] text-white">Support</h1>
            </button>
          </div>
        </div>
        <button className="w-full flex justify-center items-center gap-[16px] cursor-pointer hover:bg-primary hover:text-white py-[13px] text-thin transition-all duration-300 rounded-[14px] shadow-btn_shadow">
          <FiLogOut className="text-[24px]" />
          <h1 className="text-[16px] font-[600]">Logout</h1>
        </button>
      </section>
    </main>
  );
};

export default Saidbar;

export function DashboardSVG(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3C4.34315 3 3 4.34315 3 6V8C3 9.65685 4.34315 11 6 11H8C9.65685 11 11 9.65685 11 8V6C11 4.34315 9.65685 3 8 3H6ZM16 3C14.3431 3 13 4.34315 13 6V8C13 9.65685 14.3431 11 16 11H18C19.6569 11 21 9.65685 21 8V6C21 4.34315 19.6569 3 18 3H16ZM3 16C3 14.3431 4.34315 13 6 13H8C9.65685 13 11 14.3431 11 16V18C11 19.6569 9.65685 21 8 21H6C4.34315 21 3 19.6569 3 18V16ZM16 13C14.3431 13 13 14.3431 13 16V18C13 19.6569 14.3431 21 16 21H18C19.6569 21 21 19.6569 21 18V16C21 14.3431 19.6569 13 18 13H16Z"
        fill={color}
      />
    </svg>
  );
}
export function HomeworkSVG(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3C4.34315 3 3 4.34315 3 6V8C3 9.65685 4.34315 11 6 11H8C9.65685 11 11 9.65685 11 8V6C11 4.34315 9.65685 3 8 3H6ZM16 3C14.3431 3 13 4.34315 13 6V8C13 9.65685 14.3431 11 16 11H18C19.6569 11 21 9.65685 21 8V6C21 4.34315 19.6569 3 18 3H16ZM3 16C3 14.3431 4.34315 13 6 13H8C9.65685 13 11 14.3431 11 16V18C11 19.6569 9.65685 21 8 21H6C4.34315 21 3 19.6569 3 18V16ZM16 13C14.3431 13 13 14.3431 13 16V18C13 19.6569 14.3431 21 16 21H18C19.6569 21 21 19.6569 21 18V16C21 14.3431 19.6569 13 18 13H16Z"
        fill={color}
      />
    </svg>
  );
}
export function HistorySVG(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3C4.34315 3 3 4.34315 3 6V8C3 9.65685 4.34315 11 6 11H8C9.65685 11 11 9.65685 11 8V6C11 4.34315 9.65685 3 8 3H6ZM16 3C14.3431 3 13 4.34315 13 6V8C13 9.65685 14.3431 11 16 11H18C19.6569 11 21 9.65685 21 8V6C21 4.34315 19.6569 3 18 3H16ZM3 16C3 14.3431 4.34315 13 6 13H8C9.65685 13 11 14.3431 11 16V18C11 19.6569 9.65685 21 8 21H6C4.34315 21 3 19.6569 3 18V16ZM16 13C14.3431 13 13 14.3431 13 16V18C13 19.6569 14.3431 21 16 21H18C19.6569 21 21 19.6569 21 18V16C21 14.3431 19.6569 13 18 13H16Z"
        fill={color}
      />
    </svg>
  );
}
export function AUktsionSVG(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3C4.34315 3 3 4.34315 3 6V8C3 9.65685 4.34315 11 6 11H8C9.65685 11 11 9.65685 11 8V6C11 4.34315 9.65685 3 8 3H6ZM16 3C14.3431 3 13 4.34315 13 6V8C13 9.65685 14.3431 11 16 11H18C19.6569 11 21 9.65685 21 8V6C21 4.34315 19.6569 3 18 3H16ZM3 16C3 14.3431 4.34315 13 6 13H8C9.65685 13 11 14.3431 11 16V18C11 19.6569 9.65685 21 8 21H6C4.34315 21 3 19.6569 3 18V16ZM16 13C14.3431 13 13 14.3431 13 16V18C13 19.6569 14.3431 21 16 21H18C19.6569 21 21 19.6569 21 18V16C21 14.3431 19.6569 13 18 13H16Z"
        fill={color}
      />
    </svg>
  );
}
export function RequarymentSVG(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3C4.34315 3 3 4.34315 3 6V8C3 9.65685 4.34315 11 6 11H8C9.65685 11 11 9.65685 11 8V6C11 4.34315 9.65685 3 8 3H6ZM16 3C14.3431 3 13 4.34315 13 6V8C13 9.65685 14.3431 11 16 11H18C19.6569 11 21 9.65685 21 8V6C21 4.34315 19.6569 3 18 3H16ZM3 16C3 14.3431 4.34315 13 6 13H8C9.65685 13 11 14.3431 11 16V18C11 19.6569 9.65685 21 8 21H6C4.34315 21 3 19.6569 3 18V16ZM16 13C14.3431 13 13 14.3431 13 16V18C13 19.6569 14.3431 21 16 21H18C19.6569 21 21 19.6569 21 18V16C21 14.3431 19.6569 13 18 13H16Z"
        fill={color}
      />
    </svg>
  );
}
export function CheckTableSVG(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3C4.34315 3 3 4.34315 3 6V8C3 9.65685 4.34315 11 6 11H8C9.65685 11 11 9.65685 11 8V6C11 4.34315 9.65685 3 8 3H6ZM16 3C14.3431 3 13 4.34315 13 6V8C13 9.65685 14.3431 11 16 11H18C19.6569 11 21 9.65685 21 8V6C21 4.34315 19.6569 3 18 3H16ZM3 16C3 14.3431 4.34315 13 6 13H8C9.65685 13 11 14.3431 11 16V18C11 19.6569 9.65685 21 8 21H6C4.34315 21 3 19.6569 3 18V16ZM16 13C14.3431 13 13 14.3431 13 16V18C13 19.6569 14.3431 21 16 21H18C19.6569 21 21 19.6569 21 18V16C21 14.3431 19.6569 13 18 13H16Z"
        fill={color}
      />
    </svg>
  );
}
export function NewsSVG(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3C4.34315 3 3 4.34315 3 6V8C3 9.65685 4.34315 11 6 11H8C9.65685 11 11 9.65685 11 8V6C11 4.34315 9.65685 3 8 3H6ZM16 3C14.3431 3 13 4.34315 13 6V8C13 9.65685 14.3431 11 16 11H18C19.6569 11 21 9.65685 21 8V6C21 4.34315 19.6569 3 18 3H16ZM3 16C3 14.3431 4.34315 13 6 13H8C9.65685 13 11 14.3431 11 16V18C11 19.6569 9.65685 21 8 21H6C4.34315 21 3 19.6569 3 18V16ZM16 13C14.3431 13 13 14.3431 13 16V18C13 19.6569 14.3431 21 16 21H18C19.6569 21 21 19.6569 21 18V16C21 14.3431 19.6569 13 18 13H16Z"
        fill={color}
      />
    </svg>
  );
}
