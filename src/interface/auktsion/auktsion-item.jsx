import React, { useEffect, useState } from "react";
import Loader1 from "../../components/loader/loader1";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import PandingAuction from "./pending-auction";
import NowAuction from "./now-auktsion";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineWorkHistory } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { ApiService } from "../../components/api.server";

const Auktsion = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [pendingAuction, setPendingAuction] = useState({});

  useEffect(() => {
    const register = JSON.parse(localStorage.getItem("register"));
    const fetchItem = async () => {
      try {
        const items = await ApiService.getData("/buyum", register?.access);
        const auktsion = await ApiService.getData(
          `/auktsion/${id}`,
          register?.access
        );
        if (!items && !auktsion) {
          return;
        }
        setPendingAuction(auktsion);

        const filteredItems = items.filter((item) =>
          auktsion?.buyumlar.includes(item.id)
        );
        setAllItems(filteredItems);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, []);
  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main className="flex flex-col md:px-[16px] gap-2">
          <section className="w-full flex justify-between items-center">
            <div className="flex flex-col justify-start items-center gap-3">
              <button
                className={
                  "flex justify-start items-center gap-2 text-blue-600"
                }
                onClick={() => window.history.back()}
              >
                <FaArrowLeft className="text-[14px]" />
                <p className="text-[14px]">Back to back</p>
              </button>
              <h1 className="font-bold text-text-primary clamp2">
                {pendingAuction?.name}
              </h1>
            </div>

            <div className="flex justify-start items-center gap-2">
              <NavLink
                to={"/auktsion-history"}
                className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] p-3 text-xl text-white shadow-btn_shadow"
              >
                <MdOutlineWorkHistory />
              </NavLink>
              <button className="z-[800] md:hidden fixed bottom-[16px] right-[16px] bg-button-color  flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow">
                <FaPlus />
              </button>
            </div>
          </section>
          <section className="">
            <div className="col-span-2">
              <PandingAuction allItems={allItems} id={id} />
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Auktsion;
