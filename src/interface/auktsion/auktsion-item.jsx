import React, { useEffect, useState } from "react";
import Loader1 from "../../components/loader/loader1";
import { FaPlus } from "react-icons/fa";
import PandingAuction from "./pending-auction";
import NowAuction from "./now-auktsion";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineWorkHistory } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { ApiService } from "../../components/api.server";

const Auktsion = () => {
  const {id}=useParams(Auktsion)
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main className="flex flex-col md:px-[16px] gap-2">
          <section className="w-full flex justify-between items-center">
            <h1 className="font-bold text-text-primary clamp2">Auctions</h1>
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
          <section className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-2">
            <div className="col-span-2">
              <PandingAuction id={id}/>
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-3">
              <NowAuction />
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Auktsion;
