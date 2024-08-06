import React, { useEffect, useState } from "react";
import GroupInfo from "./group-info";
import { ApiService } from "../../components/api.server";
import { emptyGroup, photoUrl } from "../../images";
import { FaArrowLeft, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import Loader1 from "../../components/loader/loader1";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteUser from "./delete-user";
import { groupEventSlice } from "../../reducer/event";

const GroupItem = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const register = JSON.parse(localStorage.getItem("register"));
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState({});
  const [users, setUsers] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [delUser, setDelUser] = useState(false);
  const [delUserId, setDelUserId] = useState();
  const { userData } = useSelector((state) => state.event);

  const handleGenerateCode = () => setIsGenerate(!isGenerate);

  const handleEditGroup = () => setEditGroup(!editGroup);

  const handleDelete = () => setIsDelete(!isDelete);

  const handleAddUser = () => setAddUser(!addUser);

  const handleDeleteUser = (id) => {
    setDelUser(!delUser);
    setDelUserId(id);
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
        setUsers(newUsers.filter((user) => user));
        setGroup(group);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    groupFetch();
    dispatch(groupEventSlice());
  }, [id, editGroup, isGenerate, addUser, delUser]);

  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main className="grid xl:grid-cols-4 lg:grid-cols-5 grid-cols-1 gap-4 md:px-[16px]">
          <section className="xl:col-span-1 lg:col-span-2 col-span-1">
            <button
              className="py-2 flex justify-start items-center gap-2 text-blue-600"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft className="text-[14px]" />
              <p className="text-[14px]">Back to Group</p>
            </button>
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
              groupId={id}
            />
          </section>
          <section className="lg:col-span-3 col-span-1 rounded-[14px] flex flex-col gap-3">
            <div>
              <h1 className="font-bold clamp3">Users</h1>
              <button></button>
            </div>
            {users.length === 0 ? (
              <div className="flex flex-col justify-center items-center w-full h-full mt-10 gap-4">
                <img src={emptyGroup} alt="No tasks" />
                <h1 className="font-bold clamp4">
                  There are no tasks in this group yet. Let's add them.
                </h1>
                {userData?.role?.chat_edit && (
                  <button
                    onClick={handleAddUser}
                    className="max-md:hidden bg-button-color flex justify-start items-center gap-2 rounded-[14px] py-2 px-4 text-white shadow-btn_shadow"
                  >
                    <FaPlus />
                    <h1>Add people</h1>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid max-sm:grid-cols-1 grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {users.map((item, i) => (
                  <div
                    className="relative w-full h-full bg-card rounded-[24px] p-[16px] flex flex-col justify-start items-center gap-1"
                    key={i}
                  >
                    <div className="relative flex flex-col gap-1 bg-background-secondary rounded-xl w-full py-2 justify-center items-center">
                      <img
                        src={item?.profile_photo || photoUrl}
                        alt="User profile"
                        className="mb-[10px] w-16 h-16 rounded-full"
                      />
                      <h1 className="text-text-primary font-medium">
                        {item?.first_name || "Name"}
                      </h1>
                      <p className="text-gray-500 font-bold">
                        {item.last_name || "Familya"}
                      </p>
                      <p className="text-gray-500 py-1 px-2 border-border border-[1px] rounded-[4px] text-[12px]">
                        {item.role}
                      </p>
                      <button
                        onClick={() => handleDeleteUser(item?.id)}
                        className="absolute right-0 top-0 p-2 rounded-md hover:bg-background mr-1 mt-1 bg-background-secondary"
                      >
                        <FaRegTrashAlt className="text-red-500 text-[14px] cursor-pointer" />
                      </button>
                    </div>
                    <div className="flex justify-center items-center gap-1 flex-col">
                      <h1 className="font-bold clamp3">{item?.reyting || 0}</h1>
                      <p>Reyting</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <DeleteUser
              group={group}
              delId={delUserId}
              isOpen={delUser}
              handleClose={handleDeleteUser}
            />
          </section>
        </main>
      )}
    </>
  );
};

export default GroupItem;
