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
  const { userData, eventSliceBool } = useSelector((state) => state.event);
  const { role } = userData;
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requirement, setRequirement] = useState([]);
  const [delReq, setDelReq] = useState(false);
  const [delReqId, setReqId] = useState();
  const [updateReq, setUpdateReq] = useState();
  const [roles, setRoles] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [attachment, setAttachment] = useState(false);
  const [checkedRequirements, setCheckedRequirements] = useState([]);

  const handleAttachment = (item) => {
    setAttachment(!attachment);
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

  const handleCheckData = (e, item) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedRequirements((prev) => [...prev, item]);
    } else {
      setCheckedRequirements((prev) =>
        prev.filter((req) => req.id !== item.id)
      );
    }
  };
  const handleEditReq = (item) => {
    setUpdateReq(item);
    handleActive();
  };

  const fetchReq = async () => {
    try {
      const register = JSON.parse(localStorage.getItem("register"));
      const res = await ApiService.getData("/talablar", register?.access);
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
      if (userData?.role?.talab_edit && userData?.role?.talab_delete) {
        setActiveTab(roles[0]?.id);
        setRoles(roles);
        setRequirement(filterReq);
      } else {
        const filterData = filterReq.filter(
          (c) => c.start_time !== null && c.endt_time !== null
        );
        console.log(userData);
        setActiveTab(userData?.role?.id);
        setRequirement(filterData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReq();
  }, [isActive, delReq, attachment, userData?.role?.id]);

  useEffect(() => {
    if (!isActive) {
      setUpdateReq();
    }
  }, [isActive, eventSliceBool]);

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
            {role?.talab_delete && role?.talab_delete && (
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
            )}
            <div
              className={`${
                role?.talab_delete && role?.talab_delete
                  ? "max-md:col-span-1 col-span-3 max-lg:mt-2"
                  : "col-span-5"
              }`}
            >
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
                        <div
                          key={idx}
                          className="flex item-center justify-start gap-1"
                        >
                          {role?.talab_delete && role?.talab_delete && (
                            <input
                              onChange={(e) => handleCheckData(e, item)}
                              type="checkbox"
                              className="w-4"
                              disabled={item?.start_time && item?.stop_time}
                            />
                          )}
                          <NavLink
                            to={`/requirements/${item?.id}`}
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
                              ? "bg-asked"
                              : item?.status === "Expected"
                              ? "bg-expected"
                              : item?.status === "Finished"
                              ? "bg-finished"
                              : "bg-done"
                          } 
                          text-[12px] px-2 py-1 rounded-[14px]  text-white`}
                              >
                                {item?.status}
                              </div>
                            </div>
                          </NavLink>
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
            isOpen={attachment}
            handleClose={handleAttachment}
            checkedRequirements={checkedRequirements}
          />
          {checkedRequirements.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleAttachment}
                className="px-3 py-2 rounded-md bg-green-600 font-bold text-white"
              >
                Achivement
              </button>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default Requirements;
