import React, { useState, useEffect } from "react";
import { emptygrouplogo } from "../../images";
import { FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";
import { ApiService } from "../../components/api.server";

const NowAuction = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const register = JSON.parse(localStorage.getItem("register"));
    const fetchItem = async () => {
      try {
        const item = await ApiService.getData("/buyum", register?.access);
        const filteredItems = item.filter((i) => {
          const now = new Date();
          const startTime = new Date(i.start_time);
          if (startTime - now > 0) {
            return false;
          }
        });
        setItems(filteredItems);
        console.log(filteredItems);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchItem();
  }, []);

  const auctionData = [
    {
      id: 0,
      name: "player1",
      start_time: "2024-07-21T21:01:51.663Z",
      end_time: "2024-07-21T21:01:51.663Z",
      ekb_name: "string",
      ekb: 345,
      boshlangich_narx: "120",
    },
    {
      id: 2,
      name: "2",
      start_time: "2024-07-21T21:01:51.663Z",
      end_time: "2024-07-21T21:01:51.663Z",
      ekb_name: "string",
      ekb: 123,
      boshlangich_narx: "120",
    },
    {
      id: 3,
      name: "sddd",
      start_time: "2024-07-21T21:01:51.663Z",
      end_time: "2024-07-21T21:01:51.663Z",
      ekb_name: "string",
      ekb: 223,
      boshlangich_narx: "120",
    },
  ];

  const [bids, setBids] = useState(items);

  useEffect(() => {
    const now = new Date();
    const filteredBids = auctionData.filter(
      (bid) => new Date(bid.start_time) <= now
    );
    setBids(filteredBids.sort((a, b) => b.ekb - a.ekb));
  }, []);

  const handleBidChange = (e, id) => {
    const { value } = e.target;
    setBids((prevBids) =>
      prevBids.map((bid) =>
        bid.id === id ? { ...bid, currentBid: value } : bid
      )
    );
  };
  console.log(items);
  const maxVab = Math.max(...bids.map((bid) => bid.ekb));
  const maxVabItem = bids.find((bid) => bid.ekb === maxVab);

  return (
    <main className="relative h-full min-h-[calc(100vh-170px)] w-full bg-card rounded-xl shadow-btn_shadow p-4">
      <section>
        <div className="grid grid-cols-3 gap-4 max-sm:flex-col items-start bg-background-secondary rounded-md p-4 mb-4">
          <div className="col-span-1 h-[120px] object-cover">
            <img
              className="w-full h-full object-cover rounded-md"
              src={emptygrouplogo}
              alt=""
            />
          </div>
          <div className="col-span-2 flex justify-between flex-col w-full h-full">
            <h1 className="text-xl font-bold">Auction Summary</h1>
            <div className="flex justify-between items-end gap-3 w-full h-full">
              <div className="w-full flex justify-between gap-2 p-2 bg-green-400 rounded-md">
                <p className="font-bold text-white">Start</p>
                <div className="text-white text-[12px] flex justify-start gap-2 items-center">
                  <FaCalendar />
                  2024-07-20
                </div>
              </div>
              <div className="w-full flex justify-between gap-2 p-2 bg-red-400 rounded-md">
                <p className="font-bold text-white">End</p>
                <div className="text-white text-[12px] flex justify-start gap-2 items-center">
                  <FaCalendar />
                  2024-07-20
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <table className="min-w-full bg-card rounded-xl shadow-sm overflow-hidden">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-hr-color text-start">
                    Min VAB
                  </th>
                  <th className="px-4 py-2 border-b border-hr-color text-start">
                    Max VAB
                  </th>
                  <th className="px-4 py-2 border-b border-hr-color text-start">
                    Top Bidder:
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card "
                >
                  <td className="px-4 py-2 border-b border-hr-color font-bold">
                    {maxVabItem?.boshlangich_narx}
                  </td>
                  <td className="px-4 py-2 border-b border-hr-color">
                    <div className="flex items-center">{maxVab}</div>
                  </td>
                  <td className="px-4 py-2 border-hr-color text-green-600 font-bold">
                    {maxVabItem?.name}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="overflow-x-auto">
        <h1 className="font-bold clamp3">Davogarlar</h1>
        <div className="w-full h-[1px] bg-hr-color my-1" />
        <table className="min-w-full bg-card rounded-xl shadow-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-hr-color text-start">
                N
              </th>
              <th className="px-4 py-2 border-b border-hr-color text-start">
                Name
              </th>
              <th className="px-4 py-2 border-b border-hr-color text-start">
                VAB
              </th>
            </tr>
          </thead>
          <tbody>
            {bids.map((item, idx) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card "
              >
                <td className="px-4 py-2 border-b border-hr-color font-bold">
                  {idx + 1}
                </td>
                <td className="px-4 py-2 border-b border-hr-color">
                  <div className="flex items-center">{item.name}</div>
                </td>
                <td className="px-4 py-2 border-b border-hr-color text-green-600 font-bold">
                  ${item.ekb}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="absolute bottom-0 right-0 flex w-full justify-end items-end rounded-md p-2">
        <div className="w-full h-full  flex justify-between items-center gap-4">
          <input
            type="number"
            className="shadow-btn_shadow bg-card w-full p-2 border rounded-md focus:outline-none border-border focus:border-primary"
            placeholder="Enter your vab"
          />
          <div className=" flex justify-end items-center">
            <button className="whitespace-nowrap w-full shadow-btn_shadow p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Add vab
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NowAuction;
