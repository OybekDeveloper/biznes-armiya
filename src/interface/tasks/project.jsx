import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { FaArrowDown } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { GoLink } from "react-icons/go";
import { IoArrowBack } from "react-icons/io5";
import { NavLink, useParams } from "react-router-dom";
import SelectListBox from "./progress-listbox";
import SendMessage from "./send-message";
import Data from "./chat-message";
import { ApiService } from "../../components/api.server";
import Loader1 from "../../components/loader/loader1";
import { dataempty, photoUrl } from "../../images";
import { useSelector } from "react-redux";
import ChatMessage from "./chat-message";
import TakeOverUser from "./take-over-user";

const Project = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const { userData, eventSliceBool } = useSelector((state) => state.event);
  const { role } = userData;
  const [chatMessageData, setChatMessageData] = useState([]);
  const { id } = useParams();
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);
  const [takeOverModal, setTakeOverModal] = useState(false);

  const handleTakeOverModal = () => {
    setTakeOverModal(!takeOverModal);
  };

  useEffect(() => {
    const fetchUsers = async (userList) => {
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
    const fetchData = async () => {
      try {
        const res = await ApiService.getData(`/tasks/${id}`, register?.access);
        const usersInfo = await fetchUsers(res.user);

        setTasks({ ...res, users: usersInfo });
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventSliceBool]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const message = await ApiService.getData("/chat/", register.access);
        setChatMessageData(message);
        console.log(message);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchMessage();
  }, [eventSliceBool]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <>
          {(tasks && tasks?.user?.find((c) => c.id === userData?.id)) ||
          role?.tasks_views ? (
            <main className="md:px-[16px] flex flex-col gap-3">
              <NavLink
                to={"/homework"}
                className="flex justify-start items-center gap-2 text-blue-500"
              >
                <IoArrowBack />
                <h1>Back Tasks</h1>
              </NavLink>
              <section className="w-full flex justify-between items-center">
                <h1 className="font-bold text-text-primary clamp2">Tasks</h1>
                <div className="flex justify-start items-center gap-2">
                  <button
                    onClick={handleTakeOverModal}
                    className="bg-green-500 hover:bg-green-600 transition-all duration-300  flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow"
                  >
                    <h1>Complete the task</h1>
                  </button>
                </div>
              </section>
              <section className="relative grid max-lg:grid-cols-2 lg:grid-cols-8 gap-3 mt-2">
                {/* Project detail */}
                <div className="max-lg:col-span-2 lg:col-span-3">
                  <div className=" bg-card rounded-[24px] p-3 sm:p-[24px] flex flex-col gap-4">
                    <div className="flex justify-between items-start w-full">
                      <div className="flex flex-col">
                        <h1 className="text-thin-color">Task Name</h1>
                        <p className="font-bold">{tasks?.name}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1>Description</h1>
                      <p className="text-thin-color">{tasks?.definition}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {tasks?.user?.length > 0 && (
                        <div className="col-span-1 flex flex-col w-full">
                          <p className="text-thin-color clamp4">Assignee</p>
                          <div>
                            {tasks?.users?.slice(0, 3)?.map((user, idx) => (
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
                            {tasks?.users?.length > 3 && (
                              <div className="inline-flex h-6 w-6 rounded-full ring-2 ring-white bg-blue-300 text-white text-sm text-center font-bold justify-center items-center">
                                <h1>{tasks?.users?.length - 3}+</h1>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 justify-start items-start">
                      <h1 className="text-thin-color">Priority</h1>
                      <div
                        className={`
                 ${
                   tasks?.status === "Asked"
                     ? "bg-yellow-500"
                     : tasks?.status === "Expected"
                     ? "bg-blue-500"
                     : "bg-green-500"
                 } 
                 text-[12px] px-2 py-1 rounded-[14px]  text-white`}
                      >
                        {tasks?.status}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-thin-color">Start Time</h1>
                      <p>{tasks?.start_time?.split("T")[0]}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-thin-color">End Time</h1>
                      <p>{tasks?.stop_time?.split("T")[0]}</p>
                    </div>
                  </div>
                </div>
                {/* Project CHat */}
                <div className="max-lg:col-span-2 lg:col-span-5 bg-card rounded-[24px] p-3 sm:p-[24px] flex flex-col gap-4">
                  {/* Chat section */}
                  <div className="relative flex justify-between flex-col h-full w-full gap-2">
                    <ChatMessage
                      chatMessageData={chatMessageData}
                      task_id={id}
                    />
                    <SendMessage task_id={id} />
                  </div>
                </div>
              </section>
            </main>
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
        </>
      )}
      <TakeOverUser
        status="done_task"
        item={tasks}
        isOpen={takeOverModal}
        handleClose={handleTakeOverModal}
      />
    </>
  );
};

export default Project;
