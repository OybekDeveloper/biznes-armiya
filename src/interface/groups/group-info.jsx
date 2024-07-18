import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import { ApiService } from "../../components/api.server";
import { useParams } from "react-router-dom";
import { emptygrouplogo } from "../../images";
import { FaRegTrashAlt } from "react-icons/fa";
import ExitModal from "./delete-group";
import toast from "react-hot-toast";

const GroupInfo = ({ group }) => {
  const [isDelete, setIsDelete] = useState(false);
  const handleDelete = () => {
    setIsDelete(!isDelete);
  };
  return (
    <main className="bg-card rounded-[14px] w-full px-[24px] py-[18px] shadow-btn_shadow sticky top-[88px]">
      <section className=" flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="w-24 h-24 flex justify-center items-center">
            <img
              src={group?.group_photo ? group.group_photo : emptygrouplogo}
              alt="logo"
              className="mb-[10px] w-16 h-16 rounded-full"
            />
          </div>
          <div className="flex justify-end items-center gap-3">
            <button className="p-2 rounded-md bg-background-secondary">
              <BiEdit className="text-[24px] cursor-pointer" />
            </button>
            <button onClick={handleDelete} className="p-2 rounded-md bg-background-secondary">
              <FaRegTrashAlt className="text-red-500 text-[24px] cursor-pointer" />
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-text-primary font-bold clamp3">{group?.name}</h1>
          <p className="text-thin-color clamp4">{group?.shiori}</p>
        </div>
      </section>
      <section>Main info</section>
      <ExitModal isOpen={isDelete} handleClose={handleDelete} group={group}/>
    </main>
  );
};

export default GroupInfo;
