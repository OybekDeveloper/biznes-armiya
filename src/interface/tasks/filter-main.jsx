import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

const filterData = [
  {
    id: 1,
    title: "Tugatilganlar",
  },
  {
    id: 2,
    title: "Bajarilayotganlar",
  },
  {
    id: 3,
    title: "Yuklamalar",
  },
  {
    id: 4,
    title: "Status of yuklama",
  },
];

const FilterMain = () => {
  return (
    <main className="sticky top-[88px] bg-card shadow-btn_shadow rounded-[14px] flex flex-col gap-3">
      <button className="w-full px-[24px] py-[16px] text-text-primary flex justify-between gap-5 items-center clamp4">
        <h1 className="text-[14px] font-bold">Current Projects</h1>
        <FaAngleDown className="text-[18px]" />
      </button>
      <div className="w-full h-[1px] bg-[#E4E6E8]" />
      <section className="w-full p-[8px] flex flex-col gap-[16px]">
        {filterData.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center gap-2 cursor-pointer">
            <div
              className={`
          ${
            item.id === 1
              ? "bg-active-card text-primary"
              : "hover:bg-hover-card text-thin-color"
          } 
          flex justify-start items-start flex-col px-[16px] rounded-[14px] w-full`}
            >
              <p className="text-thin-color clamp4">PN0001245</p>
              <h1 className="font-bold clamp3 text-text-primary">{item.title}</h1>
              <NavLink
                to={"/nearest"}
                className="flex justify-center items-center"
              >
                <h1 className="text-primary cursor-pointer">View all</h1>
                <MdOutlineKeyboardArrowRight className="text-primary" />
              </NavLink>
            </div>
            {item.id === 1 && (
              <div className="w-[4px] bg-primary rounded-[2px] h-[60px] "></div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
};

export default FilterMain;
