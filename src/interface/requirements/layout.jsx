import React, { useEffect, useState } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import AddReq from "./add-req";
import { ApiService } from "../../components/api.server";
import Loader1 from "../../components/loader/loader1";
import { useSelector } from "react-redux";
import { dataempty } from "../../images";
import { MdModeEdit } from "react-icons/md";
import DeleteModal from "./delete-req";

const Requirements = () => {
  const { permissionStatus } = useSelector((state) => state.event);

  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requirement, setRequirement] = useState([]);
  const [delReq, setDelReq] = useState(false);
  const [delReqId, setReqId] = useState();
  const [updateReq, setUpdateReq] = useState();

  const handleActive = () => {
    setIsActive(!isActive);
  };

  const handleDeleteReq = (id) => {
    setDelReq(!delReq);
    setReqId(id);
  };

  const handleEditReq = (item) => {
    setUpdateReq(item);
    handleActive();
  };

  const fetchReq = async () => {
    try {
      const register = JSON.parse(localStorage.getItem("register"));
      const res = await ApiService.getData("/talablar", register?.access);
      console.log(res);
      setRequirement(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReq();
  }, [isActive, delReq]);

  useEffect(() => {
    if (!isActive) {
      setUpdateReq();
    }
  }, [isActive]);

  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main className="sm:px-4 relative col-span-3 max-lg:grid-cols-1 flex flex-col gap-2 ">
          <section className="flex justify-between items-center">
            <h1 className="text-text-primary font-bold clamp3">
              Tekshirish Ro’yxati
            </h1>
            <button
              onClick={handleActive}
              className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow"
            >
              <FaPlus />
              <h1>Add Request</h1>
            </button>
            <button className="md:hidden fixed bottom-[16px] right-[16px] bg-button-color  flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow">
              <FaPlus />
            </button>
          </section>
          {requirement?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-card rounded-xl shadow-sm">
                <thead className="border-b border-hr-color">
                  <tr>
                    <th className="clamp4 px-4 py-2 text-start">N</th>
                    <th className="clamp4 px-4 py-2 text-start">Topic</th>
                    <th className="clamp4 px-4 py-2 text-start">Date</th>
                    <th className="clamp4 px-4 py-2 text-start">Theme</th>
                    <th className="clamp4 px-4 py-2 text-start"></th>
                  </tr>
                </thead>
                <tbody>
                  {requirement
                    ?.slice()
                    ?.reverse()
                    ?.map((item, idx) => (
                      <motion.tr
                        key={item?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-card hover:bg-hover-card cursor-pointer border-b border-hr-color"
                      >
                        <td className="clamp4 px-4 py-2 font-bold">
                          {idx + 1}
                        </td>
                        <td className="clamp4 px-4 py-2">
                          <div className="flex items-center">
                            {item?.mavzu?.length > 15
                              ? item?.mavzu.slice(0, 15) + "..."
                              : item?.mavzu}
                          </div>
                        </td>
                        <td className="clamp4 px-4 py-2">
                          {item?.create_date?.split("T")[0]}
                        </td>
                        <td className="clamp4 px-4 py-2">
                          {item?.content  ?.length > 15
                            ? item?.content .slice(0, 15) + "..."
                            : item?.content }
                        </td>
                        <td className="h-full clamp4 px-4 py-2 flex justify-end items-center gap-3">
                          <FaRegTrashAlt
                            onClick={() => handleDeleteReq(item?.id)}
                            className="size-4 fill-red-600"
                          />
                          <MdModeEdit
                            onClick={() => handleEditReq(item)}
                            className="size-4 fill-thin"
                          />
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
              <h1 className="clamp3 font-bold">Requirements do not exist!</h1>
            </div>
          )}
          <AddReq
            isOpen={isActive}
            handleClose={handleActive}
            updateItem={updateReq}
          />
          <DeleteModal
            isOpen={delReq}
            id={delReqId}
            handleClose={handleDeleteReq}
          />
        </main>
      )}
    </>
  );
};

export default Requirements;
