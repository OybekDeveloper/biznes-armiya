import React from "react";
import { Helmet } from "react-helmet";
import { FaPlus } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const Checklist = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tekshirish ro'yxati | Biznes Armiya</title>
        <link rel="icon" href="/" />
      </Helmet>
      <main className="col-span-3 max-lg:grid-cols-1 flex flex-col gap-2">
        <section className="flex justify-between items-center">
          <h1 className="text-text-primary font-bold clamp3">Tekshirish Ro’yxati</h1>
          <button className="bg-button-color  flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow">
            <FaPlus />
            <h1>AAdd Request</h1>
          </button>
        </section>
        <section className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((task, i) => (
            <NavLink
              to={`/project/${i}`}
              key={i}
              className="cursor-pointer hover:bg-hover-card bg-card shadow-btn_shadow rounded-[14px] w-full grid grid-cols-6 max-lg:grid-cols-3 max-xl:grid-cols-4 px-[24px] py-[16px] gap-3"
            >
              <div className="col-span-1">
                <p1 className="text-thin-color clamp4">Task name</p1>
                <h1 className="text-text-primary font-bold">Sick Leave</h1>
              </div>
              <div className="col-span-1">
                <p1 className="text-thin-color clamp4">Estimate</p1>
                <h1 className="text-text-primary font-[500]">1d 2h </h1>
              </div>
              <div className="col-span-1">
                <p1 className="text-thin-color clamp4">Deadline</p1>
                <h1 className="text-text-primary font-[500]">Sep 13, 2020</h1>
              </div>
              <div className="col-span-1 flex flex-col">
                <p1 className="text-thin-color clamp4">Assignee</p1>
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="col-span-1">
                <p1 className="text-thin-color clamp4">Priority</p1>
                <h1 className="text-text-primary font-[500]">Sick Leave</h1>
              </div>
              <div className="col-span-1 flex justify-start items-center ">
                <div className="text-[12px] px-2 py-1 rounded-[14px] bg-yellow-500 text-white">
                  Bajarilmoqda
                </div>
              </div>
            </NavLink>
          ))}
        </section>
      </main>
    </>
  );
};

export default Checklist;
