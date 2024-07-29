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
import ChatMessage from "./chat-message";
import { ApiService } from "../../components/api.server";
import Loader1 from "../../components/loader/loader1";
import { dataempty } from "../../images";

const Project = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const { id } = useParams();
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiService.getData(`/tasks/${id}`, register?.access);
        setTasks(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <>
          {tasks ? (
            <main className="md:px-[16px] flex flex-col gap-3">
              <NavLink
                to={"/homework"}
                className="flex justify-start items-center gap-2 text-blue-500"
              >
                <IoArrowBack />
                <h1>Back Tasks</h1>
              </NavLink>
              <section className="w-full flex justify-between items-center">
                <h1 className="font-bold text-text-primary clamp2">
                  {tasks?.name}
                </h1>
                <div className="flex justify-start items-center gap-2">
                  <button className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow">
                    <FaPlus />
                    <h1>Add Task</h1>
                  </button>
                  <button className="z-[800] md:hidden fixed bottom-[80px] right-[16px] bg-button-color  flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow">
                    <FaPlus />
                  </button>
                </div>
              </section>
              <section className="grid max-lg:grid-cols-2 lg:grid-cols-8 gap-3 mt-2">
                <div className="max-lg:col-span-2 lg:col-span-3">
                  <div className=" bg-card rounded-[24px] p-3 sm:p-[24px] flex flex-col gap-4">
                    <div className="flex justify-between items-start w-full">
                      <div className="flex flex-col">
                        <h1 className="text-thin-color">Task Number</h1>
                        <p>{tasks?.id}</p>
                      </div>
                      <BiEdit className="text-[24px] cursor-pointer" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1>Description</h1>
                      <p className="text-thin-color">{tasks?.definition}</p>
                    </div>
                    {/* <div className="flex flex-col gap-1">
           <h1 className="text-thin-color">Reporter</h1>
           <div className="flex gap-3">
             <img
               className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
               src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
               alt=""
             />
             <h1>Evan Yates</h1>
           </div>
         </div> */}
                    <div className="flex flex-col gap-1">
                      <h1 className="text-thin-color">Assignees</h1>
                      <div className="flex gap-3">
                        <div className="flex -space-x-1">
                          <img
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                          <img
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                          <img
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                            alt=""
                          />
                          <div className="inline-flex h-6 w-6 rounded-full ring-2 ring-white bg-blue-300 text-white text-sm text-center font-bold justify-center items-center">
                            <h1>2+</h1>
                          </div>
                        </div>
                      </div>
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
                    {/* <div className="flex gap-1 items-center">
           <FaCalendar className="text-thin-color" />
           <p>Created May 28, 2020</p>
         </div>
         <div className="flex flex-col gap-1">
           <h1 className="text-thin-color">Dead Line</h1>
           <p>Feb 23, 2020</p>
         </div> */}
                    {/* <div className="flex justify-start items-start gap-3">
           <div className="cursor-pointer p-3 rounded-[14px] bg-[#F1effb]">
             <GrAttachment className="text-[#6D5DD3]" />
           </div>
           <div className="cursor-pointer p-3 rounded-[14px] bg-[#e8f9fc]">
             <GoLink className="text-[#15C0E6]" />
           </div>
         </div> */}
                  </div>
                </div>
                {/* Project details */}
                <div className="max-lg:col-span-2 lg:col-span-5 bg-card rounded-[24px] p-3 sm:p-[24px] flex flex-col gap-4">
                  <div className="flex justify-between items-center gap-3">
                    <div className="flex flex-col justify-start items-start">
                      <p className="text-thin-color">PN0001245</p>
                      <h1 className="text-text-primary-color">
                        UX Login + Registration
                      </h1>
                    </div>
                    <SelectListBox />
                  </div>
                  <p className="text-thin-color">
                    Think over UX for Login and Registration, create a flow
                    using wireframes. Upon completion, show the team and
                    discuss. Attach the source to the task.
                  </p>
                  <div className="flex justify-start items-start gap-3">
                    <div className="cursor-pointer p-3 rounded-[14px] bg-[#F1effb]">
                      <GrAttachment className="text-[#6D5DD3]" />
                    </div>
                    <div className="cursor-pointer p-3 rounded-[14px] bg-[#e8f9fc]">
                      <GoLink className="text-[#15C0E6]" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-text-primary font-bold">
                      Task Attachments (3)
                    </h1>
                    <div className="whitespace-nowrap overflow-x-scroll w-full scrollScrolbar">
                      {[1, 2, 3, 4].map((item, idx) => (
                        <div
                          key={idx}
                          className="inline-flex w-[100px] object-cover relative rounded-t-[12px] overflow-hidden mr-[10px]"
                        >
                          <img
                            src="https://media.istockphoto.com/id/1303877287/vector/paper-checklist-and-pencil-flat-pictogram.jpg?s=612x612&w=0&k=20&c=NoqPzn94VH2Pm7epxF8P5rCcScMEAiGQ8Hv_b2ZwRjY="
                            alt="img"
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute top-0 left-0 w-full h-full backdrop-brightness-50 flex justify-end items-end">
                            <div className="w-full h-[60px] rounded-t-[14px] p-2 bg-background">
                              <h1 className="text-text-primary font-bold text-[12px]">
                                site screens.png
                              </h1>
                              <p className="text-thin-color text-[12px]">
                                Sep 19, 2020 | 10:52 AM
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Chat section */}
                  <div className="w-full h-[1px] bg-slate-500" />
                  <div className="relative flex justify-between flex-col h-full w-full gap-2">
                    <ChatMessage />
                    <SendMessage />
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
    </>
  );
};

export default Project;
