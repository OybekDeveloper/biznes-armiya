import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import { coinimg, photoUrl } from "../../images";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { FaPhoneAlt } from "react-icons/fa";
import { ApiService } from "../../components/api.server";

const ProfileInfo = ({ handleUpdateUser }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const { userData } = useSelector((state) => state.event);
  const register = JSON.parse(localStorage.getItem("register"));
  async function fetchData() {
    try {
      const res = await ApiService.getData("/tasks", register?.access);
      console.log(res);
      const filterTasks = res.filter((c) =>
        c.user.find((u) => +u.user === userData?.id)
      );
      const doneTasks = filterTasks.filter((c) => c.status === "Done");

      setTasksDone(doneTasks);
      setTasks(filterTasks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="bg-card rounded-[14px] w-full px-[24px] py-[18px] shadow-btn_shadow sticky top-[88px] ">
      <section className=" flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <img
            className="inline-block w-24 h-24 rounded-full ring-2 ring-white object-cover"
            src={
              userData?.profile_photo?.includes(".")
                ? userData.profile_photo
                : photoUrl
            }
            alt=""
          />
          <div
            onClick={handleUpdateUser}
            className="p-2 rounded-md bg-background-secondary"
          >
            <BiEdit className="text-[24px] cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-2">
          <h1 className="text-text-primary font-bold clamp3">
            {userData.first_name + " " + userData.last_name}
          </h1>
          <p className="text-thin-color clamp4">{userData?.email}</p>
          <div
            onClick={() => window.open(`tel:${userData?.phone}`)}
            className="bg-primary text-card p-2 rounded-md clamp4 cursor-pointer flex justify-start items-center gap-2"
          >
            <FaPhoneAlt />
            <h1>{userData?.phone_number}</h1>
          </div>
          <div className="py-1.5 flex justify-between items-center gap-3 ">
            <div className="cursor-pointer flex justify-between items-center gap-3">
              <strong>VAB:</strong>
              <div className="flex justify-start items-center gap-2">
                <h1>{userData?.vab ? userData?.vab : 0}</h1>
                <img src={coinimg} alt="" className="w-5 h-5 object-contain" />
              </div>
            </div>
          </div>
          <div className="py-1.5 flex justify-between items-center gap-3 ">
            <div className="cursor-pointer flex justify-between items-center gap-3">
              <strong>Reyting:</strong>
              <div className="flex justify-start items-center gap-2">
                <h1>{userData?.reyting ? userData.reyting : 0}</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-2">
            <strong>Level:</strong>
            <h1>{userData?.role?.role}</h1>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfileInfo;
