import React, { useEffect, useState } from "react";
import Loader1 from "../../components/loader/loader1";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import PandingAuction from "./pending-auction";
import NowAuction from "./now-auktsion";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineWorkHistory } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { ApiService } from "../../components/api.server";
import AddItemModal from "./item-add";

const Auktsion = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [pendingAuction, setPendingAuction] = useState({});
  const [addItem, setAddItem] = useState(false);

  const handleAddItem = () => {
    setAddItem(!addItem);
  };

  useEffect(() => {
    const register = JSON.parse(localStorage.getItem("register"));
    const fetchItem = async () => {
      try {
        const items = await ApiService.getData("/buyum", register?.access);
        const auktsion = await ApiService.getData(
          `/auktsion/${id}`,
          register?.access
        );
        console.log(auktsion);
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
  }, [addItem]);
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
                <p className="text-[14px]">Go to back</p>
              </button>
              <h1 className="font-bold text-text-primary clamp2">
                {pendingAuction?.name}
              </h1>
            </div>

            <div className="flex justify-start items-center gap-2">
              <NavLink
                to={`/auktsion-history/${id}`}
                className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] p-3 text-xl text-white shadow-btn_shadow"
              >
                <MdOutlineWorkHistory />
              </NavLink>
              <button
                onClick={handleAddItem}
                className="max-md:hidden bg-button-color flex justify-start items-center gap-2 rounded-[14px] py-2.5 px-4 text-white shadow-btn_shadow"
              >
                <FaPlus />
                <h1>Add Item</h1>
              </button>
              <button
                onClick={handleAddItem}
                className="z-[800] md:hidden fixed bottom-[16px] right-[16px] bg-button-color  flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow"
              >
                <FaPlus />
              </button>
            </div>
          </section>
          <section className="">
            <div className="col-span-2">
              <PandingAuction auktsionId={id} allItems={allItems} id={id} />
            </div>
          </section>
          <AddItemModal
            pendingAuction={pendingAuction}
            isOpen={addItem}
            handleClose={handleAddItem}
          />
        </main>
      )}
    </>
  );
};

export default Auktsion;
