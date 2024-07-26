import React, { useEffect, useState } from "react";
import {
  arrowright,
  calendar,
  dataempty,
  emptygrouplogo,
  newsempty,
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

const Dashboard = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const { userData } = useSelector((state) => state.event);
  const [groupData, setGroupData] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const groupFetch = async () => {
      try {
        const group = await ApiService.getData(`/group`, register?.access);
        const res = await ApiService.getData("/yangiliklar", register?.access);
        const user = await ApiService.getData(
          `/users/${register?.user_id}`,
          register?.access
        );
        console.log(user,'user')
        setNewsList(res);
        setGroupData(group);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    groupFetch();
  }, []);

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
                    {groupData.map((item, idx) => (
                      <div
                        className="w-full bg-background rounded-[24px] p-[16px] flex flex-col justify-start items-center gap-1"
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
                          {item?.user?.length > 0 ? item.user.length : 0} user
                        </p>
                        <p className="text-gray-500 py-1 px-2 border-border border-[1px] rounded-[4px] text-[12px]">
                          {item?.admin}
                        </p>
                      </div>
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
                    to={"/nearest"}
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
                        className="hover:bg-hover-card cursor-pointer p-2 rounded-md flex w-full justify-between items-center gap-1 border-l-[2px] border-hr-color pl-2"
                      >
                        <div className="h-full flex flex-col justify-between">
                          <h1 className="w-[90%] clamp3 text-text-primary font-bold">
                            {item?.title}
                          </h1>
                          <p className="text-thin text-[14px]">
                            Today | 5:00 PM
                          </p>
                        </div>
                        <div className="w-full h-full flex flex-col justify-between items-end gap-3">
                          <div className="text-yellow-500 flex justify-between items-center">
                            <h1>Midium</h1>
                            <img src={yellowarrow} alt="" />
                          </div>
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
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <img
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                              src="https://images.unsplash.com/photo-1468258409286-4c6bfc97c229?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </div>
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
