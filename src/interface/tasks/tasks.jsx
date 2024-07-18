import React from "react";
import { LuFilter } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { dataempty } from "../../images";

const Tasks = ({ toggleFilter }) => {
  return (
    <main className="col-span-3 max-lg:grid-cols-1 flex flex-col gap-2">
      <section className="flex justify-between items-center">
        <h1 className="text-text-primary font-bold clamp3">Tasks</h1>
        <div
          onClick={toggleFilter}
          className="p-[12px] rounded-[14px] bg-card cursor-pointer shadow-btn_shadow flex justify-center items-center"
        >
          <button>
            <LuFilter className="text-xl text-text-primary" />
          </button>
        </div>
      </section>
      <div className="w-full h-full flex justify-center items-center flex-col mt-4">
        <div className="w-full h-[200px]">
          <img
            className="w-full h-full object-contain"
            src={dataempty}
            alt=""
          />
        </div>
        <h1 className="clam3 font-bold">Tasks do not exist!</h1>
      </div>
      {/* <section className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5, 6, 7].map((task, i) => (
          <NavLink to={`/project/${i}`}
            key={i}
            className="cursor-pointer hover:bg-hover-card bg-card shadow-btn_shadow rounded-[14px] w-full grid grid-cols-6 max-lg:grid-cols-3 max-xl:grid-cols-4 px-[24px] py-[16px] gap-3"
          >
            <div className="col-span-1">
              <p className="text-thin-color clamp4">Task name</p>
              <h1 className="text-text-primary font-bold">Sick Leave</h1>
            </div>
            <div className="col-span-1">
              <p className="text-thin-color clamp4">Estimate</p>
              <h1 className="text-text-primary font-[500]">1d 2h </h1>
            </div>
            <div className="col-span-1">
              <p className="text-thin-color clamp4">Deadline</p>
              <h1 className="text-text-primary font-[500]">Sep 13, 2020</h1>
            </div>
            <div className="col-span-1 flex flex-col">
              <p className="text-thin-color clamp4">Assignee</p>
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="col-span-1">
              <p className="text-thin-color clamp4">Priority</p>
              <h1 className="text-text-primary font-[500]">Sick Leave</h1>
            </div>
            <div className="col-span-1 flex justify-start items-center ">
              <div className="text-[12px] px-2 py-1 rounded-[14px] bg-yellow-500 text-white">
                Bajarilmoqda
              </div>
            </div>
          </NavLink>
        ))}
      </section> */}
    </main>
  );
};

export default Tasks;
