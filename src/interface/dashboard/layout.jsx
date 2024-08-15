import React, { useEffect, useState } from "react";
import {
  arrowright,
  calendar,
  dataempty,
  emptygrouplogo,
  newsempty,
  photoUrl,
  time,
  yellowarrow,
} from "../../images";
import { NavLink } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { ApiService } from "../../components/api.server";
import Loader1 from "../../components/loader/loader1";
import { useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";

const Dashboard = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const { userData } = useSelector((state) => state.event);
  const [groupData, setGroupData] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async (userList) => {
      try {
        const dataPromises = userList.map(async (user) => {
          try {
            const res = await ApiService.getData(
              `/users/${user}`,
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
        console.error("Error in fetchUsers:", error);
        return [];
      }
    };
    const groupFetch = async () => {
      try {
        const group = await ApiService.getData(`/group`, register?.access);
        const res = await ApiService.getData("/yangiliklar", register?.access);
        console.log(res);
        const newsWithUsers = await Promise.all(
          res.map(async (newsItem) => {
            console.log(newsItem, "news");
            const usersInfo = await fetchUsers(newsItem?.user_id);
            return { ...newsItem, user_id: usersInfo };
          })
        );
        setNewsList(newsWithUsers);
        setGroupData(group);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    groupFetch();
  }, []);
  console.log(groupData);
  return (
    <div>
      {/* The rest of your component */}
      {loading ? (
        <Loader1 />
      ) : (
        <main className="flex flex-col gap-[20px] md:px-[20px] pb-[20px]">
          <article className="flex w-full justify-between items-center mb-[20px]">
            <div className="flex flex-col items-start justify-start">
              <p className="text-gray-500">
                Welcome back, {userData?.first_name}!
              </p>
              <h1 className="font-bold clamp2 text-text-primary">Dashboard</h1>
            </div>
          </article>
          <section className="grid grid-cols-6 gap-4">
            {/* Group Data Section */}
            <div className="col-span-4 max-lg:col-span-6">
              <div className="lg:flex-1 bg-card shadow-btn_shadow rounded-[24px] p-[18px] flex flex-col">
                <div className="w-full flex justify-between items-center mb-[20px]">
                  <h1 className="text-text-primary text-xl font-bold">
                    Groups
                  </h1>
                  <NavLink
                    to={"/groups"}
                    className="flex justify-center items-center"
                  >
                    <h1 className="text-primary cursor-pointer">View all</h1>
                    <MdOutlineKeyboardArrowRight className="text-primary" />
                  </NavLink>
                </div>
                {groupData.length > 0 ? (
                  <div className="grid xl:grid-cols-4 lg:grid-cols-2 max-sm:grid-cols-1 sm:grid-cols-2 flex-1 gap-2">
                    {groupData
                      .slice()
                      .reverse()
                      .map((item, idx) => (
                        <NavLink
                          to={
                            (item.users.find((c) => +c === userData.id) ||
                              userData?.role?.chat_edit) &&
                            `/groups/${item.id}`
                          }
                          className={`${
                            item.users.find((c) => +c === userData.id) ||
                            userData?.role?.chat_edit
                              ? "opacity-1"
                              : "opacity-[0.5]"
                          } w-full bg-background rounded-[24px] p-[16px] flex flex-col justify-start items-center gap-1`}
                          key={idx}
                        >
                          <img
                            src={
                              item?.group_photo
                                ? item.group_photo
                                : emptygrouplogo
                            }
                            alt="logo"
                            className="mb-[10px] object-cover w-16 h-16 rounded-full"
                          />
                          <h1 className="text-text-primary font-medium">
                            {item?.name}
                          </h1>
                          <p className="text-gray-500 font-bold">
                            {item?.shiori}
                          </p>
                          <p className="text-gray-500">
                            {item?.users?.length > 0 ? item.users.length : 0}{" "}
                            user
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
              </div>
            </div>
            {/* News Section */}
            <div className="col-span-2 max-lg:col-span-6">
              <div className="w-full bg-card shadow-btn_shadow rounded-[24px] p-[18px] flex flex-col">
                <div className="w-full flex justify-between items-center mb-[20px]">
                  <h1 className="text-text-pimary clamp3 font-bold">News</h1>
                  <NavLink
                    to={"/news"}
                    className="flex justify-center items-center"
                  >
                    <h1 className="text-primary cursor-pointer">View all</h1>
                    <MdOutlineKeyboardArrowRight className="text-primary" />
                  </NavLink>
                </div>
                {newsList.length > 0 ? (
                  <div className="flex flex-col w-full gap-[20px]">
                    {newsList?.slice(0, 3).map((item, idx) => (
                      <NavLink
                        to={`/news/${item?.id}`}
                        key={idx}
                        className="hover:bg-hover-card cursor-pointer p-2 flex flex-col w-full justify-between items-start gap-1 border-l-[4px] border-hr-color pl-2"
                      >
                        <div className="h-full flex flex-col justify-between">
                          <h1 className="w-full clamp3 text-text-primary font-bold">
                            {item?.title.length > 30
                              ? item?.title.slice(0, 30) + "..."
                              : item?.title}
                          </h1>
                        </div>
                        <div className="w-full flex justify-between items-center gap-3 mt-2">
                          <p className="text-thin text-[14px]">
                          19-07-2024 14:02
                          </p>
                          {/* <div className="flex justify-end items-center gap-2">
                            <div className="flex justify-start items-center gap-1">
                              <h1 className="font-[500]">{item.like}</h1>
                              <AiOutlineLike className="text-xl" />
                            </div>
                            <div>
                              {item?.user_id?.slice(0, 3)?.map((user, idx) => (
                                <img
                                  key={idx}
                                  className="inline-flex object-cover  h-6 w-6 rounded-full ring-2 ring-white"
                                  src={
                                    user?.profile_photo
                                      ? user?.profile_photo
                                      : photoUrl
                                  }
                                  alt=""
                                />
                              ))}
                              {newsList?.user_id?.length > 3 && (
                                <div className="inline-flex h-6 w-6 rounded-full ring-2 ring-white bg-blue-300 text-white text-sm text-center font-bold justify-center items-center">
                                  <h1>{newsList?.user_id?.length - 3}+</h1>
                                </div>
                              )}
                            </div>
                          </div> */}
                        </div>
                      </NavLink>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center flex-col">
                    <div className="w-full h-[200px]">
                      <img
                        className="w-full h-full object-contain"
                        src={newsempty}
                        alt=""
                      />
                    </div>
                    <h1 className="clam3 font-bold">News is not available</h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
