import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { ApiService } from "../../components/api.server";
import { dataempty } from "../../images";
import Loader1 from "../../components/loader/loader1";
import AddAuktsion from "./add-auktsion";
import { useSelector } from "react-redux";

const Auktsion = () => {
  const [auktsion, setAuktsion] = useState();
  const [loading, setLoading] = useState(true);
  const [addAuktsion, setAddAuktsion] = useState(false);
  const { permissionStatus } = useSelector((state) => state.event);

  const handleAddAuktsion = () => {
    setAddAuktsion(!addAuktsion);
  };

  useEffect(() => {
    const auktionFetch = async () => {
      const register = JSON.parse(localStorage.getItem("register"));
      try {
        const res = await ApiService.getData("/auktsion", register?.access);
        setAuktsion(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    auktionFetch();
  }, [addAuktsion]);

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main className="w-full sm:px-4 mx-auto flex flex-col gap-3">
          <section className="w-full flex justify-between items-center">
            <h1 className="font-bold text-text-primary clamp2">Auctions</h1>
            <div className="flex justify-start items-center gap-2">
              <button className="hidden md:flex bg-card justify-start items-center gap-2 rounded-[14px] p-3 text-xl shadow-btn_shadow">
                <FiFilter />
              </button>
              {true && (
                <button
                  onClick={handleAddAuktsion}
                  className="bg-button-color flex justify-start items-center gap-2 rounded-md px-4 py-2 text-white shadow-btn_shadow"
                >
                  <FaPlus />
                  <h1>Add Auktsion</h1>
                </button>
              )}
            </div>
          </section>
          {auktsion?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-card rounded-xl shadow-sm">
                <thead>
                  <tr>
                    <th className="clamp4 px-4 py-2 border-b border-hr-color text-start">
                      N
                    </th>
                    <th className="clamp4 px-4 py-2 border-b border-hr-color text-start">
                      Name
                    </th>
                    <th className="clamp4 px-4 py-2 border-b border-hr-color text-start">
                      Date
                    </th>
                    <th className="clamp4 px-4 py-2 border-b border-hr-color text-start">
                      Winners
                    </th>
                    <th className="clamp4 px-4 py-2 border-b border-hr-color text-start">
                      Items
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {auktsion
                    ?.slice()
                    ?.reverse()
                    ?.map((item, idx) => (
                      <motion.tr
                        key={item?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => navigate(`/auktsion/${item?.id}`)}
                        className="bg-card hover:bg-hover-card cursor-pointer"
                      >
                        <td className="clamp4 px-4 py-2 border-b border-hr-color font-bold">
                          {idx + 1}
                        </td>
                        <td className="clamp4 px-4 py-2 border-b border-hr-color">
                          <div className="flex items-center">
                            {item?.name?.length > 15
                              ? item?.name.slice(0, 15) + "..."
                              : item?.name}
                          </div>
                        </td>
                        <td className="clamp4 px-4 py-2 border-b border-hr-color">
                          {item?.kuni?.split("T")[0]}
                        </td>
                        <td className="clamp4 px-4 py-2 border-b border-hr-color">
                          {item?.yutganlar}
                        </td>
                        <td className="clamp4 px-4 py-2 border-b border-hr-color">
                          {item?.buyumlar}
                        </td>
                      </motion.tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center flex-col">
              <div className="w-full h-[200px]">
                <img
                  className="w-full h-full object-contain"
                  src={dataempty}
                  alt="No data"
                />
              </div>
              <h1 className="clamp3 font-bold">Auktsion do not exist!</h1>
            </div>
          )}
        </main>
      )}
      <AddAuktsion isOpen={addAuktsion} handleClose={handleAddAuktsion} />
    </>
  );
};

export default Auktsion;
