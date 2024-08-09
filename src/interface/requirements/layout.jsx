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
import { TimeFormatFunction } from "../../components/time-format";
import AddTime from "./add-time";

const Requirements = () => {
  const { userData } = useSelector((state) => state.event);

  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requirement, setRequirement] = useState([]);
  const [delReq, setDelReq] = useState(false);
  const [delReqId, setReqId] = useState();
  const [updateReq, setUpdateReq] = useState();
  const [roles, setRoles] = useState([]);
  const [taskId, setTaskId] = useState();
  const [activeTab, setActiveTab] = useState(1);
  const [attachment, setAttachment] = useState(false);
  const handleAttachment = (item) => {
    setAttachment(!attachment);
    setTaskId(item);
  };

  const handleActiveTab = (active) => {
    setActiveTab(active.id);
  };
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
      const roles = await ApiService.getData("/role", register?.access);

      const filterReq = await Promise.all(
        res.map(async (item) => {
          const tasksreq = await ApiService.getData(
            `/tasksreq/${item?.task_id}`,
            register?.access
          );
          const role = await ApiService.getData(
            `/role/${item?.role_id}`,
            register?.access
          );
          return { ...tasksreq, role: role?.role, role_id: role?.id };
        })
      );

      console.log(filterReq, "req");
      setRoles(roles);
      setRequirement(filterReq);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReq();
  }, [isActive, delReq, attachment]);

  useEffect(() => {
    if (!isActive) {
      setUpdateReq();
    }
  }, [isActive]);
  console.log(requirement, "filter data");
  console.log(roles, "roles");
  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main className="sm:px-4 relative col-span-3 max-lg:grid-cols-1 flex flex-col gap-2 ">
          <section className="flex justify-between items-center">
            <h1 className="text-text-primary font-bold clamp3">
              Requirements and tasks
            </h1>
            {userData?.role?.talab_edit && (
              <>
                <button
                  onClick={handleActive}
                  className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow"
                >
                  <FaPlus />
                  <h1>Add Req</h1>
                </button>
                <button className="md:hidden fixed bottom-[16px] right-[16px] bg-button-color  flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow">
                  <FaPlus />
                </button>
              </>
            )}
          </section>
          <section className="grid max-md:grid-cols-1 max-xl:grid-cols-5 xl:grid-cols-4  max-lg:grid-cols-1 lg:gap-3">
            <div className="max-xl:col-span-2 col-span-1">
              <main className="sticky top-[88px] bg-card shadow-btn_shadow rounded-[14px] flex flex-col gap-3">
                <section className="w-full p-[8px] flex flex-col gap-[16px]">
                  {roles?.map((item, idx) => (
                    <button
                      onClick={() => handleActiveTab(item)}
                      key={idx}
                      className="flex justify-between items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={`
                       ${
                         item.id === activeTab
                           ? "bg-active-card text-primary"
                           : "hover:bg-hover-card text-thin-color"
                       } 
                         flex justify-start items-start flex-col px-[16px] py-[8px] rounded-[14px] w-full`}
                      >
                        <h1 className="font-bold clamp3 text-text-primary">
                          {item?.role}
                        </h1>
                      </div>
                      {item.id === activeTab && (
                        <div className="w-[4px] bg-primary rounded-[2px] h-[45px]"></div>
                      )}
                    </button>
                  ))}
                </section>
              </main>
            </div>
            <div className="max-md:col-span-1 col-span-3 max-lg:mt-2">
              {requirement?.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {requirement
                    ?.slice()
                    ?.reverse()
                    ?.map((item, idx) => {
                      if (!(item?.role_id === activeTab)) {
                        return null;
                      }
                      return (
                        <div className="flex flex-col gap-1">
                          <NavLink
                            to={`/requirements/${item?.id}`}
                            key={idx}
                            className="cursor-pointer hover:bg-hover-card bg-card shadow-btn_shadow rounded-[14px] w-full grid grid-cols-6 max-lg:grid-cols-3 max-xl:grid-cols-4 px-[24px] py-[16px] gap-3"
                          >
                            <div className="col-span-1">
                              <p className="text-thin-color clamp4">
                                Task name
                              </p>
                              <h1 className="text-text-primary font-bold">
                                {item?.name?.length > 15
                                  ? item?.name.slice(0, 15) + "..."
                                  : item?.name}
                              </h1>
                            </div>
                            <div className="col-span-1">
                              <p className="text-thin-color clamp4">Estimate</p>
                              <h1 className="text-text-primary font-[500]">
                                {TimeFormatFunction(item?.start_time)}
                              </h1>
                            </div>
                            <div className="col-span-1">
                              <p className="text-thin-color clamp4">Deadline</p>
                              <h1 className="text-text-primary font-[500]">
                                {TimeFormatFunction(item?.stop_time)}
                              </h1>
                            </div>
                            <div className="col-span-1 flex flex-col">
                              <p className="text-thin-color clamp4">Role</p>
                              <h1>{item?.role}</h1>
                            </div>
                            <div className="col-span-1">
                              <p className="text-thin-color clamp4">
                                Definition
                              </p>
                              <h1 className="text-text-primary font-[500]">
                                {item?.definition}
                              </h1>
                            </div>
                            <div className="col-span-1 flex justify-start items-center ">
                              <div
                                className={`
                          ${
                            item?.status === "Asked"
                              ? "bg-yellow-500"
                              : item?.status === "Expected"
                              ? "bg-blue-500"
                              : "bg-green-500"
                          } 
                          text-[12px] px-2 py-1 rounded-[14px]  text-white`}
                              >
                                {item?.status}
                              </div>
                            </div>
                          </NavLink>
                          {!(item.start_time && item?.stop_time) && (
                            <div className="w-full flex justify-end items-center ">
                              <button
                                onClick={() => handleAttachment(item)}
                                className="px-3 py-2 rounded-md bg-green-500 text-white font-[500]"
                              >
                                Attachment
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
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
                  <h1 className="clamp3 font-bold">
                    Requirements do not exist!
                  </h1>
                </div>
              )}
            </div>
          </section>
          <AddReq
            isOpen={isActive}
            handleClose={handleActive}
            updateItem={updateReq}
            roles={roles}
          />
          <DeleteModal
            isOpen={delReq}
            id={delReqId}
            handleClose={handleDeleteReq}
          />
          <AddTime
            taskId={taskId}
            isOpen={attachment}
            handleClose={handleAttachment}
          />
        </main>
      )}
    </>
  );
};

export default Requirements;
