import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineWorkHistory } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { ApiService } from "../../components/api.server";
import { dataempty } from "../../images";
import Loader1 from "../../components/loader/loader1";
const Auktsion = () => {
  const [auktsion, setAuktsion] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auktionFetch = async () => {
      const register = JSON.parse(localStorage.getItem("register"));
      try {
        const res = await ApiService.getData("/auktsion", register?.access);
        setAuktsion(res);
        console.log(res, "auktion");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    auktionFetch();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main className="flex flex-col gap-3">
          <section className="w-full flex justify-between items-center">
            <h1 className="font-bold text-text-primary clamp2">Auctions</h1>
            <div className="flex justify-start items-center gap-2">
              <button className="max-md:hidden bg-card  flex justify-start items-center gap-2 rounded-[14px] p-3 text-xl shadow-btn_shadow">
                <FiFilter />
              </button>
              <button className="z-[800] bg-button-color flex justify-start items-center gap-2 rounded-md px-4 py-2 text-white shadow-btn_shadow">
                <FaPlus />
                <h1>Add Auktsion</h1>
              </button>
            </div>
          </section>
          {auktsion?.length > 0 ? (
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
                    Date
                  </th>
                  <th className="px-4 py-2 border-b border-hr-color text-start">
                    Winners
                  </th>
                  <th className="px-4 py-2 border-b border-hr-color text-start">
                    Items
                  </th>
                </tr>
              </thead>
              <tbody>
                {auktsion?.map((item, idx) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate(`/auktsion/${item?.id}`)}
                    className="bg-card hover:bg-hover-card cursor-pointer"
                  >
                    <td className="px-4 py-2 border-b border-hr-color font-bold">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-2 border-b border-hr-color">
                      <div className="flex items-center">{item.name}</div>
                    </td>
                    <td className="px-4 py-2 border-b border-hr-color">
                      {item.kuni}
                    </td>
                    <td className="px-4 py-2 border-b border-hr-color">
                      {item.yutganlar}
                    </td>
                    <td className="px-4 py-2 border-b border-hr-color">
                      {item.buyumlar}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full h-full flex justify-center items-center flex-col">
              <div className="w-full h-[200px]">
                <img
                  className="w-full h-full object-contain"
                  src={dataempty}
                  alt=""
                />
              </div>
              <h1 className="clam3 font-bold">Auktsion do not exist!</h1>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default Auktsion;
