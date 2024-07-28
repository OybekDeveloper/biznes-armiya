import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { lightLogo } from "../../images";

import "./sidebar.scss";
import { saidbarData } from "../data";

const Saidbar = () => {
  const { pathname } = useLocation();

  return (
    <main className="max-md:hidden pt-[29px] w-full h-full bg-card rounded-[24px] flex flex-col justify-between overflow-y-scroll saidbar-scrolbar pr-1 shadow-btn_shadow">
      <div>
        <section className="px-[16px] flex justify-start items-center gap-2 font-bold ">
          <img className="w-[60px]" src={lightLogo} alt="" />
          <h1 className="text-xl">BIZNES ARMIYA</h1>
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
          ))}
        </section>
      </div>
    </main>
  );
};

export default Saidbar;
