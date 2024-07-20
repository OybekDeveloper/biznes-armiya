import React from "react";
import { emptyGroup, emptygrouplogo, photoUrl } from "../../images";
import { FaCalendar } from "react-icons/fa";

const PandingAuction = () => {
  return (
    <main className="w-full bg-card rounded-xl min-h-[calc(100vh-170px)] shadow-btn_shadow p-4">
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((item, idx) => (
          <div
            key={idx}
            className="flex gap-4 items-center bg-background-secondary rounded-md p-4 "
          >
            <div className="w-[200px] object-cover h-[100px]">
              <img
                className="w-full h-full object-cover rounded-md"
                src={emptygrouplogo}
                alt=""
              />
            </div>
            <div>
              <h1 className="clamp4 font-bold">Daewoo DWFMD500-E</h1>
              <p className="font-bold text-green-600">Start</p>
              <div className="flex justify-between items-center text-primary">
                <FaCalendar />
                2024-07-20
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default PandingAuction;
