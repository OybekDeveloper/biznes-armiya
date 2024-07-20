import React from "react";
import { emptygrouplogo } from "../../images";
import { FaCalendar } from "react-icons/fa";

const NowAuction = () => {
  return (
    <main className="w-full bg-card rounded-xl shadow-btn_shadow p-4">
      <section>
        <div className="flex gap-4 items-center bg-background-secondary rounded-md p-4 ">
          <div className="w-[200px] object-cover h-[100px]">
            <img
              className="w-full h-full object-cover rounded-md"
              src={emptygrouplogo}
              alt=""
            />
          </div>
          <div>
            <h1 className="clamp4 font-bold">Daewoo DWFMD500-E</h1>
            <div>
              <p className="font-bold text-green-600">Start</p>
              <div className="flex justify-between items-center text-primary">
                <FaCalendar />
                2024-07-20
              </div>
            </div>
            <div>
              <p className="font-bold text-red-600">End</p>
              <div className="flex justify-between items-center text-primary">
                <FaCalendar />
                2024-07-20
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1>100</h1>
        </div>
      </section>
        <section>
            
        </section>
    </main>
  );
};

export default NowAuction;
