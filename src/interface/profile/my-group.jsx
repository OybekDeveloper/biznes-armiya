import React, { useEffect, useState } from "react";
import { ApiService } from "../../components/api.server";
import { dataempty, emptygrouplogo } from "../../images";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const MyGroup = () => {
const register = JSON.parse(localStorage.getItem("register"));
const {userData}=useSelector(state=>state.event)
const [groups,setGroups]=useState([])
  async function getGroup(){
    try {
      const res =await ApiService.getData("/group",register?.access)
      console.log(res)
      setGroups(res)
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  useEffect(()=>{
    getGroup()
  },[])
  return (
    <div className="">
      {groups.length > 0 ? (
                  <div className="grid xl:grid-cols-4 lg:grid-cols-2 max-sm:grid-cols-1 sm:grid-cols-2 flex-1 gap-2">
                    {groups
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
                          } w-full bg-card rounded-[24px] p-[16px] flex flex-col justify-start items-center gap-1`}
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
  );
};

export default MyGroup;
