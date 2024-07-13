import React, { useState } from "react";
import { LuFilter } from "react-icons/lu";
import Activity from "./activity";
import List from "./list";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import AddGroup from "./add-group";
const groupsNav = [
  { id: 1, title: "List" },
  { id: 2, title: "Activity" },
];

const Groups = () => {
  const [isAddGroup, setIsAddGroup] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const activeProfileDetails = (id) => {
    switch (id) {
      case 1:
        return <List />;
      case 2:
        return <Activity />;
      default:
        return;
    }
  };

  const handleOpenAddGroup = () => {
    setIsAddGroup(!isAddGroup);
  };
  return (
    <main className="col-span-3 max-lg:grid-cols-1 flex flex-col gap-2 md:px-[16px]">
      <section className="flex justify-between items-center max-md:grid grid-cols-4">
        <h1 className="col-span-4 text-text-primary font-bold clamp3">
          Groups (28)
        </h1>
        <div className="col-span-3 flex justify-start items-center">
          <div className=" bg-background-secondary p-1 rounded-[20px] shadow-btn_shadow">
            {groupsNav.map((item, idx) => (
              <button
                onClick={() => setActiveTab(item.id)}
                key={idx}
                className="px-8 py-1 relative cursor-pointer"
              >
                <h1
                  className={`${
                    activeTab == item.id
                      ? "text-active-card"
                      : "text-text-primary"
                  } relative z-20`}
                >
                  {item.title}
                </h1>
                {activeTab == item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary rounded-[20px] mx-auto z-10 px-[20px]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-1 flex justify-end items-center gap-3">
          <div className="p-[12px] rounded-[14px] bg-card cursor-pointer shadow-btn_shadow flex justify-center items-center">
            <button>
              <LuFilter className="text-xl text-text-primary" />
            </button>
            <button
              onClick={handleOpenAddGroup}
              className="md:hidden fixed bottom-[16px] right-[16px] bg-button-color  flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow"
            >
              <FaPlus />
            </button>
          </div>
          <button
            onClick={handleOpenAddGroup}
            className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] py-2 px-4 text-white shadow-btn_shadow"
          >
            <FaPlus />
            <h1>Add Project</h1>
          </button>
        </div>
      </section>
      <section>{activeProfileDetails(activeTab)}</section>
      <AddGroup isOpen={isAddGroup} handleClose={handleOpenAddGroup} />
    </main>
  );
};

export default Groups;
