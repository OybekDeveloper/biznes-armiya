import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddNews from "./add-news";
import { ApiService } from "../../components/api.server";
import { NavLink, useNavigate } from "react-router-dom";
import Loader1 from "../../components/loader/loader1";
import { dataempty, photoUrl } from "../../images";
import { useSelector } from "react-redux";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { CiMenuKebab } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import DeleteModal from "./delete-news";
import { AiOutlineLike } from "react-icons/ai";
import { FaCalendar } from "react-icons/fa";

const News = () => {
  const { userData, eventSliceBool } = useSelector((state) => state.event);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delModal, setDelModal] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const navigate = useNavigate();

  const handleDeleteModal = () => {
    setDelModal(!delModal);
  };
  const handleDelete = () => {
    setDelModal(!delModal);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const register = JSON.parse(localStorage.getItem("register"));

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

    const fetchNews = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [isModalOpen, delModal, eventSliceBool]);
  console.log(newsList);
  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main className="max-w-11/12 mx-auto flex flex-col gap-2 px-[16px]">
          <section className="flex justify-between items-center">
            <h1 className="text-text-primary font-bold clamp3">News</h1>
            {userData?.role?.yang_edit && (
              <>
                <button
                  onClick={() => {
                    toggleModal();
                    setSelectId();
                  }}
                  className="max-md:hidden bg-button-color flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow"
                >
                  <FaPlus />
                  <h1>Add News</h1>
                </button>
                <button
                  onClick={() => {
                    toggleModal();
                    setSelectId();
                  }}
                  className="md:hidden fixed bottom-[16px] right-[16px] bg-button-color flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow"
                >
                  <FaPlus />
                </button>
              </>
            )}
          </section>
          {newsList.length > 0 ? (
            <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {newsList
                .slice()
                .reverse()
                .map((item) => (
                  <div key={item?.id} className="">
                    <div className="relative bg-card rounded-md shadow-btn_shadow flex justify-between items-start p-1 gap-2 ">
                      <div className="px-4 py-2 mb-2 cursor-pointer w-full h-full rounded-md whitespace-normal break-words">
                        <h1 className="font-[500]">{item.title}</h1>
                        <div className="flex justify-between w-full items-end gap-3 mt-4">
                          <div className="flex flex-col ">
                            {/* <div>
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
                            </div> */}
                            <div className="flex justify-start items-center gap-2">
                              <div className="flex gap-1 items-center justify-start">
                                <h1>19-07-2024 14:02</h1>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => navigate(`/news/${item?.id}`)}
                              className="text-[12px] px-2 py-1 rounded-md bg-green-500 hover:bg-green-400 transition-all duration-300 font-[500] text-white"
                            >
                              Read more
                            </button>
                          </div>
                        </div>
                      </div>
                      {userData?.role?.yang_edit &&
                        userData?.role?.yang_delete && (
                          <div
                            onClick={() => setSelectId(item)}
                            className="absolute right-1 top-1"
                          >
                            <Menu>
                              <MenuButton className="inline-flex items-center gap-2 bg-background-secondary p-1 rounded-md z-10">
                                <CiMenuKebab className="text-text-primary" />
                              </MenuButton>
                              <Transition
                                enter="transition ease-out duration-75"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                              >
                                <MenuItems
                                  anchor="bottom end"
                                  className="w-52 origin-top-right rounded-xl bg-card mt-[5px] z-[999] shadow-btn_shadow outline-none"
                                >
                                  {userData?.role?.yang_delete && (
                                    <MenuItem onClick={handleDelete}>
                                      <button className="group text-red-400 flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                        <FaRegTrashAlt className="size-4 fill-thin " />
                                        Delete
                                        <kbd className="ml-auto hidden font-sans text-xs text-thin group-data-[focus]:inline">
                                          ⌘D
                                        </kbd>
                                      </button>
                                    </MenuItem>
                                  )}
                                  {userData?.role?.yang_edit && (
                                    <MenuItem onClick={toggleModal}>
                                      <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                        <MdModeEdit className="size-4 fill-thin" />
                                        Edit
                                        <kbd className="ml-auto hidden font-sans text-xs text-thin group-data-[focus]:inline">
                                          ⌘E
                                        </kbd>
                                      </button>
                                    </MenuItem>
                                  )}
                                </MenuItems>
                              </Transition>
                            </Menu>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
            </section>
          ) : (
            <div className="w-full h-full flex justify-center items-center flex-col">
              <div className="w-full h-[200px]">
                <img
                  className="w-full h-full object-contain"
                  src={dataempty}
                  alt="No data available"
                />
              </div>
              <h1 className="clam3 font-bold">Auktsion do not exist!</h1>
            </div>
          )}
          <AddNews
            updateItem={selectId}
            isOpen={isModalOpen}
            handleClose={toggleModal}
          />
          <DeleteModal
            id={selectId?.id}
            isOpen={delModal}
            handleClose={handleDeleteModal}
          />
        </main>
      )}
    </>
  );
};

export default News;
