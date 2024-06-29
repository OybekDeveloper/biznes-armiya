import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { arrowleft, plus, time, yellowarrow } from "../../images";
import { NavLink } from "react-router-dom";
import AddEvent from "./add-event";

const NearestOvents = () => {
  const [isOpenEvent, setIsOpenEvent] = useState(false);

  const handleCloseEvent = () => {
    setIsOpenEvent(!isOpenEvent);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nearest Ovents | Biznes Armiya</title>
        <link rel="icon" href="/" />
      </Helmet>
      <main className="relative">
      <button
            onClick={handleCloseEvent}
            className="sm:hidden bg-blue-500 text-white p-[10px] rounded-full fixed bottom-[20px] right-[16px] "
          >
            <img src={plus} alt="" />
          </button>
        <article className="flex w-full justify-between items-center mb-[20px]">
          <div className="flex flex-col items-start justify-start">
            <NavLink
              className={"flex justify-start items-center gap-2"}
              to={"/"}
            >
              <img className="w-[24px] h-[24px]" src={arrowleft} alt="" />
              <p className="text-primary text-[14px]">Back to Dashboard</p>
            </NavLink>
            <h1 className="font-bold clamp2 text-black">Nearest Events</h1>
          </div>
          <button
            onClick={handleCloseEvent}
            className="max-sm:hidden bg-blue-500 text-white px-[10px] py-[8px] rounded-[14px]"
          >
            + Add Event
          </button>
        </article>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 w-full gap-[15px] flex-1">
          {[1, 2, 3].map((item, idx) => (
            <div
              className="flex h-[150px] w-full rounded-[24px] p-[24px] justify-between items-center bg-white gap-2"
              key={idx}
            >
              <div className="w-[4px] h-full bg-primary rounded-[4px]"></div>
              <div className="h-full flex flex-col justify-between">
                <h1 className="w-[90%] lg:clamp3 max-lg:clamp4 text-black font-bold">
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
      </main>
      <AddEvent isOpen={isOpenEvent} handleClose={handleCloseEvent} />
    </>
  );
};

export default NearestOvents;
