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
import { useTranslation } from "react-i18next";
import LengDropdown from "../leng-dropdown";

const Saidbar = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { userData } = useSelector((state) => state.event);
  const { role } = userData;
  const saidbarData = [
    {
      id: 1,
      title: t("side_dash"),
      icon: <MdSpaceDashboard />,
      link: "/",
      active: role?.side_dash ? true : false,
    },
    {
      id: 2,
      title: t("side_tasks"),
      icon: <FaTasks />,
      link: "/homework",
      active: role?.side_task && role?.tasks_views ? true : false,
    },
    {
      id: 3,
      title: t("side_history"),
      icon: <MdWorkHistory />,
      link: "/history",
      active: role?.side_history && role?.vab_views ? true : false,
    },
    {
      id: 4,
      title: t("side_auktion"),
      icon: <RiAuctionFill />,
      link: "/auktsion",
      active: role?.side_auction && role?.auktsion_views ? true : false,
    },
    {
      id: 5,
      title: t("side_req"),
      icon: <MdOndemandVideo />,
      link: "/requirements",
      active: role?.side_requirements && role?.tasks_users_views ? true : false,
    },
    {
      id: 6,
      title: t("side_check"),
      icon: <FaCalendarCheck />,
      link: "/checklist",
      active: role?.side_check_list ? true : false,
    },
    {
      id: 7,
      title: t("side_news"),
      icon: <FaNewspaper />,
      link: "/news",
      active: role?.side_news && role?.news_views ? true : false,
    },
    {
      id: 7,
      title: t("side_setting"),
      icon: <IoMdSettings />,
      link: "/settings/user",
      active:
        role?.role_views || role?.role_edit || role?.role_delete ? true : false,
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
