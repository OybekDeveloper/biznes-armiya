import React, { useEffect, useState } from "react";
import { emptygrouplogo } from "../../images";
import { FaCalendar } from "react-icons/fa";
import Countdown from "../../components/count-down";
import { ApiService } from "../../components/api.server";
import { NavLink } from "react-router-dom";

const PandingAuction = ({ allItems, loading, id }) => {
  return (
    <main className="w-full bg-card rounded-xl h-full shadow-btn_shadow p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 2xl:grid-cols-3">
        {allItems.map((item, idx) => (
          <NavLink
            to={`/auktsion-item/${item?.id}`}
            key={idx}
            className="cursor-pointer border-border border grid grid-cols-2 gap-3 items-start hover:bg-background-secondary rounded-md p-4"
          >
            <div className="col-span-1 object-cover h-[120px]">
              <img
                className="w-full h-full object-cover rounded-md"
                src={emptygrouplogo}
                alt=""
              />
            </div>
            <div className="col-span-1 flex flex-col justify-between gap-2 h-full">
              <h1 className="clamp4 font-bold">
                {item?.name.length > 15
                  ? item?.name.slice(0, 15) + "..."
                  : item?.name}
              </h1>
              <div>
                <span className="font-[500]">before the start</span>:
                <Countdown eventTime={item.start_time} />
              </div>
              <div className="flex justify-between gap-2 p-2 bg-green-400 rounded-md">
                <p className="font-bold text-white">Start</p>
                <div className="text-white text-[12px] flex justify-start gap-2 items-center">
                  <FaCalendar />
                  {item?.start_time.split("T")?.[0]}
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </main>
  );
};

export default PandingAuction;
