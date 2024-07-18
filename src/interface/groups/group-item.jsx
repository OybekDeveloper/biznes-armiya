import React, { useEffect, useState } from "react";
import GroupInfo from "./group-info";
import { NavLink, useParams } from "react-router-dom";
import { ApiService } from "../../components/api.server";
import { emptyGroup } from "../../images";
import { FaPlus } from "react-icons/fa";
import Loader1 from "../../components/loader/loader1";

const GroupItem = () => {
  const { id } = useParams();
  const register = JSON.parse(localStorage.getItem("register"));
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState();

  useEffect(() => {
    const groupFetch = async () => {
      try {
        const group = await ApiService.getData(
          `/group/${id}`,
          register?.access
        );
        console.log(group);
        setGroup(group);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    groupFetch();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <Loader1 />
        </div>
      ) : (
        <main className="grid xl:grid-cols-4 lg:grid-cols-5 grid-cols-1 gap-4 md:px-[16px]">
          <section className="xl:col-span-1 lg:col-span-2 col-span-1 ">
            <GroupInfo group={group} />
          </section>
          <section className="lg:col-span-3 col-span-1 rounded-[14px] flex flex-col gap-3">
            {!group?.users.length > 0 ? (
              <div className="flex flex-col justify-center items-center w-full h-full mt-10 gap-4">
                <img src={emptyGroup} alt="" />
                <h1 className="font-bold clamp4">
                  There are no tasks in this group yet Let's add them
                </h1>
                <button className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] py-2 px-4 text-white shadow-btn_shadow">
                  <FaPlus />
                  <h1>Add people</h1>
                </button>
              </div>
            ) : (
              group?.users?.map((task, i) => (
                <NavLink
                  to={`/project/${i}`}
                  key={i}
                  className="cursor-pointer hover:bg-hover-card bg-card shadow-btn_shadow rounded-[14px] w-full grid grid-cols-5 max-lg:grid-cols-3 max-xl:grid-cols-4 px-[24px] py-[16px] gap-3"
                >
                  <div className="col-span-1">
                    <p className="text-thin-color clamp4">Task name</p>
                    <h1 className="text-text-primary font-bold">Sick Leave</h1>
                  </div>
                  <div className="col-span-1">
                    <p className="text-thin-color clamp4">Estimate</p>
                    <h1 className="text-text-primary font-[500]">1d 2h </h1>
                  </div>
                  <div className="col-span-1">
                    <p className="text-thin-color clamp4">Deadline</p>
                    <h1 className="text-text-primary font-[500]">
                      Sep 13, 2020
                    </h1>
                  </div>
                  <div className="col-span-1">
                    <p className="text-thin-color clamp4">Deadline</p>
                    <h1 className="text-text-primary font-[500]">
                      Sep 13, 2020
                    </h1>
                  </div>
                  <div className="col-span-1 flex justify-start items-center ">
                    <div className="text-[12px] px-2 py-1 rounded-[14px] bg-yellow-500 text-white">
                      Bajarilmoqda
                    </div>
                  </div>
                </NavLink>
              ))
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default GroupItem;
