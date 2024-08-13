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
import FilterAuktsion from "./filter-auktion";
import moment from "moment";

const Auktsion = () => {
  const [auktsion, setAuktsion] = useState([]);
  const [filteredAuktsion, setFilteredAuktsion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addAuktsion, setAddAuktsion] = useState(false);
  const { userData } = useSelector((state) => state.event);
  const [filterAuktsion, setFilterAuktsion] = useState(false);

  const handleFilterAuktsion = () => {
    setFilterAuktsion(!filterAuktsion);
  };

  const handleAddAuktsion = () => {
    setAddAuktsion(!addAuktsion);
  };

  useEffect(() => {
    const auktionFetch = async () => {
      const register = JSON.parse(localStorage.getItem("register"));
      try {
        const res = await ApiService.getData("/auktsion", register?.access);
        setAuktsion(res);
        setFilteredAuktsion(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    auktionFetch();
  }, [addAuktsion]);

  const applyFilters = ({ startDate, endDate }) => {
    let filteredData = auktsion;
    if (startDate && endDate) {
      filteredData = auktsion.filter((item) => {
        const itemDate = moment(item.kuni.split("T")[0]);
        return (
          itemDate.isSameOrAfter(startDate, "day") &&
          itemDate.isSameOrBefore(endDate, "day")
        );
      });
    }
    setFilteredAuktsion(filteredData);
  };

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
              <button
                onClick={handleFilterAuktsion}
                className="flex bg-card justify-start items-center gap-2 rounded-[14px] p-3 text-xl shadow-btn_shadow"
              >
                <FiFilter />
              </button>
              {userData?.role?.auktsion_edit && (
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
          {filteredAuktsion?.length > 0 ? (
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
                  {filteredAuktsion
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
                          {item?.winners?.length || 0}
                        </td>
                        <td className="clamp4 px-4 py-2 border-b border-hr-color">
                          {item?.buyumlar?.length || 0}
                        </td>
                      </motion.tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <img src={dataempty} alt="Empty data" className="w-48" />
              <h1 className="mt-4 text-xl text-center text-text-primary">
                No auctions available.
              </h1>
            </div>
          )}
        </main>
      )}
      <AddAuktsion isOpen={addAuktsion} handleClose={handleAddAuktsion} />
      <FilterAuktsion
        isOpen={filterAuktsion}
        handleClose={handleFilterAuktsion}
        applyFilters={applyFilters}
      />
    </>
  );
};

export default Auktsion;
