import React from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import { coinimg, photoUrl } from "../../images";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const ProfileInfo = () => {
  const { userData } = useSelector((state) => state.event);
  console.log(userData);
  return (
    <main className="bg-card rounded-[14px] w-full px-[24px] py-[18px] shadow-btn_shadow">
      <section className=" flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <img
            className="inline-block w-24 h-24 rounded-full ring-2 ring-white"
            src={
              userData?.profile_photo?.includes(".")
                ? userData.profile_photo
                : photoUrl
            }
            alt=""
          />
          <div className="p-2 rounded-md bg-background-secondary">
            <BiEdit className="text-[24px] cursor-pointer" />
          </div>
        </div>
        <div>
          <h1 className="text-text-primary font-bold clamp3">
            {userData.first_name + " " + userData.last_name}
          </h1>
          <p className="text-thin-color clamp4">{userData?.email}</p>
          <p
            onClick={() => window.open(`tel:${userData?.phone}`)}
            className="text-primary clamp4 cursor-pointer underline decoration-solid"
          >
            {userData?.phone_number}
          </p>
          <div className="py-1.5 flex justify-between items-start">
            <div className="w-32 cursor-pointer flex justify-between items-center gap-3 py-3 px-3 border-border border-[2px] rounded-[14px]">
              <h1>{userData?.vab ? userData?.vab : 0}</h1>
              <img src={coinimg} alt="" />
            </div>
            <div className="cursor-pointer w-12 h-12 relative flex justify-center items-center">
              <h1 className="absolute clamp4 ">
                {userData?.reyting ? userData?.reyting : 0}
              </h1>
              <CircularProgressbar
                maxValue={10}
                value={userData?.reyting ? userData?.reyting : 0}
                styles={buildStyles({
                  textColor: "#3F8CFF",
                  pathColor: "#3F8CFF",
                  trailColor: "rgba(0, 0, 0, 0.1)", // Ensure a valid color is provided
                })}
              />
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
