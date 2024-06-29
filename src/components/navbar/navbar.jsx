import React, { useEffect, useRef, useState } from "react";
import { logo, messageicon, notification, search, signout } from "../../images";
import DropDown from "./dropdown";
import { NavLink, useLocation } from "react-router-dom";
import DropDownMobile from "./dropdown-mobile";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const mobileNavRef = useRef(null);

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

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "visible";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* desktop */}
      <div
        className={`${
          (pathname === "/login" || pathname === "/register") && "hidden"
        } max-md:hidden w-full h-[88px] sticky top-0 left-0 backdrop-blur-[10px] px-[16px] rounded-[12px] flex justify-between items-center z999]`}
      >
        <div className="w-full relative col-span-1 flex justify-start items-center">
          <img src={search} alt="" className="absolute left-[15px]" />
          <input
            type="text"
            className="w-full py-[13px] pl-[50px] outline-none rounded-[14px] shadow-custom"
          />
        </div>
        <div className="w-full flex justify-end items-center gap-[24px]">
          <div className="p-[12px] rounded-[14px] bg-white cursor-pointer shadow-custom">
            <img src={notification} className="w-[24px] h-[24px] p" alt="" />
          </div>
          <div>
            <DropDown />
          </div>
        </div>
      </div>
      {/* mobile */}
      <div
        className={`${
          (pathname === "/login" || pathname === "/register") && "hidden"
        } md:hidden  w-full h-[88px] sticky top-0 left-0 flex items-center py-[10px]`}
      >
        <nav className="bg-white w-full h-full rounded-[24px] px-[12px] py-[8px] flex justify-between">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-600 w-[50px] h-[50px] rounded-[12px] cursor-pointer"
          >
            <img src={logo} alt="" />
          </div>
          <div className="flex justify-end items-center gap-3">
            <img className="cursor-pointer" src={search} alt="" />
            <img className="cursor-pointer" src={notification} alt="" />
            <div>
              <DropDownMobile />
            </div>
          </div>
        </nav>
        {isOpen && (
          <div className="fixed w-full h-full top-0 left-0 bg-black/10"></div>
        )}
        <motion.div
          ref={mobileNavRef}
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? "0" : "-100%" }}
          transition={{
            duration: 0.5,
            type: "linear",
          }}
          className="fixed top-0 left-0 h-screen w-[70%] p-[10px] z-50"
        >
          <main className="pt-[29px] w-full h-full bg-white rounded-[24px] flex flex-col justify-between overflow-y-scroll saidbar-scrolbar pr-1 z-50">
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
              <button className="mt-[100px] rounded-[14px] shadow-btn_shadow bg-primary py-[13px] w-full flex justify-center items-center gap-[8px]">
                <img src={messageicon} alt="" />
                <h1 className="text-[14px] font-[700] text-white">Support</h1>
              </button>
              <button className="w-full flex justify-center items-center gap-[16px] cursor-pointer hover:bg-primary hover:text-white py-[13px] text-thin transition-all duration-300 rounded-[14px] shadow-btn_shadow">
                <FiLogOut className="text-[24px]" />
                <h1 className="text-[16px] font-[600]">Logout</h1>
              </button>
            </section>
          </main>
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;

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
