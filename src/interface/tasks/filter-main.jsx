import { t } from "i18next";
import React, { useState } from "react";

const filterData = [
  {
    id: 1,
    title: t("status_asked"),
    status: "Asked",
  },
  {
    id: 2,
    title: t("status_expected"),
    status: "Expected",
  },
  {
    id: 3,
    title: t("status_finished"),
    status: "Finished",
  },
];

const FilterMain = ({ handleFilterStatus }) => {
  const [activeTab, setActiveTab] = useState(1);
  const handleActiveTab = (active) => {
    setActiveTab(active.id);
    handleFilterStatus(active.status);
  };
  return (
    <main className="sticky top-[88px] bg-card shadow-btn_shadow rounded-[14px] flex flex-col gap-3">
      <section className="w-full p-[8px] flex flex-col gap-[16px]">
        {filterData?.map((item, idx) => (
          <button
            onClick={() => handleActiveTab(item)}
            key={idx}
            className="flex justify-between items-center gap-2 cursor-pointer"
          >
            <div
              className={`
          ${
            item.id === activeTab
              ? "bg-active-card text-primary"
              : "hover:bg-hover-card text-thin-color"
          } 
          flex justify-start items-start flex-col px-[16px] py-[8px] rounded-[14px] w-full`}
            >
              <h1 className="font-bold clamp3 text-text-primary">
                {item.title}
              </h1>
            </div>
            {item.id === activeTab && (
              <div className="w-[4px] bg-primary rounded-[2px] h-[45px]"></div>
            )}
          </button>
        ))}
      </section>
    </main>
  );
};

export default FilterMain;
