import React, { useEffect, useState } from "react";
import GroupInfo from "./group-info";
import { NavLink, useParams } from "react-router-dom";
import { ApiService } from "../../components/api.server";
import { emptyGroup, photoUrl } from "../../images";
import { FaPlus } from "react-icons/fa";
import Loader1 from "../../components/loader/loader1";
import { useSelector } from "react-redux";

const GroupItem = () => {
  const { id } = useParams();
  const register = JSON.parse(localStorage.getItem("register"));
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState();
  const [users, setUsers] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const { permissionStatus } = useSelector((state) => state.event);

  const handleGenerateCode = () => {
    setIsGenerate(!isGenerate);
  };

  const handleEditGroup = () => {
    setEditGroup(!editGroup);
  };

  const handleDelete = () => {
    setIsDelete(!isDelete);
  };

  const handleAddUser = () => {
    setAddUser(!addUser);
  };

  useEffect(() => {
    const groupFetch = async () => {
      try {
        const group = await ApiService.getData(
          `/group/${id}`,
          register?.access
        );
        const newUsers = await Promise.all(
          group?.users?.map(async (item) => {
            try {
              return await ApiService.getData(
                `/users/${item}`,
                register?.access
              );
            } catch (error) {
              console.log(error);
            }
          })
        );
        setUsers(newUsers.filter((user) => user)); // filter out undefined values
        setGroup(group);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    groupFetch();
  }, [id, editGroup, isGenerate]);
  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main className="grid xl:grid-cols-4 lg:grid-cols-5 grid-cols-1 gap-4 md:px-[16px]">
          <section className="xl:col-span-1 lg:col-span-2 col-span-1 ">
            <GroupInfo
              group={group}
              handleEditGroup={handleEditGroup}
              handleDelete={handleDelete}
              isDelete={isDelete}
              editGroup={editGroup}
              isGenerate={isGenerate}
              handleGenerateCode={handleGenerateCode}
              addUser={addUser}
              handleAddUser={handleAddUser}
            />
          </section>
          <section className="lg:col-span-3 col-span-1 rounded-[14px] flex flex-col gap-3">
            <div>
              <h1 className="font-bold clamp3">Users</h1>
              <button></button>
            </div>
            {!users.length > 0 ? (
              <div className="flex flex-col justify-center items-center w-full h-full mt-10 gap-4">
                <img src={emptyGroup} alt="" />
                <h1 className="font-bold clamp4">
                  There are no tasks in this group yet Let's add them
                </h1>
                {permissionStatus?.chat_edit && (
                  <button
                    onClick={handleAddUser}
                    className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] py-2 px-4 text-white shadow-btn_shadow"
                  >
                    <FaPlus />
                    <h1>Add people</h1>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {users?.map((item, i) => (
                  <div
                    className="w-full h-full bg-card rounded-[24px] p-[16px] flex flex-col justify-start items-center gap-1"
                    key={i}
                  >
                    <div className="flex flex-col gap-1 bg-background-secondary rounded-xl w-full py-2 justify-center items-center">
                      <img
                        src={
                          item?.profile_photo ? item?.profile_photo : photoUrl
                        }
                        alt="logo"
                        className="mb-[10px] w-16 h-16 rounded-full"
                      />
                      <h1 className="text-text-primary font-medium">
                        {item?.first_name ? item.first_name : "Name"}
                      </h1>
                      <p className="text-gray-500 font-bold">
                        {item.last_name ? item.last_name : "Familya"}
                      </p>
                      <p className="text-gray-500 py-1 px-2 border-border border-[1px] rounded-[4px] text-[12px]">
                        {item.role}
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-1 flex-col">
                      <h1 className="font-bold clamp3">
                        {item?.reyting ? item.reyting : 0}
                      </h1>
                      <p>Reyting</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default GroupItem;
