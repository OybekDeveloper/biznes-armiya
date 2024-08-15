import { useEffect, useState } from "react";
import Loader1 from "../../components/loader/loader1";
import { dataempty, emptygrouplogo, photoUrl } from "../../images";
import { useSelector } from "react-redux";
import { ApiService } from "../../components/api.server";
import { NavLink } from "react-router-dom";
import { TimeFormatFunction } from "../../components/time-format";
import { MdOutlineHistory } from "react-icons/md";

const Checklist = () => {
  const { userData, groupEvent, searchMessage } = useSelector((state) => state.event);
  const { role } = userData;
  const register = JSON.parse(localStorage.getItem("register"));
  const [isAddGroup] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskDones, setTasksDones] = useState([]);
  const [usersInfoMap, setUsersInfoMap] = useState({});
  const [filteredGroupData, setFilteredGroupData] = useState([]);
  const [filteredTaskDones, setFilteredTaskDones] = useState([]);

  useEffect(() => {
    const groupFetch = async () => {
      try {
        const group = await ApiService.getData(`/group`, register?.access);
        setGroupData(group);
        const res = await ApiService.getData("/task-dones", register?.access);
        const filterTasks = res.filter((c) => c.status === "Finished");
        setTasksDones(filterTasks);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    groupFetch();
  }, [isAddGroup, groupEvent]);

  useEffect(() => {
    const fetchData = async (userList) => {
      try {
        const dataPromises = userList.map(async (user) => {
          try {
            const res = await ApiService.getData(`/users/${user?.user}`, register?.access);
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

  useEffect(() => {
    const filterData = () => {
      const lowercasedSearchMessage = searchMessage.toLowerCase();
      
      const filteredGroups = groupData.filter((item) =>
        item.name.toLowerCase().includes(lowercasedSearchMessage)
      );

      setFilteredGroupData(filteredGroups);

      const filteredTasks = taskDones.filter((item) =>
        item.name.toLowerCase().includes(lowercasedSearchMessage)
      );

      setFilteredTaskDones(filteredTasks);
    };

    filterData();
  }, [searchMessage, groupData, taskDones]);

  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main className="col-span-3 max-lg:grid-cols-1 flex flex-col gap-2">
          <section className="flex justify-between items-center">
            <h1 className="text-text-primary font-bold clamp3">Check List</h1>
            <NavLink
              to={"/checklist-history"}
              aria-label="Toggle VAB History"
              className="flex bg-button-color items-center gap-2 rounded-md py-2 px-4 text-white shadow-btn_shadow"
            >
              <MdOutlineHistory className="text-xl" />
              <span>History</span>
            </NavLink>
          </section>
          {loading ? (
            <Loader1 />
          ) : (
            <section className="min-h-[300px] lg:flex-1 bg-card shadow-btn_shadow rounded-[24px] p-[18px] flex flex-col">
              {filteredGroupData.length > 0 ? (
                <div className="grid xl:grid-cols-4 lg:grid-cols-2 max-sm:grid-cols-1 sm:grid-cols-2 flex-1 gap-2">
                  {filteredGroupData
                    .slice()
                    .reverse()
                    .map((item, idx) => (
                      <NavLink
                        to={
                          (item.users.find((c) => +c === userData.id) ||
                            userData?.role?.chat_edit) &&
                          `/checklist/${item.id}`
                        }
                        className={`${
                          item.users.find((c) => +c === userData.id) ||
                          userData?.role?.chat_edit
                            ? "opacity-1"
                            : "opacity-[0.5]"
                        } w-full bg-background rounded-[24px] p-[16px] flex flex-col justify-start items-center gap-1`}
                        key={idx}
                      >
                        <div className="w-24 h-24 flex justify-center items-center">
                          <img
                            src={
                              item?.group_photo
                                ? item?.group_photo
                                : emptygrouplogo
                            }
                            alt="logo"
                            className="mb-[10px] w-16 h-16 rounded-full object-cover"
                          />
                        </div>
                        <h1 className="text-text-primary font-medium">
                          {item?.name.length > 20
                            ? item?.name.slice(0, 20) + "..."
                            : item?.name}
                        </h1>
                        <p className="text-gray-500 font-bold">
                          {item?.shiori.length > 25
                            ? item?.shiori.slice(0, 25) + "..."
                            : item?.shiori}
                        </p>
                        <p className="text-gray-500">
                          {item?.users?.length > 0 ? item.users.length : 0} user
                        </p>
                        <p className="text-gray-500 py-1 px-2 border-border border-[1px] rounded-[4px] text-[12px]">
                          {item?.admin ? item.admin : "no admin"}
                        </p>
                      </NavLink>
                    ))}
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center flex-col">
                  <div className="w-full h-[200px]">
                    <img
                      className="w-full h-full object-contain"
                      src={dataempty}
                      alt=""
                    />
                  </div>
                  <h1 className="clam3 font-bold">Groups do not exist!</h1>
                </div>
              )}
            </section>
          )}
          {role?.tasks_edit && role?.tasks_delete && (
            <section className="flex flex-col gap-3">
              {filteredTaskDones
                .slice()
                .reverse()
                .map((item, idx) => {
                  const usersInfo = usersInfoMap[item.id] || [];
                  if (!item.group_id) {
                    return null;
                  }
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
          )}
        </main>
      )}
    </>
  );
};

export default Checklist;
