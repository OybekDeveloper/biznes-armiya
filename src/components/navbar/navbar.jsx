import React, { useEffect, useRef, useState } from "react";
import { lightLogo } from "../../images";
import DropDown from "./dropdown";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DropDownMobile from "./dropdown-mobile";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import NotificationModal from "./notification-modal";
import { ApiService } from "../api.server";
import { useDispatch, useSelector } from "react-redux";
import { searchSlice, userDetailSlice } from "../../reducer/event";
import ExitModal from "../exit-modal";
import "./index.css";
import { MdSpaceDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Loader1 from "../loader/loader1";
import LengDropdown from "../leng-dropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const { eventSliceBool, userData, searchMessage } = useSelector(
    (state) => state.event
  );
  const register = JSON.parse(localStorage.getItem("register"));
  const selectedTheme = localStorage.getItem("theme");
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isExit, setIsExit] = useState(false);
  const [theme, setTheme] = useState(selectedTheme ? selectedTheme : "light");
  const [isNotif, setIsNotif] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false); // New state for search expansion
  const mobileNavRef = useRef(null);
  const dispatch = useDispatch();
  const handleOpenNotification = () => {
    setIsNotif(!isNotif);
  };

  const { role } = userData;
  const saidbarData = [
    {
      id: 1,
      title: "Dashboard",
      icon: <MdSpaceDashboard />,
      link: "/",
      active: role?.side_dash ? true : false,
    },
    {
      id: 2,
      title: "Tasks",
      icon: <FaTasks />,
      link: "/homework",
      active: role?.side_task ? true : false,
    },
    {
      id: 3,
      title: "VAB history",
      icon: <MdWorkHistory />,
      link: "/history",
      active: role?.side_history || role?.h_balls_views ? true : false,
    },
    {
      id: 4,
      title: "Auktsion",
      icon: <RiAuctionFill />,
      link: "/auktsion",
      active: role?.side_auction ? true : false,
    },
    {
      id: 5,
      title: "Requirements",
      icon: <MdOndemandVideo />,
      link: "/requirements",
      active: role?.side_news ? true : false,
    },
    {
      id: 6,
      title: "Checklist",
      icon: <FaCalendarCheck />,
      link: "/checklist",
      active: role?.side_check_list ? true : false,
    },
    {
      id: 7,
      title: "News",
      icon: <FaNewspaper />,
      link: "/news",
      active: role?.side_news ? true : false,
    },
    {
      id: 7,
      title: "Settings",
      icon: <IoMdSettings />,
      link: "/settings/user",
      active:
        role?.role_views || role?.role_edit || role?.role_delete ? true : false,
    },
  ];

  const handleToggleTheme = () => {
    if (theme === "light") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  const handleLogOut = (e) => {
    setIsExit(!isExit);
    setIsOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
  };

  useEffect(() => {
    if (selectedTheme === "dark") {
      document.body.classList.add("dark");
    } else if (selectedTheme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.add("light");
    }
  }, [selectedTheme]);

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "visible";
    }

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

  useEffect(() => {
    if (!register && pathname !== "/register") navigate("/login");
    const fetchUserData = async () => {
      try {
        const res = await ApiService.getData(
          `/users/${register?.user_id}`,
          register?.access
        );
        const role = await ApiService.getData(
          `/role/${res?.role}`,
          register?.access
        );

        const res1 = await ApiService.getData("/tasks", register?.access);
        const res2 = await ApiService.getData("/tasksreq", register?.access);
        const filterTasks = res1.filter((c) =>
          c.user.find((u) => +u.user === res?.id)
        );
        const filterTasks2 = res2.filter((c) =>
          c.user.find((u) => +u.user === res?.id)
        );
        const doneTasks = filterTasks.filter((c) => c.status === "Done");
        const doneTasks2 = filterTasks2.filter((c) => c.status === "Done");

        const reyting =
          ((doneTasks.length + doneTasks2.length) /
            (filterTasks.length + filterTasks2.length)) *
          10;
        if (reyting) {
          await ApiService.patchData(
            `/users/${register?.user_id}`,
            {
              reyting: reyting.toFixed(1),
            },
            register?.access
          );
        }
        dispatch(
          userDetailSlice({
            ...res,
            role: role,
          })
        );
      } catch (error) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("register");
          navigate("/login");
        } else {
          navigate("/not-found");
        }
      }
    };
    if (register) {
      fetchUserData();
    }
  }, [register?.user_id, pathname, eventSliceBool]);

  useEffect(() => {
    dispatch(searchSlice(""));
  }, [pathname]);

  return (
    <>
      {/* desktop */}
      {!userData.role && pathname !== "/login" && pathname !== "/register" && (
        <div className="flex bg-background justify-center items-center w-screen h-screen fixed top-0 left-0 z-[99999]">
          <Loader1 />
        </div>
      )}
      <div
        className={`${
          (pathname === "/login" || pathname === "/register") && "hidden"
        } max-md:hidden w-full h-[88px] sticky top-0 left-0 backdrop-blur-[10px] px-[16px] rounded-[12px] flex justify-between items-center z-[700]`}
      >
        <div className="w-full relative col-span-1 flex justify-start items-center">
          <FiSearch className="text-xl absolute left-[15px]" />
          <input
            onChange={(e) => dispatch(searchSlice(e.target.value))}
            type="text"
            value={searchMessage}
            className="w-full py-[13px] pl-[50px] outline-none rounded-[14px] shadow-btn_shadow bg-card"
          />
        </div>
        <div className="w-full flex justify-end items-center gap-[24px]">
          <LengDropdown />
          <div
            onClick={handleToggleTheme}
            className="p-[12px] rounded-[14px] bg-card cursor-pointer shadow-btn_shadow flex justify-center items-center"
          >
            {theme === "dark" ? (
              <button className="">
                <MdOutlineLightMode className="text-xl text-text-primary" />
              </button>
            ) : (
              <button className="">
                <MdDarkMode className="text-xl text-text-primary" />
              </button>
            )}
          </div>
          {/* <div
            data-count={9}
            onClick={handleOpenNotification}
            className="p-[12px] rounded-[14px] bg-card cursor-pointer shadow-btn_shadow flex justify-center items-center notf-cound relative"
          >
            <button>
              <IoMdNotificationsOutline className="text-xl text-text-primary" />
            </button>
          </div> */}
          <div className="">
            <DropDown handleLogOut={handleLogOut} />
          </div>
        </div>
      </div>
      {/* mobile */}
      <div
        className={`${
          (pathname === "/login" || pathname === "/register") && "hidden"
        } md:hidden w-full h-[88px] sticky top-0 left-0 flex items-center py-[10px] z-[700]`}
      >
        <nav className="bg-card w-full h-full rounded-[24px] px-[12px] py-[8px] flex justify-between">
          {isSearchActive ? (
            <div className="flex w-full items-center">
              <FiSearch className="text-xl text-text-primary ml-2" />
              <input
                onChange={(e) => dispatch(searchSlice(e.target.value))}
                type="text"
                value={searchMessage}
                className="w-full py-[13px] px-[10px] outline-none rounded-[14px] shadow-btn_shadow bg-card"
                placeholder="Search..."
              />
              <button onClick={handleSearchToggle} className="px-4">
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-[50px] h-[50px] rounded-[12px] cursor-pointer"
              >
                <img src={lightLogo} alt="" />
              </div>
              <div className="flex justify-end items-center gap-3">
                <button onClick={handleSearchToggle}>
                  <FiSearch className="text-xl text-text-primary" />
                </button>
                {theme === "dark" ? (
                  <button onClick={handleToggleTheme} className="">
                    <MdOutlineLightMode className="text-xl text-text-primary" />
                  </button>
                ) : (
                  <button onClick={handleToggleTheme} className="">
                    <MdDarkMode className="text-xl text-text-primary" />
                  </button>
                )}
                {/* <button
                  data-count={2}
                  className="relative notf-cound"
                  onClick={handleOpenNotification}
                >
                  <IoMdNotificationsOutline className="text-xl text-text-primary" />
                </button> */}
                <div>
                  <DropDownMobile handleLogOut={handleLogOut} />
                </div>
              </div>
            </>
          )}
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
          className="fixed top-0 left-0 h-screen w-[70%] sm:w-[60%] p-[10px] z-50"
        >
          <main className="pt-[29px] w-full h-full bg-card rounded-[24px] flex flex-col justify-between overflow-y-scroll saidbar-scrolbar pr-1 z-50">
            <div>
              <section className="px-[16px]">
                <img className="w-[60px]" src={lightLogo} alt="" />
                <h1 className="text-xl">BIZNES ARMIYA</h1>
              </section>
              <section className="mt-[30px] flex justify-start items-start flex-col gap-2 text-[16ppx] font-[600]">
                {saidbarData.map((item, idx) => {
                  if (item.active === false) {
                    return null;
                  }
                  return (
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to={item.link}
                      key={idx}
                      className={
                        "pl-[16px] w-full flex justify-between items-center gap-[8px]"
                      }
                    >
                      <div
                        className={`${
                          pathname === item.link
                            ? "bg-active-card text-primary"
                            : "hover:bg-hover-card text-thin-color"
                        } w-full rounded-[10px] flex justify-start items-center gap-[16px] py-[11px] px-[8px]`}
                      >
                        <h1 className="text-[18px]">{item.icon}</h1>
                        <h1>{item.title}</h1>
                      </div>
                      {pathname === item.link && (
                        <div className="w-[4px] rounded-[4px] h-[44px] bg-primary"></div>
                      )}
                    </NavLink>
                  );
                })}
              </section>
            </div>
            <section className="px-[16px] w-full flex justify-end items-end flex-col mb-[45px] gap-[24px] pt-[50px]">
              <NavLink
                to={"/register"}
                className="w-full flex justify-center items-center gap-[16px] cursor-pointer hover:bg-hover-card hover:text-white py-[13px] text-thin transition-all duration-300 rounded-[14px] shadow-btn_shadow"
              >
                <FiLogOut className="text-[24px]" />
                <h1 className="text-[16px] font-[600]">Logout</h1>
              </NavLink>
            </section>
          </main>
        </motion.div>
      </div>
      <ExitModal isOpen={isExit} handleClose={handleLogOut} />
      <NotificationModal
        isOpen={isNotif}
        handleClose={handleOpenNotification}
      />
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
