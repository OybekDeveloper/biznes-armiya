import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProfileInfo from "./profile";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const dataNav = [
    {
      id: 1,
      title: "User Management",
      link: "/settings/user",
    },
  {
    id: 2,
    title: "Role",
    link: "/settings/role",
  },
];

const Settings = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <main className="max-w-11/12 mx-auto sm:px-4">
      <section className="flex bg-backgrond">
        <div className="bg-card rounded-[18px]">
          {dataNav.map((item, idx) => (
            <button
              onClick={() => navigate(item.link)}
              key={idx}
              className={`outline-none rounded-b-[18px] bg-background  px-4 py-2 relative cursor-pointer
                ${item.link === pathname ? "" : ""}`}
            >
              <h1 className={`relative z-20`}>{item.title}</h1>
              {item.link === pathname && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-card rounded-t-[18px] mx-auto z-10"
                />
              )}
            </button>
          ))}
        </div>
      </section>
      <section className="bg-card p-4 min-h-[calc(100vh-150px)] grid max-md:flex flex-col  md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="col-span-1">
          <ProfileInfo />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default Settings;
