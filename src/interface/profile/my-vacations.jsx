import React from "react";
import { GoLink } from "react-icons/go";
import { GrAttachment } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const percentage = 16;
const Myvacations = () => {
  return (
    <main className="flex flex-col gap-3">
      <section className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-3  max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
        {/* statistic 1 */}
        <div className="rounded-[14px] shadow-btn_shadow bg-card p-4 flex flex-col gap-2">
          <div className="w-24 h-24">
            <CircularProgressbar
              maxValue={16}
              value={12}
              text={12}
              styles={buildStyles({
                textColor: "#15C0E6",
                pathColor: "#15C0E6",
                trailColor: "rgba(var(--background))",
              })}
            />
          </div>
          <h1 className="font-bold text-text-primary clamp3">Vacation</h1>
          <p className="text-thin-color clamp4">12/16 days availible</p>
        </div>
        {/* statistic 2 */}
        <div className="rounded-[14px] shadow-btn_shadow bg-card p-4 flex flex-col gap-2">
          <div className="w-24 h-24">
            <CircularProgressbar
              maxValue={12}
              value={6}
              text={6}
              styles={buildStyles({
                textColor: "#F65160",
                pathColor: "#F65160",
                trailColor: "rgba(var(--background))",
              })}
            />
          </div>
          <h1 className="font-bold text-text-primary clamp3">Sick Leave</h1>
          <p className="text-thin-color clamp4">6/12 days availible</p>
        </div>
        {/* statistic 3 */}
        <div className="rounded-[14px] shadow-btn_shadow bg-card p-4 flex flex-col gap-2">
          <div className="w-24 h-24">
            <CircularProgressbar
              maxValue={50}
              value={42}
              text={42}
              styles={buildStyles({
                textColor: "#6D5DD3",
                pathColor: "#6D5DD3",
                trailColor: "rgba(var(--background))",
              })}
            />
          </div>
          <h1 className="font-bold text-text-primary clamp3">Work remotely</h1>
          <p className="text-thin-color clamp4">42/50 days availible</p>
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h1 className="text-text-primary font-bold clamp3">My Requests</h1>
        {[1, 2, 3, 4, 5, 6, 7].map((task, i) => (
          <NavLink
            to={`/project/${i}`}
            key={i}
            className="cursor-pointer hover:bg-hover-card bg-card shadow-btn_shadow rounded-[14px] w-full grid grid-cols-5 max-lg:grid-cols-3 max-xl:grid-cols-4 px-[24px] py-[16px] gap-3"
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
            <div className="col-span-1">
              <p className="text-thin-color clamp4">Deadline</p>
              <h1 className="text-text-primary font-[500]">Sep 13, 2020</h1>
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
  );
};

export default Myvacations;
