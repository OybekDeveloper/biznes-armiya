import React, { useEffect, useState } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import AddReq from "./add-req";
import { ApiService } from "../../components/api.server";
import Loader1 from "../../components/loader/loader1";
import { useDispatch, useSelector } from "react-redux";
import { dataempty } from "../../images";
import { TimeFormatFunction } from "../../components/time-format";
import AddTime from "./add-time";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { CiMenuKebab } from "react-icons/ci";
import { groupEventSlice } from "../../reducer/event";
import DeleteModal from "./delete-task";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Requirements = () => {
  const { t } = useTranslation();
  const query = useQuery();
  const active = query.get("active");
  const { userData, eventSliceBool, searchMessage } = useSelector(
    (state) => state.event
  );
  const { role } = userData;
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requirement, setRequirement] = useState([]);
  const [filteredRequirement, setFilteredRequirement] = useState([]);
  const [updateReq, setUpdateReq] = useState();
  const [roles, setRoles] = useState([]);
  const [attachment, setAttachment] = useState(false);
  const [checkedRequirements, setCheckedRequirements] = useState([]);
  const [delModal, setDelModal] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteModal = () => {
    setDelModal(!delModal);
    dispatch(groupEventSlice());
  };
  const handleDelete = () => {
    setDelModal(!delModal);
    dispatch(groupEventSlice());
  };

  // const handleEdit = (item) => {
  //   setEditModalData(item);
  //   setEditModal(!editModal);
  //   dispatch(groupEventSlice());
  // };

  const handleAttachment = (item) => {
    setAttachment(!attachment);
  };

  const handleActive = () => {
    setIsActive(!isActive);
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

  const fetchReq = async () => {
    try {
      const register = JSON.parse(localStorage.getItem("register"));
      const res = await ApiService.getData("/talablar", register?.access);
      const roles = await ApiService.getData("/role", register?.access);

      const fetchedRequirements = await Promise.all(
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

      if (
        userData?.role?.tasks_users_edit &&
        userData?.role?.tasks_users_delete
      ) {
        setRoles(roles);
        setRequirement(fetchedRequirements);
      } else {
        const filteredData = fetchedRequirements.filter(
          (c) => c.start_time !== null && c.endt_time !== null
        );
        navigate(`?active=${register.role_id}`);
        setRequirement(filteredData);
      }
    } catch (error) {
      console.error("Error fetching requirements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReq();
  }, [isActive, attachment, userData?.role?.id, eventSliceBool]);

  useEffect(() => {
    // Filter requirements based on searchMessage
    const filtered = requirement.filter((item) =>
      item.name.toLowerCase().includes(searchMessage.toLowerCase())
    );
    setFilteredRequirement(filtered);
  }, [requirement, searchMessage]);

  useEffect(() => {
    if (!isActive) {
      setUpdateReq();
    }
  }, [isActive, eventSliceBool]);

  if (!userData?.role?.tasks_users_views) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="font-medium text-yellow-600">
        {t("warning_message")}
        </h1>
      </div>
    );
  }

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
            {userData?.role?.tasks_users_edit && (
              <>
                <button
                  onClick={handleActive}
                  className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow"
                >
                  <FaPlus />
                  <h1>Add Req</h1>
                </button>
                <button
                  onClick={handleActive}
                  className="md:hidden fixed bottom-[16px] right-[16px] bg-button-color  flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow"
                >
                  <FaPlus />
                </button>
              </>
            )}
          </section>
          <section className="grid max-md:grid-cols-1 max-xl:grid-cols-5 xl:grid-cols-4  max-lg:grid-cols-1 lg:gap-3">
            {role?.tasks_users_delete && role?.tasks_users_views && (
              <div className="max-xl:col-span-2 col-span-1">
                <main className="sticky top-[88px] bg-card shadow-btn_shadow rounded-[14px] flex flex-col gap-3">
                  <section className="w-full p-[8px] flex flex-col gap-[16px]">
                    {roles?.map((item, idx) => (
                      <NavLink
                        to={`?active=${item.id}`}
                        key={idx}
                        className="flex justify-between items-center gap-2 cursor-pointer"
                      >
                        <div
                          className={`
                       ${
                         item.id === parseInt(active)
                           ? "bg-active-card text-primary"
                           : "hover:bg-hover-card text-thin-color"
                       } 
                         flex justify-start items-start flex-col px-[16px] py-[8px] rounded-[14px] w-full`}
                        >
                          <h1 className="font-bold clamp3 text-text-primary">
                            {item?.role}
                          </h1>
                        </div>
                        {item.id === parseInt(active) && (
                          <div className="w-[4px] bg-primary rounded-[2px] h-[45px]"></div>
                        )}
                      </NavLink>
                    ))}
                  </section>
                </main>
              </div>
            )}
            <div
              className={`${
                role?.tasks_users_delete && role?.tasks_users_delete
                  ? "max-md:col-span-1 col-span-3 max-lg:mt-2"
                  : "col-span-5"
              }`}
            >
              {filteredRequirement?.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {filteredRequirement
                    ?.slice()
                    ?.reverse()
                    ?.map((item, idx) => {
                      if (
                        item.status === "Done" &&
                        !(role?.tasks_users_edit && role?.tasks_users_delete)
                      ) {
                        return null;
                      }
                      if (!(item?.role_id === parseInt(active))) {
                        return null;
                      }
                      return (
                        <div
                          key={idx}
                          className="relative flex item-center justify-start gap-1"
                        >
                          {role?.tasks_users_edit &&
                            role?.tasks_users_delete && (
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
                          {role?.tasks_delete && role?.tasks_edit && (
                            <div
                              onClick={() => setSelectId(item)}
                              className="absolute right-1 top-1"
                            >
                              <Menu>
                                <MenuButton className="inline-flex items-center gap-2 bg-background-secondary p-1 rounded-md z-10">
                                  <CiMenuKebab className="text-text-primary" />
                                </MenuButton>
                                <Transition
                                  enter="transition ease-out duration-75"
                                  enterFrom="opacity-0 scale-95"
                                  enterTo="opacity-100 scale-100"
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100 scale-100"
                                  leaveTo="opacity-0 scale-95"
                                >
                                  <MenuItems
                                    anchor="bottom end"
                                    className="w-52 origin-top-right rounded-xl bg-card mt-[5px] z-[999] shadow-btn_shadow outline-none"
                                  >
                                    {userData?.role?.yang_delete && (
                                      <MenuItem onClick={handleDelete}>
                                        <button className="group text-red-400 flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                          <FaRegTrashAlt className="size-4 fill-thin " />
                                          Delete
                                          <kbd className="ml-auto hidden font-sans text-xs text-thin group-data-[focus]:inline">
                                            ⌘D
                                          </kbd>
                                        </button>
                                      </MenuItem>
                                    )}
                                    {/* {userData?.role?.yang_edit && (
                              <MenuItem onClick={() => handleEdit(item)}>
                                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                  <MdModeEdit className="size-4 fill-thin" />
                                  Edit
                                  <kbd className="ml-auto hidden font-sans text-xs text-thin group-data-[focus]:inline">
                                    ⌘E
                                  </kbd>
                                </button>
                              </MenuItem>
                            )} */}
                                  </MenuItems>
                                </Transition>
                              </Menu>
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
            id={selectId?.id}
            isOpen={delModal}
            handleClose={handleDeleteModal}
          />
          <AddTime
            isOpen={attachment}
            setCheckedRequirements={setCheckedRequirements}
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
