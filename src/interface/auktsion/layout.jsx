import React, { useEffect, useState } from "react";
import Loader1 from "../../components/loader/loader1";
import { FaPlus } from "react-icons/fa";
import PandingAuction from "./pending-auction";
import NowAuction from "./now-auction";
import { FaShoppingCart } from "react-icons/fa";

const Auktsion = () => {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const register = JSON.parse(localStorage.getItem("register"));
  //   const taskFetch = async () => {
  //     try {
  //       const tasks = await ApiService.getData("/tasks", register?.access);
  //       console.log(tasks);
  //       setTasks(tasks);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };
  //   taskFetch();
  // }, [addTask]);

  return (
    <>
      {loading ? (
        <div className="w-full h-screen">
          <Loader1 />
        </div>
      ) : (
        <main className="flex flex-col md:px-[16px] gap-2">
          <section className="w-full flex justify-between items-center">
            <h1 className="font-bold text-text-primary clamp2">Auctions</h1>
            <div className="flex justify-start items-center gap-2">
              <button className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] p-2 text-white shadow-btn_shadow">
                <FaShoppingCart />
              </button>
              <button className="z-[800] md:hidden fixed bottom-[16px] right-[16px] bg-button-color  flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow">
                <FaPlus />
              </button>
            </div>
          </section>
          <section className="grid max-md:grid-cols-1 max-xl:grid-cols-5 xl:grid-cols-4 max-lg:grid-cols-1 lg:gap-3">
            <div className="max-xl:col-span-2 col-span-1">
              <PandingAuction />
            </div>
            <div className="max-md:col-span-1 col-span-3 max-lg:mt-2">
              <NowAuction />
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Auktsion;
