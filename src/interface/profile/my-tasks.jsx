import React, { useEffect, useState } from "react";
import { GoLink } from "react-icons/go";
import { GrAttachment } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { dataempty, photoUrl } from "../../images";
import { TimeFormatFunction } from "../../components/time-format";
import { ApiService } from "../../components/api.server";
import { useSelector } from "react-redux";
import Loader1 from "../../components/loader/loader1";
const MyTasks = () => {
  const { userData } = useSelector((state) => state.event);
  const { role } = userData;
  const [loading, setLoading] = useState(true);
  const register = JSON.parse(localStorage.getItem("register"));
  const [usersInfoMap, setUsersInfoMap] = useState({}); // State to store users info by task ID
  const [taskDones, setTasksDones] = useState([]);
  const [taskDonesReq, setTasksDonesReq] = useState([]);
  async function fetchData() {
    try {
      const res = await ApiService.getData("/tasks", register?.access);
      const res2 = await ApiService.getData("/tasksreq", register?.access);
      console.log(res2);
      const filterTasks = res.filter((c) =>
        c.user.find((u) => +u.user === userData?.id)
      );
      const filterTasks2 = res2.filter((c) =>
        c.user.find((u) => +u.user === userData?.id)
      );
      setTasksDones(filterTasks);
      setTasksDonesReq(filterTasks2);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
      try {
        const usersInfoPromises = taskDones.map(async (item) => {
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsersInfo();
  }, [taskDones]);
  console.log(taskDonesReq);

  if (loading) {
    return <Loader1 />;
  }
  return (
    <main className="flex flex-col gap-3">
      <section className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-3  max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
        {/* statistic 1 */}
        <div className="rounded-[14px] shadow-btn_shadow bg-card p-4 flex flex-col gap-2">
          <div className="w-24 h-24">
            <CircularProgressbar
              maxValue={16}
              value={12}
              text={12}
              styles={buildStyles({
                textColor: "#15C0E6",
                pathColor: "#15C0E6",
                trailColor: "rgba(var(--background))",
              })}
            />
          </div>
          <h1 className="font-bold text-text-primary clamp3">Vacation</h1>
          <p className="text-thin-color clamp4">12/16 days availible</p>
        </div>
        {/* statistic 2 */}
        <div className="rounded-[14px] shadow-btn_shadow bg-card p-4 flex flex-col gap-2">
          <div className="w-24 h-24">
            <CircularProgressbar
              maxValue={12}
              value={6}
              text={6}
              styles={buildStyles({
                textColor: "#F65160",
                pathColor: "#F65160",
                trailColor: "rgba(var(--background))",
              })}
            />
          </div>
          <h1 className="font-bold text-text-primary clamp3">Sick Leave</h1>
          <p className="text-thin-color clamp4">6/12 days availible</p>
        </div>
        {/* statistic 3 */}
        <div className="rounded-[14px] shadow-btn_shadow bg-card p-4 flex flex-col gap-2">
          <div className="w-24 h-24">
            <CircularProgressbar
              maxValue={50}
              value={42}
              text={42}
              styles={buildStyles({
                textColor: "#6D5DD3",
                pathColor: "#6D5DD3",
                trailColor: "rgba(var(--background))",
              })}
            />
          </div>
          <h1 className="font-bold text-text-primary clamp3">Work remotely</h1>
          <p className="text-thin-color clamp4">42/50 days availible</p>
        </div>
      </section>
      <section className="flex flex-col gap-3">
        {taskDones.length > 0 && taskDonesReq.length > 0 ? (
          <div>
            <section className="flex flex-col gap-3">
              <h1 className="text-text-primary font-bold clamp3">
                Tasks Requests
              </h1>
              {taskDones
                .slice()
                .reverse()
                .map((item, idx) => {
                  const usersInfo = usersInfoMap[item.id] || [];
                  return (
                    <div key={idx} className="relative">
                      <NavLink
                        to={
                          (role?.tasks_views &&
                            role.tasks_edit &&
                            role.tasks_delete) ||
                          item.user.find((c) => +c.user === +userData.id)
                            ? `/project/${item?.id}`
                            : null
                        }
                        className="relative cursor-pointer hover:bg-hover-card bg-card shadow-btn_shadow rounded-[14px] w-full grid grid-cols-6 max-lg:grid-cols-3 max-xl:grid-cols-4 px-[24px] py-[16px] gap-3"
                      >
                        <div className="col-span-1">
                          <p className="text-thin-color clamp4">Task name</p>
                          <h1 className="text-text-primary font-bold whitespace-normal">
                            {item?.name.length > 10
                              ? item?.name.slice(0, 10) + "..."
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
            </section>
            <section className="flex flex-col gap-3">
              <h1 className="text-text-primary font-bold clamp3">
                Requirements Requests
              </h1>
              {taskDonesReq
                .slice()
                .reverse()
                .map((item, idx) => {
                  const usersInfo = usersInfoMap[item.id] || [];
                  return (
                    <div key={idx} className="relative">
                      <NavLink
                        to={
                          (role?.tasks_views &&
                            role.tasks_edit &&
                            role.tasks_delete) ||
                          item.user.find((c) => +c.user === +userData.id)
                            ? `/project/${item?.id}`
                            : null
                        }
                        className="relative cursor-pointer hover:bg-hover-card bg-card shadow-btn_shadow rounded-[14px] w-full grid grid-cols-6 max-lg:grid-cols-3 max-xl:grid-cols-4 px-[24px] py-[16px] gap-3"
                      >
                        <div className="col-span-1">
                          <p className="text-thin-color clamp4">Task name</p>
                          <h1 className="text-text-primary font-bold whitespace-normal">
                            {item?.name.length > 10
                              ? item?.name.slice(0, 10) + "..."
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
            </section>
          </div>
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
      </section>
    </main>
  );
};

export default MyTasks;
