import React, { useState } from "react";
import { Helmet } from "react-helmet";
import FilterMain from "./filter-main";
import Tasks from "./tasks";
import { FaPlus } from "react-icons/fa6";
import FilterTask from "./filter-tasks";
const HomeWork = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleDoubleClick = (event) => {
    event.preventDefault();
    // Hodisani bekor qiling
    event.stopPropagation();
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Vazifalar | Biznes Armiya</title>
        <link rel="icon" href="/" />
      </Helmet>
      <main className="flex flex-col md:px-[16px] gap-2">
        <section className="w-full flex justify-between items-center">
          <h1 className="font-bold text-text-primary clamp2">Assignments</h1>
          <div className="flex justify-start items-center gap-2">
            <button
              onDoubleClick={handleDoubleClick}
              className="bg-button-color  flex justify-start items-center gap-2 rounded-[14px] p-2 text-white shadow-btn_shadow"
            >
              <FaPlus />
              <h1>Add Project</h1>
            </button>
          </div>
        </section>
        <section className="grid max-md:grid-cols-1 max-xl:grid-cols-5 xl:grid-cols-4  max-lg:grid-cols-1 lg:gap-3">
          <div className="max-xl:col-span-2 col-span-1">
            <FilterMain />
          </div>
          <div className="max-md:col-span-1 col-span-3 max-lg:mt-2">
            <Tasks toggleFilter={toggleFilter} />
          </div>
        </section>
      </main>
      <FilterTask isOpen={isFilterOpen} handleClose={toggleFilter} />
    </>
  );
};

export default HomeWork;
