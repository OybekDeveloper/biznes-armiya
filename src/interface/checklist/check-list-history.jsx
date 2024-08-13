import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import { NavLink, useParams } from "react-router-dom";
import { ApiService } from "../../components/api.server";
import { dataempty, photoUrl } from "../../images";
import { TimeFormatFunction } from "../../components/time-format";
import { useSelector } from "react-redux";
import Loader1 from "../../components/loader/loader1";
const CheckListHistory = () => {
  const { id } = useParams();
  const { userData } = useSelector((state) => state.event);
  const { role } = userData;
  const [loading, setLoading] = useState(true);
  const register = JSON.parse(localStorage.getItem("register"));
  const [usersInfoMap, setUsersInfoMap] = useState({}); // State to store users info by task ID
  const [taskDones, setTasksDones] = useState([]);
  async function fetchData() {
    try {
      const res = await ApiService.getData("/task-dones", register?.access);
      const filterTasks = res.filter((tasks) => tasks.status === "Done");
      setTasksDones(filterTasks);
    } catch (error) {
      console.log(error);
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
      } finally {
        setLoading(false);
      }
    };

    const fetchAllUsersInfo = async () => {
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
    };

    fetchAllUsersInfo();
  }, [taskDones]);

  if (loading) {
    return <Loader1 />;
  }

  return (
    <div>
      {taskDones.length > 0 ? (
        <section className="flex flex-col gap-3">
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
    </div>
  );
};

export default CheckListHistory;
