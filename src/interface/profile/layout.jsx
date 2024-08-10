import React, { useEffect, useState } from "react";
import ProfileInfo from "./profile-info";
import { FaArrowDown, FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";
import Projects from "./projects";
import Team from "./my-group";
import Myvacations from "./my-tasks";
import { useDispatch, useSelector } from "react-redux";
import Loader1 from "../../components/loader/loader1";
import EditUser from "../settings/edit-user";
import { ApiService } from "../../components/api.server";
import { useLocation, useNavigate } from "react-router-dom";
import { userDetailSlice } from "../../reducer/event";
import MyTasks from "./my-tasks";
import MyGroup from "./my-group";

const filterProject = [
  {
    id: 3,
    title: "Tasks",
  },
  {
    id: 2,
    title: "Groups",
  },
];

const Profile = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const [editUser, setEditUser] = useState(false);
  const { userData } = useSelector((state) => state.event);
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeProfileDetails = (id) => {
    switch (id) {
      // case 1:
      //   return <Projects />;
      case 2:
        return <MyGroup />;
      case 3:
        return <MyTasks />;
      default:
        return;
    }
  };

  const handleUpdateUser = () => {
    setEditUser(!editUser);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await ApiService.getData(
          `/users/${register?.user_id}`,
          register?.access
        );
        const role = await ApiService.getData(
          `/role/${register?.role_id ? register?.role_id : register?.role}`,
          register?.access
        );
        dispatch(userDetailSlice({ ...res, role: role }));
      } catch (error) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("register");
        } else {
          navigate("/not-found");
        }
      }
    };
    if (register) {
      fetchUserData();
    }
  }, [register?.user_id, editUser]);

  return (
    <div>
      {!userData?.role ? (
        <Loader1 />
      ) : (
        <main className="grid xl:grid-cols-4 lg:grid-cols-5 grid-cols-1 gap-4 md:px-[16px]">
          <section className="xl:col-span-1 lg:col-span-2 col-span-1 ">
            <ProfileInfo handleUpdateUser={handleUpdateUser} />
          </section>
          <section className="lg:col-span-3 col-span-1 rounded-[14px] flex flex-col gap-3">
            <div className="flex justify-between items-start max-md:flex-col-reverse ">
              <div className="relatice flex gap-4 items-center rounded-[14px] bg-background-secondary">
                {filterProject.map((item, idx) => (
                  <button
                    onClick={() => setActiveTab(item.id)}
                    key={idx}
                    className="px-4 py-2 relative cursor-pointer"
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
                        className="absolute inset-0 bg-primary rounded-[14px] mx-auto z-10"
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="">filters</div>
            </div>
            <div className="grid grid-cols-1 gap-[15px]">
              {activeProfileDetails(activeTab)}
            </div>
          </section>
          <EditUser isOpen={editUser} handleClose={handleUpdateUser} />
        </main>
      )}
    </div>
  );
};

export default Profile;
