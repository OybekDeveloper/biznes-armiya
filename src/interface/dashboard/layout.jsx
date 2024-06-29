import React from "react";
import { Helmet } from "react-helmet";
import { arrowright, calendar, time, yellowarrow } from "../../images";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | Biznes Armiya</title>
        <link rel="icon" href="/" />
      </Helmet>
      <main className="flex flex-col gap-[20px] md:px-[20px] pb-[20px]">
        <article className="flex w-full justify-between items-center mb-[20px]">
          <div className="flex flex-col items-start justify-start">
            <p className="text-gray-500">Welcome back, Evan!</p>
            <h1 className="font-bold clamp2 text-black">Dashboard</h1>
          </div>
          <button className="bg-blue-500 text-white px-[10px] py-[5px] rounded">
            <img src={calendar} alt="" />
            <div>
              
            </div>
          </button>
        </article>
        <section className="flex gap-[30px] max-lg:flex-col ">
          <div className="lg:flex-1 bg-white rounded-[24px] p-[18px] flex flex-col">
            <div className="w-full flex justify-between items-center mb-[20px]">
              <h1 className="text-black text-xl font-bold">Workload</h1>
              <div className="flex justify-center items-center">
                <h1 className="text-blue-500 cursor-pointer">View all</h1>
                <img src={arrowright} alt="arrow right" />
              </div>
            </div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-2 max-sm:grid-cols-1 sm:grid-cols-2 gap-[15px] flex-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
                <div
                  className="w-full h-full bg-[#f4f9fd] rounded-[24px] p-[10px] flex flex-col"
                  key={idx}
                >
                  <img src="" alt="logo" className="mb-[10px]" />
                  <h1 className="text-black font-medium">Shawn Stone</h1>
                  <p className="text-gray-500">UI/UX Designer</p>
                  <p className="text-gray-500">Middle</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/3 bg-white rounded-[24px] p-[18px] flex flex-col">
            <div className="w-full flex justify-between items-center mb-[20px]">
              <h1 className="text-black clamp3 font-bold">Nearest Events</h1>
              <NavLink
                to={"/nearest"}
                className="flex justify-center items-center"
              >
                <h1 className="text-blue-500 cursor-pointer">View all</h1>
                <img src={arrowright} alt="arrow right" />
              </NavLink>
            </div>
            <div className="flex flex-col w-full gap-[15px] flex-1">
              {[1, 2, 3].map((item, idx) => (
                <div
                  className="flex h-[100px] w-full rounded-[24px] p-[10px] justify-between items-center gap-1"
                  key={idx}
                >
                  <div className="w-[4px] h-full bg-primary rounded-[4px]"></div>
                  <div className="h-full flex flex-col justify-between">
                    <h1 className="w-[90%] clamp4 lg:clamp3 text-black font-bold">
                      Presentation of the new department
                    </h1>
                    <p className="text-thin text-[14px]">Today | 5:00 PM</p>
                  </div>
                  <div className="w-full h-full flex flex-col justify-between items-end">
                    <img src={yellowarrow} alt="" />
                    <div className="bg-bg_primary p-[8px] flex justify-start items-center rounded-[8px] gap-[6px]">
                      <img src={time} alt="" />
                      <h1 className="clamp4 text-thin font-[600]">4h</h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="flex gap-[30px] mt-[20px] max-lg:flex-col">
          <div className="flex-1 rounded-[24px] px-[18px] pt-[18px] flex flex-col">
            <div className="w-full flex justify-between items-center mb-[20px]">
              <h1 className="text-black clamp3 font-bold">Projects</h1>
              <div className="flex justify-center items-center">
                <h1 className="text-blue-500 cursor-pointer">View all</h1>
                <img src={arrowright} alt="arrow right" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-[15px] flex-1">
              {[1, 2, 3].map((item, idx) => (
                <div
                  className="bg-white w-full h-full p-[24px] rounded-[24px] flex flex-col"
                  key={idx}
                >
                  <img src="" alt="logo" className="mb-[10px]" />
                  <h1 className="text-black font-medium">Shawn Stone</h1>
                  <p className="text-gray-500">UI/UX Designer</p>
                  <p className="text-gray-500">Middle</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/3 bg-white rounded-[24px] px-[18px] pt-[18px] flex flex-col">
            <div className="w-full flex justify-between items-center mb-[20px]">
              <h1 className="text-black clamp3 font-bold">Activity Stream</h1>
              <div className="flex justify-center items-center"></div>
            </div>
            <div className="flex flex-col w-full gap-[15px] flex-1">
              {[1, 2, 3].map((item, idx) => (
                <div
                  className="flexh-[100px] w-full rounded-[24px] p-[10px] flex flex-col"
                  key={idx}
                >
                  <div className="w-[4px] h-full bg-black"></div>
                  <div>
                    <h1>Presentation of the new department</h1>
                    <img src={arrowright} alt="arrowright" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
