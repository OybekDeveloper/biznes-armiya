import React, { useState, useEffect } from "react";
import { emptygrouplogo } from "../../images";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";
import { ApiService } from "../../components/api.server";
import { useParams } from "react-router-dom";
import Loader1 from "../../components/loader/loader1";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const allItems = [];

const NowAuction = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const { userData } = useSelector((state) => state.event);

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [bids, setBids] = useState([]);
  const [addVab, setAddVab] = useState({
    vab: null,
    buyum_id: id,
    user_id: register?.user_id,
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const items = await ApiService.getData(
          `/buyum/${id}`,
          register?.access
        );
        setItem(items);
        console.log(items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, register?.access]);

  useEffect(() => {
    const now = new Date();
    const filteredBids = allItems.filter(
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

  const maxVab = Math.max(...bids.map((bid) => bid.ekb));
  const maxVabItem = bids.find((bid) => bid.ekb === maxVab);

  const handleAddVab = () => {
    // Validate addVab input
    if (addVab.vab <= 0) {
      toast.error("Vab must be a positive number!");
      return;
    }
    if (userData?.vab < addVab?.vab) {
      toast.error("Not enough vab!");
      return;
    }

    // Proceed to add vab
    const fetchData = async () => {
      try {
        const res = await ApiService.postData(
          "/buyumusers",
          addVab,
          register?.access
        );
        toast.success("Successfully added vab!");
        console.log(res);
      } catch (error) {
        toast.error("Failed to add vab!");
        console.log(error);
      }
    };
    fetchData();
  };

  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <div className="sm:px-4">
          <button
            className={"py-2 flex justify-start items-center gap-2 text-blue-600"}
            onClick={() => window.history.back()}
          >
            <FaArrowLeft className="text-[14px]" />
            <p className="text-[14px]">Back to back</p>
          </button>
          <main className="relative h-full min-h-[calc(100vh-110px)] w-full bg-card rounded-xl shadow-btn_shadow">
            <section className="bg-background-secondary rounded-md">
              <div className="grid grid-cols-3 gap-4 rounded-md sm:p-4">
                <div className="col-span-1 max-sm:col-span-3 sm:col-span-1 lg:col-span-1 h-[150px] object-cover">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={item?.img}
                    alt=""
                  />
                </div>
                <div className="col-span-1 max-sm:col-span-3 sm:col-span-2 lg:col-span-1 flex justify-between flex-col w-full h-full gap-2">
                  <h1 className="text-xl font-bold">{item?.name}</h1>
                  <div className=" w-full h-full">
                    <div className="w-[200px] max-sm:w-1/2 inline-flex justify-between gap-2 p-2 bg-green-400 rounded-md m-1">
                      <p className="font-bold text-white">Start</p>
                      <div className="text-white text-[12px] flex justify-start gap-2 items-center">
                        <FaCalendar />
                        {item?.start_time.split("T")[0]}
                      </div>
                    </div>
                    <div className="w-[200px] max-sm:w-1/2 inline-flex justify-between gap-2 p-2 bg-red-400 rounded-md m-1">
                      <p className="font-bold text-white">End</p>
                      <div className="text-white text-[12px] flex justify-start gap-2 items-center">
                        <FaCalendar />
                        {item?.end_time.split("T")[0]}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 max-sm:col-span-3 sm:col-span-3 lg:col-span-2 mb-2">
                  <table className="min-w-full bg-card shadow-sm overflow-hidden">
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
                          {item?.boshlangich_narx}
                        </td>
                        <td className="px-4 py-2 border-b border-hr-color">
                          <div className="flex items-center">{item?.ekb}</div>
                        </td>
                        <td className="px-4 py-2 border-b border-hr-color text-green-600 font-bold">
                          {item?.ekb_name}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section className="overflow-x-auto p-4">
              <h1 className="font-bold clamp3">Davogarlar</h1>
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
              <div className="w-full h-full flex justify-between items-center gap-4">
                <input
                  onChange={(e) =>
                    setAddVab({ ...addVab, vab: Number(e.target.value) || "" })
                  }
                  type="number"
                  value={addVab?.vab || ""}
                  className="shadow-btn_shadow bg-card w-full p-2 border rounded-md focus:outline-none border-border focus:border-primary"
                  placeholder="Enter your vab"
                />
                <div className="flex justify-end items-center">
                  <button
                    onClick={handleAddVab}
                    className="whitespace-nowrap w-full shadow-btn_shadow p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add vab
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </>
  );
};

export default NowAuction;
