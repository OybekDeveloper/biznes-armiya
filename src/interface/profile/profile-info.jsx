import React from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
  const { userData } = useSelector((state) => state.event);
  return (
    <main className="bg-card rounded-[14px] w-full px-[24px] py-[18px] shadow-btn_shadow sticky top-[88px]">
      <section className=" flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <img
            className="inline-block w-24 h-24 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
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
          <p className="text-thin-color clamp4">Web Developer</p>
        </div>
      </section>
      <section>Main info</section>
    </main>
  );
};

export default ProfileInfo;
