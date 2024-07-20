import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import { ApiService } from "../../components/api.server";
import { useParams } from "react-router-dom";
import { emptygrouplogo } from "../../images";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import ExitModal from "./delete-group";
import toast from "react-hot-toast";
import EditGroup from "./edit-group";
import { TbCircleKeyFilled } from "react-icons/tb";
import GenerateCode from "./generate-code";
import { MdOutlineContentCopy } from "react-icons/md";
import AddUser from "./add-user";

const GroupInfo = ({
  group,
  handleEditGroup,
  handleDelete,
  isDelete,
  editGroup,
  isGenerate,
  handleGenerateCode,
}) => {
  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(group?.generate_code)
      .then(() => {
        toast.success("Code copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy code: ", error);
        toast.error("Failed to copy code");
      });
  };
  return (
    <main className="bg-card rounded-[14px] w-full px-[24px] py-[18px] shadow-btn_shadow sticky top-[88px]">
      <section className=" flex flex-col gap-3">
        <div className="flex flex-col justify-between items-start gap-2">
          <div className="relative w-full h-[300px] flex justify-center items-center p-1">
            <img
              src={group?.group_photo ? group.group_photo : emptygrouplogo}
              alt="logo"
              className="mb-[10px] w-full h-full rounded-xl border-border border object-cover"
            />
          </div>
          <div className="flex justify-between items-center w-full gap-3">
            <div className="flex gap-2">
              <button
                // onClick={handleEditGroup}
                className="p-2 rounded-md bg-background-secondary flex justify-start items-center gap-2 text-primary"
              >
                <FaPlus className="text-[18px] cursor-pointer" />
                Add User
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEditGroup}
                className="p-2 rounded-md bg-background-secondary"
              >
                <BiEdit className="text-[24px] cursor-pointer" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-md bg-background-secondary"
              >
                <FaRegTrashAlt className="text-red-500 text-[24px] cursor-pointer" />
              </button>
            </div>
          </div>
          <div>
            {group?.generate_code ? (
              <button
                className="w-full cursor-pointer flex justify-between items-center p-4 bg-background-secondary rounded-xl mt-2"
                onClick={handleCopyCode}
              >
                {group?.generate_code}
                <MdOutlineContentCopy className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleGenerateCode}
                className="p-2 rounded-md bg-background-secondary flex justify-start items-center gap-2 text-primary"
              >
                <TbCircleKeyFilled className="text-[24px] cursor-pointer" />
                Generate code
              </button>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-text-primary font-bold clamp3">{group?.name}</h1>
          <p className="text-thin-color clamp4">{group?.shiori}</p>
        </div>
      </section>
      <section>Main info</section>
      <ExitModal isOpen={isDelete} handleClose={handleDelete} group={group} />
      <EditGroup
        isOpen={editGroup}
        handleClose={handleEditGroup}
        group={group}
      />
      <GenerateCode
        isOpen={isGenerate}
        handleClose={handleGenerateCode}
        group={group}
      />
      {/* <AddUser
        isOpen={is}
        handleClose={handleGenerateCode}
        group={group}
      /> */}
    </main>
  );
};

export default GroupInfo;
