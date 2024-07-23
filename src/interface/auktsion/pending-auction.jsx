import React, { useEffect, useState } from "react";
import { emptygrouplogo } from "../../images";
import { FaCalendar } from "react-icons/fa";
import Countdown from "../../components/count-down";
import { ApiService } from "../../components/api.server";

const PandingAuction = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const register = JSON.parse(localStorage.getItem("register"));
    const fetchItem = async () => {
      try {
        const item = await ApiService.getData("/buyum", register?.access);
        setItems(item);
        console.log(item)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchItem();
  }, []);
  return (
    <main className="w-full bg-card rounded-xl h-full shadow-btn_shadow p-4">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col gap-3 overflow-y-scroll h-[calc(100vh-210px)]">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-2 gap-3 items-start bg-background-secondary rounded-md p-4 mr-2"
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
                  <span className="font-[500]">Boshlanishigacha</span>:
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
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default PandingAuction;
