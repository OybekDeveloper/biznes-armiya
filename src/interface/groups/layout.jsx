import React, { useEffect, useState } from "react";
import { LuFilter } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";
import AddGroup from "./add-group";
import { ApiService } from "../../components/api.server";
import Loader1 from "../../components/loader/loader1";
import { arrowleft, dataempty, emptygrouplogo } from "../../images";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";

const Groups = () => {
  const { userData, groupEvent } = useSelector((state) => state.event);
  const register = JSON.parse(localStorage.getItem("register"));
  const [isAddGroup, setIsAddGroup] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleOpenAddGroup = () => {
    setIsAddGroup(!isAddGroup);
  };

  useEffect(() => {
    const groupFetch = async () => {
      try {
        const group = await ApiService.getData(`/group`, register?.access);
        setGroupData(group);
        console.log(group)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    groupFetch();
  }, [isAddGroup, isAddGroup, groupEvent]);

  return (
    <main className="col-span-3 max-lg:grid-cols-1 flex flex-col gap-2 md:px-[16px]">
      <section className="flex justify-between items-center">
        <div className="flex flex-col justify-start items-center gap-3">
          {/* back button */}
          <button
            className={"flex justify-start items-center gap-2 text-blue-600"}
            onClick={() => window.history.back()}
          >
            <FaArrowLeft className="text-[14px]" />
            <p className="text-[14px]">Back to back</p>
          </button>
          <h1 className="col-span-4 text-text-primary font-bold clamp3">
            Groups ({groupData.length > 0 ? groupData.length : 0})
          </h1>
        </div>
        <div className="col-span-1 flex justify-end items-center gap-3">
          <div className="p-[12px] rounded-[14px] bg-card cursor-pointer shadow-btn_shadow flex justify-center items-center">
            <button>
              <LuFilter className="text-xl text-text-primary" />
            </button>
          </div>
          {userData?.role?.chat_edit && (
            <>
              <button
                onClick={handleOpenAddGroup}
                className="md:hidden fixed bottom-[16px] right-[16px] bg-button-color  flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow"
              >
                <FaPlus />
              </button>
              <button
                onClick={handleOpenAddGroup}
                className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] py-2 px-4 text-white shadow-btn_shadow"
              >
                <FaPlus />
                <h1>Add group</h1>
              </button>
            </>
          )}
        </div>
      </section>
      {loading ? (
        <Loader1 />
      ) : (
        <section className="min-h-[300px] lg:flex-1 bg-card shadow-btn_shadow rounded-[24px] p-[18px] flex flex-col">
          {groupData.length > 0 ? (
            <div className="grid xl:grid-cols-4 lg:grid-cols-2 max-sm:grid-cols-1 sm:grid-cols-2 flex-1 gap-2">
              {groupData
                .slice()
                .reverse()
                .map((item, idx) => (
                  <NavLink
                    to={`/groups/${item.id}`}
                    className="w-full bg-background rounded-[24px] p-[16px] flex flex-col justify-start items-center gap-1"
                    key={idx}
                  >
                    <div className="w-24 h-24 flex justify-center items-center">
                      <img
                        src={
                          item?.group_photo ? item?.group_photo : emptygrouplogo
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
                      {item?.admin?item.admin:"no admin"}
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

      <AddGroup isOpen={isAddGroup} handleClose={handleOpenAddGroup} />
    </main>
  );
};

export default Groups;
