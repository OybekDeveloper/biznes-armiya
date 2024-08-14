import React, { useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { GoLink } from "react-icons/go";
import { IoArrowBack } from "react-icons/io5";
import { NavLink, useParams } from "react-router-dom";
import { ApiService } from "../../components/api.server";
import Loader1 from "../../components/loader/loader1";
import { dataempty, photoUrl } from "../../images";
import { useSelector } from "react-redux";
import ChatMessage from "../tasks/chat-message";
import SendMessage from "../tasks/send-message";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import SimpleLoading from "../../components/loader/simple-loading";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { eventSliceAction } from "../../reducer/event";

const RequirementItem = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const { userData, eventSliceBool } = useSelector((state) => state.event);
  const { role } = userData;
  const [chatMessageData, setChatMessageData] = useState([]);
  const { id } = useParams();
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);
  const [takeOverModal, setTakeOverModal] = useState(false);
  const [reject, setReject] = useState(false);
  const handleTakeOverModal = (reject) => {
    setTakeOverModal(!takeOverModal);
    console.log(reject, "reject");
    if (reject.type === "click") {
      setReject(false);
    } else {
      setReject(true);
    }
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
        const res = await ApiService.getData(
          `/tasksreq/${id}`,
          register?.access
        );
        const usersInfo = await fetchUsers(res.user);

        setTasks({ ...res, users: usersInfo });
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
          role?.talab_views ? (
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
                  {tasks.status === "Asked" ? (
                    <button
                      onClick={handleTakeOverModal}
                      className="bg-expected hover:bg-expected-hover transition-all duration-300  flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow"
                    >
                      <h1>Take It</h1>
                    </button>
                  ) : tasks.status === "Expected" ? (
                    <button
                      onClick={handleTakeOverModal}
                      className="bg-finished hover:bg-finished-hover transition-all duration-300  flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow"
                    >
                      <h1>Complete the task</h1>
                    </button>
                  ) : (
                    role?.tasks_edit && (
                      <>
                        {tasks.status !== "Done" && (
                          <button
                            onClick={handleTakeOverModal}
                            className="bg-done hover:bg-done-hover transition-all duration-300  flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow"
                          >
                            <h1>Done task</h1>
                          </button>
                        )}
                        <button
                          onClick={() => handleTakeOverModal(true)}
                          className="bg-red-500 hover:bg-red-600 transition-all duration-300  flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow"
                        >
                          <h1>Reject task</h1>
                        </button>
                      </>
                    )
                  )}
                </div>
              </section>
              <section className="relative grid max-lg:grid-cols-2 lg:grid-cols-8 gap-3 mt-2">
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
                      ? "bg-asked"
                      : tasks?.status === "Expected"
                      ? "bg-expected"
                      : tasks?.status === "Finished"
                      ? "bg-finished"
                      : "bg-done"
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
                {/* Project details */}
                <div className="relative max-lg:col-span-2 lg:col-span-5 bg-card rounded-[24px] p-3 sm:p-[24px] flex flex-col gap-4">
                  {/* Chat section */}
                  {tasks?.status === "Asked" && (
                    <div className="w-full h-full z-20 absolute top-0 left-0 backdrop-blur-sm"></div>
                  )}
                  <div className="chat-back relative flex justify-between flex-col h-full w-full gap-2">
                    <ChatMessage
                      status={tasks?.status}
                      chatMessageData={chatMessageData}
                      task_id={id}
                    />
                    <SendMessage status={tasks.status} task_id={id} />
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
        status={tasks?.status}
        reject={reject}
        item={tasks}
        isOpen={takeOverModal}
        handleClose={handleTakeOverModal}
      />
    </>
  );
};

export default RequirementItem;

function TakeOverUser({ isOpen, handleClose, item, status, reject }) {
  const register = JSON.parse(localStorage.getItem("register"));
  console.log(reject);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddVabUsers = async (item) => {
    try {
      await Promise.all(
        item.users.map(async (c) => {
          const vabPlus = item.user.find((d) => +d.user === c.id);
          if (vabPlus) {
            await ApiService.patchData(
              `/users/${c.id}`,
              {
                vab: +c.vab + +vabPlus.vab,
              },
              register?.access
            );
          }
        })
      );

      dispatch(eventSliceAction());
      toast.success(
        status === "take_over"
          ? "Task mastered successfully!"
          : "Task successfully finished!!!",
        {
          style: {
            backgroundColor: "green",
            border: "1px solid green",
            padding: "16px",
            color: "#fff",
          },
          position: "right-top",
          iconTheme: {
            primary: "#fff",
            secondary: "green",
          },
        }
      );
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    const deleteFetch = async () => {
      setLoading(true);
      const takeOver = {
        definition: item.definition,
        name: item.name,
        status: "Expected",
        user: [
          {
            user: register.user_id,
            vab: item.vab,
          },
        ],
        group_id: 1,
      };
      const finishedTask = {
        definition: item.definition,
        name: item.name,
        status: "Finished",
        user: item.user,
      };
      const DoneTasks = {
        definition: item.definition,
        name: item.name,
        status: "Done",
        user: item.user,
      };
      try {
        if (reject) {
          await ApiService.putData(
            `/tasksreq/${item.id}`,
            {
              definition: item.definition,
              name: item.name,
              status: "Expected",
              user: item.user,
            },
            register?.access
          );
          dispatch(eventSliceAction());
          toast.success("Task successfully rejected!!!", {
            style: {
              backgroundColor: "red",
              border: "1px solid red",
              padding: "16px",
              color: "#fff",
            },
            position: "right-top",
            iconTheme: {
              primary: "#fff",
              secondary: "red",
            },
          });
          handleClose();
          return null;
        }

        await ApiService.putData(
          `/tasksreq/${item.id}`,
          status === "Asked"
            ? takeOver
            : status === "Expected"
            ? finishedTask
            : DoneTasks,
          register?.access
        );
        if (status === "Finished") {
          await handleAddVabUsers(item);
          return;
        }
        dispatch(eventSliceAction());
        toast.success(
          status === "take_over"
            ? "Task mastered successfully!"
            : "Task successfully finished!!!",
          {
            style: {
              backgroundColor: "green",
              border: "1px solid green",
              padding: "16px",
              color: "#fff",
            },
            position: "right-top",
            iconTheme: {
              primary: "#fff",
              secondary: "green",
            },
          }
        );
        handleClose();
      } catch (error) {
        console.error("Error deleting tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    deleteFetch();
  };

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-[998] focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 z-[999] w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl">
                <DialogTitle
                  as="h3"
                  className="text-clamp2 font-medium text-text-primary"
                >
                  {status === "Asked"
                    ? "Mastering the task"
                    : status === "Expected"
                    ? "Complete the task"
                    : "Confirmation of completion"}
                </DialogTitle>
                <p className="mt-2 text-sm/6 text-thin-color">
                  {status === "Asked"
                    ? "Do you really want to take this task all to yourself?"
                    : status === "Expected"
                    ? "Do you sure you want to complete the task?"
                    : "Are you sure you have completed the task?"}
                </p>
                <div className="mt-4 flex justify-between items-center gap-3">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={handleDelete}
                  >
                    {loading ? (
                      <div className="flex justify-start items-center gap-2 opacity-[0.8]">
                        <SimpleLoading />
                        <h1>Loading...</h1>
                      </div>
                    ) : (
                      <h1>Yes</h1>
                    )}
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
