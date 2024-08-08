import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddNews from "./add-news";
import { ApiService } from "../../components/api.server";
import { NavLink } from "react-router-dom";
import Loader1 from "../../components/loader/loader1";
import { dataempty } from "../../images";
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

const News = () => {
  const { userData, eventSliceBool } = useSelector((state) => state.event);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delModal, setDelModal] = useState(false);
  const [selectId, setSelectId] = useState(null);
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
    const fetchNews = async () => {
      try {
        const res = await ApiService.getData("/yangiliklar", register?.access);
        setNewsList(res);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [isModalOpen, delModal, eventSliceBool]);
  console.log(userData);
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
                  <div
                    key={item?.id}
                    className="hover:bg-hover-card relative bg-card rounded-md shadow-btn_shadow flex justify-between items-start p-1 gap-2 "
                  >
                    <NavLink
                      to={`/news/${item?.id}`}
                      className="p-4 mb-2 cursor-pointer w-full h-full rounded-md whitespace-normal break-words"
                    >
                      {item?.title}
                    </NavLink>
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
