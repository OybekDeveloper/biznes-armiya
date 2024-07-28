import React, { useEffect, useState } from "react";
import FilterMain from "./filter-main";
import Tasks from "./tasks";
import { FaPlus } from "react-icons/fa6";
import FilterTask from "./filter-tasks";
import { ApiService } from "../../components/api.server";
import AddTasks from "./add-task";
import Loader1 from "../../components/loader/loader1";
import { useSelector } from "react-redux";

const HomeWork = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Asked");
  const [addTask, setAddTask] = useState(false);
  const [loading, setLoading] = useState(true);
  const { permissionStatus } = useSelector((state) => state.event);
  console.log(permissionStatus);
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const handleAddTask = () => {
    setAddTask(!addTask);
  };

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  };

  useEffect(() => {
    const register = JSON.parse(localStorage.getItem("register"));
    const taskFetch = async () => {
      try {
        const tasks = await ApiService.getData("/tasks", register?.access);
        console.log(tasks);
        setTasks(tasks);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    taskFetch();
  }, [addTask]);
  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main className="flex flex-col md:px-[16px] gap-2">
          <section className="w-full flex justify-between items-center">
            <h1 className="font-bold text-text-primary clamp2">Assignments</h1>
            <div className="flex justify-start items-center gap-2">
              <button
                onClick={handleAddTask}
                className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] p-2 text-white shadow-btn_shadow"
              >
                <FaPlus />
                <h1>Add Tasks</h1>
              </button>
              <button
                onClick={handleAddTask}
                className="z-[800] md:hidden fixed bottom-[16px] right-[16px] bg-button-color  flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow"
              >
                <FaPlus />
              </button>
            </div>
          </section>
          <section className="grid max-md:grid-cols-1 max-xl:grid-cols-5 xl:grid-cols-4  max-lg:grid-cols-1 lg:gap-3">
            <div className="max-xl:col-span-2 col-span-1">
              <FilterMain handleFilterStatus={handleFilterStatus} />
            </div>
            <div className="max-md:col-span-1 col-span-3 max-lg:mt-2">
              <Tasks
                toggleFilter={toggleFilter}
                tasks={tasks}
                status={filterStatus}
              />
            </div>
          </section>
        </main>
      )}
      <FilterTask isOpen={isFilterOpen} handleClose={toggleFilter} />
      <AddTasks isOpen={addTask} handleClose={handleAddTask} />
    </>
  );
};

export default HomeWork;
