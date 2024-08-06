import React, { useEffect, useState } from "react";
import { LuFilter } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { dataempty, photoUrl } from "../../images";
import { TimeFormatFunction } from "../../components/time-format";
import { ApiService } from "../../components/api.server";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import DeleteModal from "./delete-task";
import { groupEventSlice } from "../../reducer/event";
import AddTasks from "./add-task";

const Tasks = ({ toggleFilter, tasks, status }) => {
  const [usersInfoMap, setUsersInfoMap] = useState({}); // State to store users info by task ID
  const register = JSON.parse(localStorage.getItem("register"));
  const { userData } = useSelector((state) => state.event);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [delModal, setDelModal] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [selectId, setSelectId] = useState(null);
  const dispatch = useDispatch();
  const handleDeleteModal = () => {
    setDelModal(!delModal);
    dispatch(groupEventSlice());
  };
  const handleDelete = () => {
    setDelModal(!delModal);
    dispatch(groupEventSlice());
  };

  const handleEdit = (item) => {
    setEditModalData(item);
    setEditModal(!editModal);
    dispatch(groupEventSlice());
  };

  useEffect(() => {
    const fetchData = async (userList) => {
      try {
        const dataPromises = userList.map(async (user) => {
          try {
            const res = await ApiService.getData(
              `/users/${user?.user}`,
              register?.access
            );
            return res;
          } catch (error) {
            console.error(`Error fetching data for user ${user?.user}:`, error);
            return null;
          }
        });

        const data = await Promise.all(dataPromises);
        return data.filter((info) => info !== null);
      } catch (error) {
        console.error("Error in fetchData:", error);
        return [];
      }
    };

    const fetchAllUsersInfo = async () => {
      const tasksWithUsers = tasks.filter((task) => task.status === status);
      const usersInfoPromises = tasksWithUsers.map(async (item) => {
        if (item?.user.length > 0) {
          const usersInfo = await fetchData(item.user);
          return { id: item.id, usersInfo };
        }
        return { id: item.id, usersInfo: [] };
      });

      const usersInfoArray = await Promise.all(usersInfoPromises);
      const usersInfoMap = usersInfoArray.reduce((map, { id, usersInfo }) => {
        map[id] = usersInfo;
        return map;
      }, {});
      setUsersInfoMap(usersInfoMap);
    };

    fetchAllUsersInfo();
  }, [tasks, status, delModal]);

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <main className="col-span-3 max-lg:grid-cols-1 flex flex-col gap-2">
      <section className="flex justify-between items-center">
        <h1 className="text-text-primary font-bold clamp3">Tasks</h1>
        <div
          onClick={toggleFilter}
          className="p-[12px] rounded-[14px] bg-card cursor-pointer shadow-btn_shadow flex justify-center items-center"
        >
          <button>
            <LuFilter className="text-xl text-text-primary" />
          </button>
        </div>
      </section>
      {filteredTasks.length > 0 ? (
        <section className="flex flex-col gap-3">
          {filteredTasks
            .slice()
            ?.reverse()
            ?.map((item, idx) => {
              const usersInfo = usersInfoMap[item.id] || [];

              return (
                <div className="relative">
                  <NavLink
                    to={`/project/${item?.id}`}
                    key={idx}
                    className="relative cursor-pointer hover:bg-hover-card bg-card shadow-btn_shadow rounded-[14px] w-full grid grid-cols-6 max-lg:grid-cols-3 max-xl:grid-cols-4 px-[24px] py-[16px] gap-3"
                  >
                    <div className="col-span-1">
                      <p className="text-thin-color clamp4">Task name</p>
                      <h1 className="text-text-primary font-bold">
                        {item?.name.length > 15
                          ? item?.name.slice(0, 15) + "..."
                          : item?.name}
                      </h1>
                    </div>
                    <div className="col-span-1">
                      <p className="text-thin-color clamp4">VAB</p>
                      <h1 className="text-text-primary font-bold">
                        {item?.vab}
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
                    {usersInfo.length > 0 && (
                      <div className="col-span-1 flex flex-col w-full">
                        <p className="text-thin-color clamp4">Assignee</p>
                        <div>
                          {usersInfo?.slice(0, 3)?.map((user, idx) => (
                            <img
                              key={idx}
                              className="inline-flex h-6 w-6 rounded-full ring-2 ring-white"
                              src={
                                user?.profile_photo
                                  ? user?.profile_photo
                                  : photoUrl
                              }
                              alt=""
                            />
                          ))}
                          {usersInfo?.length > 3 && (
                            <div className="inline-flex h-6 w-6 rounded-full ring-2 ring-white bg-blue-300 text-white text-sm text-center font-bold justify-center items-center">
                              <h1>{usersInfo?.length - 3}+</h1>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="col-span-1">
                      <p className="text-thin-color clamp4">Definition</p>
                      <h1 className="text-text-primary font-[500]">
                        {item?.definition.length > 20
                          ? item?.definition.slice(0, 20) + "..."
                          : item?.definition}
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
                  {userData?.role?.yang_edit && userData?.role?.yang_delete && (
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
                            {userData?.role?.yang_edit && (
                              <MenuItem onClick={() => handleEdit(item)}>
                                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                  <MdModeEdit className="size-4 fill-thin" />
                                  Edit
                                  <kbd className="ml-auto hidden font-sans text-xs text-thin group-data-[focus]:inline">
                                    ⌘E
                                  </kbd>
                                </button>
                              </MenuItem>
                            )}
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </div>
                  )}
                </div>
              );
            })}
        </section>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col mt-4">
          <div className="w-full h-[200px]">
            <img
              className="w-full h-full object-contain"
              src={dataempty}
              alt=""
            />
          </div>
          <h1 className="clam3 font-bold">Tasks do not exist!</h1>
        </div>
      )}
      <AddTasks
        isOpen={editModal}
        handleClose={handleEdit}
        updateItem={editModalData}
      />

      <DeleteModal
        id={selectId?.id}
        isOpen={delModal}
        handleClose={handleDeleteModal}
      />
    </main>
  );
};

export default Tasks;
