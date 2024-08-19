import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { lightLogo } from "../../images";

import "./sidebar.scss";
import { useSelector } from "react-redux";

import { MdSpaceDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const Saidbar = () => {
  const { pathname } = useLocation();
  const { userData } = useSelector((state) => state.event);
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
      active: role?.side_setting ? true : false,
    },
  ];

  return (
    <main className="max-md:hidden pt-[29px] w-full h-full bg-card rounded-[24px] flex flex-col justify-between overflow-y-scroll saidbar-scrolbar pr-1 shadow-btn_shadow">
      <div>
        <NavLink
          to="/"
          className="px-[16px] flex justify-start items-center gap-2 font-bold "
        >
          <img className="w-[60px]" src={lightLogo} alt="" />
          <h1 className="text-xl">BIZNES ARMIYA</h1>
        </NavLink>
        <section className="mt-[50px] flex justify-start items-start flex-col gap-2 text-[16ppx] font-[600]">
          {saidbarData.map((item, idx) => {
            if (item.active === false) {
              return null;
            }
            return (
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
                      ? "bg-active-card text-primary"
                      : "hover:bg-hover-card text-thin-color"
                  } w-full rounded-[10px] flex justify-start items-center gap-[16px] py-[11px] px-[8px]`}
                >
                  <h1 className="text-[24px]">{item.icon}</h1>
                  <h1>{item.title}</h1>
                </div>
                {pathname === item.link && (
                  <div className="w-[4px] bg-primary rounded-[2px] h-[42px]"></div>
                )}
              </NavLink>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Saidbar;
