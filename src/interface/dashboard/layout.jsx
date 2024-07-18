import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  arrowright,
  calendar,
  dataempty,
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

const Dashboard = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const groupFetch = async () => {
      try {
        const group = await ApiService.getData(`/group`, register?.access);
        console.log(group);
        setGroupData(group);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    groupFetch();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | Biznes Armiya</title>
        <link rel="icon" href="/" />
      </Helmet>
      {loading ? (
        <div>
          <Loader1 />
        </div>
      ) : (
        <main className="flex flex-col gap-[20px] md:px-[20px] pb-[20px]">
          <article className="flex w-full justify-between items-center mb-[20px]">
            <div className="flex flex-col items-start justify-start">
              <p className="text-gray-500">Welcome back, Evan!</p>
              <h1 className="font-bold clamp2 text-text-primary">Dashboard</h1>
            </div>
            <button className="bg-primary text-primary text-white px-[10px] py-[5px] rounded">
              <img src={calendar} alt="" />
              <div></div>
            </button>
          </article>
          <section className="flex gap-[30px] max-lg:flex-col ">
            <div className="min-h-[300px] lg:flex-1 bg-card shadow-btn_shadow rounded-[24px] p-[18px] flex flex-col">
              <div className="w-full flex justify-between items-center mb-[20px]">
                <h1 className="text-text-primary text-xl font-bold">Groups</h1>
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
                      {/* <img
                        src="https://s3-alpha-sig.figma.com/img/e699/08ec/4d1a06f005fea30771b61b3a4f903dd3?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hDp9zObNSJ2BfAdlkuLzg3man5qr~dTPNzqqOEBgQKt-Gf0LJYrAIOCbSbKTzk3A-9AVBGxQ4LA4KMGBYqlQqys~BNHwqOtsOi7sC1YCBs-h5yUnaLm0UfMntV2bRvWlSGN5WnsaHeQBXJdOWJGmIGTk0eamelE0XPrUh7isz7vo5kZykeVjj0uAGt8azfItg0A6jGT-tkr~I0ygXneGM3B8u8ik3tXhQeryDSmp7JJlI-VM-aZVeupxpIPERxAadw4gnAYiyKb2Dei0Hf2YETiHgetO1WoD9VeL17r2fEvbrOqzXLbnHq4hHBm8bKqglrLX8RUx0y32kNZalXYFLA__"
                        alt="logo"
                        className="mb-[10px] w-16 h-16 rounded-full"
                      /> */}
                      <h1 className="text-text-primary font-medium">
                        {item?.name}
                      </h1>
                      <p className="text-gray-500 font-bold">{item?.shiori}</p>
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
            <div className="min-h-[300px] w-full lg:w-1/3 bg-card shadow-btn_shadow rounded-[24px] p-[18px] flex flex-col">
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
              <div className="w-full h-full flex justify-center items-center flex-col">
                <div className="w-full h-[200px]">
                  <img
                    className="w-full h-full object-contain"
                    src={newsempty}
                    alt=""
                  />
                </div>
                <h1 className="clam3 font-bold">News do not exist!</h1>
              </div>
              {/* <div className="flex flex-col w-full gap-[20px]">
              {[1, 2, 3].map((item, idx) => (
                <div
                  className="flex w-full justify-between items-center gap-1 border-l-[2px] border-hr-color pl-2"
                  key={idx}
                >
                  <div className="h-full flex flex-col justify-between">
                    <h1 className="w-[90%] clamp3 text-text-primary font-bold">
                      Presentation of the new department
                    </h1>
                    <p className="text-thin text-[14px]">Today | 5:00 PM</p>
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
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                        alt=""
                      />
                      <div className="inline-flex h-6 w-6 rounded-full ring-2 ring-white bg-blue-300 text-white text-sm text-center font-bold justify-center items-center">
                        <h1>2+</h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
            </div>
          </section>
          <section className="minh-[300px] flex gap-[30px] mt-[20px] max-lg:flex-col">
            <div className="flex-1 rounded-[24px]  pt-[18px] flex flex-col">
              <div className="w-full flex justify-between items-center mb-[20px]">
                <h1 className="text-text-primary clamp3 font-bold">Projects</h1>
                <div className="flex justify-center items-center">
                  <h1 className="text-primary cursor-pointer">View all</h1>
                  <img src={arrowright} alt="arrow right" />
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center flex-col">
                <div className="w-full h-[200px]">
                  <img
                    className="w-full h-full object-contain"
                    src={dataempty}
                    alt=""
                  />
                </div>
                <h1 className="clam3 font-bold">Projects do not exist!</h1>
              </div>
              {/* <div className="grid grid-cols-1 gap-[15px]">
              {[1, 2, 3].map((item, idx) => (
                <div
                  className="bg-card shadow-btn_shadow w-full h-full rounded-[24px] grid xl:grid-cols-11 md:grid-cols-5 grid-cols-1"
                  key={idx}
                >
                  <div className="max-md:col-span-1 col-span-5 p-[18px] flex flex-col gap-[24px]">
                    <div className="flex justify-start items-center gap-[18px]">
                      <img
                        className="w-[40px] h-[40px]"
                        src="https://s3-alpha-sig.figma.com/img/e699/08ec/4d1a06f005fea30771b61b3a4f903dd3?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hDp9zObNSJ2BfAdlkuLzg3man5qr~dTPNzqqOEBgQKt-Gf0LJYrAIOCbSbKTzk3A-9AVBGxQ4LA4KMGBYqlQqys~BNHwqOtsOi7sC1YCBs-h5yUnaLm0UfMntV2bRvWlSGN5WnsaHeQBXJdOWJGmIGTk0eamelE0XPrUh7isz7vo5kZykeVjj0uAGt8azfItg0A6jGT-tkr~I0ygXneGM3B8u8ik3tXhQeryDSmp7JJlI-VM-aZVeupxpIPERxAadw4gnAYiyKb2Dei0Hf2YETiHgetO1WoD9VeL17r2fEvbrOqzXLbnHq4hHBm8bKqglrLX8RUx0y32kNZalXYFLA__"
                        alt=""
                      />
                      <div>
                        <p className="text-thin-color clamp4">PN0001265</p>
                        <h1 className="text-text-primary clamp3 font-bold">
                          Medical App (iOS native)
                        </h1>
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex justify-start items-center gap-1 text-thin-color">
                        <FaCalendar />
                        <h1>Created Sep 10, 2020</h1>
                      </div>
                      <div className="flex justify-start items-center gap-1 text-green-400">
                        <FaArrowDown />
                        <h1>Medium</h1>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1  max-xl:col-span-5 flex justify-center items-center w-full">
                    <div className="h-[1px] w-full xl:h-full xl:w-[1px] bg-hr-color"></div>
                  </div>
                  <div className="max-md:col-span-1 col-span-5 p-[18px] flex flex-col gap-[24px]">
                    <div>
                      <h1 className="text-text-primary font-bold clamp3">
                        Project Data
                      </h1>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col justify-start gap-2">
                        <p className="text-thin-color clamp-4">All tasks</p>
                        <h1 className="text-text-primary font-bold clamp4">
                          50
                        </h1>
                      </div>
                      <div className="flex flex-col justify-start gap-2">
                        <p className="text-thin-color clamp-4">Active tasks</p>
                        <h1 className="text-text-primary font-bold clamp4">
                          50
                        </h1>
                      </div>
                      <div className="flex flex-col justify-start gap-2">
                        <p className="text-thin-color clamp-4">Assignees</p>
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
                  </div>
                </div>
              ))}
            </div> */}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Dashboard;
