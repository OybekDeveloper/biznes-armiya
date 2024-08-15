import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ApiService } from "../../components/api.server";
import Loader1 from "../../components/loader/loader1";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { photoUrl } from "../../images";
import "./index.css";

const NewsItem = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const { id } = useParams();
  const { userData } = useSelector((state) => state.event);
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [usersModal, setUsersModal] = useState(false);

  const navigate = useNavigate();

  const handleOpenUsersModal = () => {
    setUsersModal(!usersModal);
  };

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
            console.error(`Error fetching data for user ${user}:`, error);
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

    const fetchNews = async () => {
      try {
        const res = await ApiService.getData(
          `/yangiliklar/${id}`,
          register?.access
        );

        const newUserInfo = await fetchUsers(res?.user_id);

        if (res.user_id.length > 0 && userData.id) {
          if (!res.user_id.includes(userData.id)) {
            await ApiService.patchData(
              `/yangiliklar/${id}`,
              {
                user_id: [...res?.user_id, userData?.id],
              },
              register?.access
            );
          }
        }

        setNews({ ...res, users: newUserInfo });
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id, register?.access, userData, isLiked]);

  const handleLikeNews = async () => {
    try {
      const res = await ApiService.getData(
        `/yangiliklar/${id}`,
        register?.access
      );
      await ApiService.patchData(
        `/yangiliklar/${id}`,
        {
          like: isLiked ? res.like - 1 : res.like + 1,
        },
        register?.access
      );
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };
  

  
  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <>
          <div className="flex justify-between items-center gap-3">
            <button
              className="py-2 flex justify-start items-center gap-2 text-blue-600"
              onClick={() => navigate("/news")}
            >
              <FaArrowLeft className="text-[14px]" />
              <p className="text-[14px]">Back to News</p>
            </button>
          </div>
          <div className="overflow-hidden w-full p-4 bg-card rounded-md cursor-pointer shadow-btn_shadow">
            <div className="flex justify-between items-center">
              <h1 className="clamp3 font-bold text-thin-color">
                {news?.title}
              </h1>
              <div className="p-2 rounded-md cursor-pointer">
                <label className="container1">
                  <input
                    type="checkbox"
                    checked={isLiked}
                    onChange={handleLikeNews}
                  />
                  <svg
                    className="svg-like"
                    id="Glyph"
                    version="1.1"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M29.845,17.099l-2.489,8.725C26.989,27.105,25.804,28,24.473,28H11c-0.553,0-1-0.448-1-1V13  c0-0.215,0.069-0.425,0.198-0.597l5.392-7.24C16.188,4.414,17.05,4,17.974,4C19.643,4,21,5.357,21,7.026V12h5.002  c1.265,0,2.427,0.579,3.188,1.589C29.954,14.601,30.192,15.88,29.845,17.099z"
                      id="XMLID_254_"
                    ></path>
                    <path
                      d="M7,12H3c-0.553,0-1,0.448-1,1v14c0,0.552,0.447,1,1,1h4c0.553,0,1-0.448,1-1V13C8,12.448,7.553,12,7,12z   M5,25.5c-0.828,0-1.5-0.672-1.5-1.5c0-0.828,0.672-1.5,1.5-1.5c0.828,0,1.5,0.672,1.5,1.5C6.5,24.828,5.828,25.5,5,25.5z"
                      id="XMLID_256_"
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
            <div className="w-full h-full overflow-auto border-l-[6px] border-hr-color pl-3">
              <div dangerouslySetInnerHTML={{ __html: news?.content }}></div>
            </div>
            <div className="w-full border-r-[6px] border-hr-color pr-3 flex flex-col justify-end items-end mt-3">
              <h1>{news?.published_date} : Published date</h1>
              <div className="flex">
                <div onClick={handleOpenUsersModal}>
                  {news?.users?.slice(0, 3)?.map((user, idx) => (
                    <img
                      key={idx}
                      className="inline-flex object-cover h-6 w-6 rounded-full ring-2 ring-white"
                      src={user?.profile_photo ? user?.profile_photo : photoUrl}
                      alt=""
                    />
                  ))}
                  {news?.users?.length > 3 && (
                    <div className="inline-flex h-6 w-6 rounded-full ring-2 ring-white bg-blue-300 text-white text-sm text-center font-bold justify-center items-center">
                      <h1 className="text-[12px]">
                        +{news?.users?.length - 3}
                      </h1>
                    </div>
                  )}
                </div>
                <h1> : Those who saw</h1>
              </div>
              <div className="flex justify-end items-center gap-1">
                <h1 className="flex justify-center items-center gap-1">
                  {news?.like} <AiOutlineLike className="text-xl" />
                </h1>
                <h1>:likes</h1>
              </div>
            </div>
          </div>
        </>
      )}
      <AllUsersModal
        isOpen={usersModal}
        handleClose={handleOpenUsersModal}
        users={news?.users}
      />
    </>
  );
};

const AllUsersModal = ({ isOpen, handleClose, users }) => {
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
                  <div className="flex items-end justify-between cursor-pointer">
                    <h1 className="font-[600] clamp3">All users</h1>
                    <div className="p-[10px] bg-background-secondary rounded-[12px]">
                      <IoClose
                        onClick={handleClose}
                        className="text-text-primary text-[24px]"
                      />
                    </div>
                  </div>
                </DialogTitle>
                <div className="mt-3 flex flex-col gap-3">
                  {users?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-start gap-2"
                    >
                      <img
                        key={idx}
                        className="border border-thin-color inline-flex w-14 h-14 rounded-full ring-2 object-cover ring-white"
                        src={
                          item?.profile_photo ? item?.profile_photo : photoUrl
                        }
                        alt=""
                      />
                      <div>
                        <h1 className="clamp4 font-[500]">
                          {" "}
                          {item.first_name + " " + item.last_name}
                        </h1>
                        <h1 className="clamp4 text-[12px] text-thin-color font-[500]">
                          {" "}
                          {item?.email}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewsItem;
