import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProfileInfo from "./profile";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader1 from "../../components/loader/loader1";
import EditUser from "./edit-user";
import { ApiService } from "../../components/api.server";
import { userDetailSlice } from "../../reducer/event";

const dataNav = [
  {
    id: 1,
    title: "User Management",
    link: "/settings/user",
  },
  {
    id: 2,
    title: "Role",
    link: "/settings/role",
  },
];

const Settings = () => {
  const { userData } = useSelector((state) => state.event);
  const register = JSON.parse(localStorage.getItem("register"));
  const [editUser, setEditUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
          `/role/${res?.role}`,
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
    //eslint-disable-next-line
  }, [register?.user_id, editUser]);

  return (
    <>
      {!userData?.role ? (
        <Loader1 />
      ) : (
        <main className="max-w-11/12 mx-auto sm:px-4">
          <section className="flex bg-backgrond">
            <div className="bg-card rounded-[18px]">
              {dataNav.map((item, idx) => (
                <button
                  onClick={() => navigate(item.link)}
                  key={idx}
                  className={`outline-none rounded-b-[18px] bg-background  px-4 py-2 relative cursor-pointer
                  ${item.link === pathname ? "" : ""}`}
                >
                  <h1 className={`relative z-20`}>{item.title}</h1>
                  {item.link === pathname && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-card rounded-t-[18px] mx-auto z-10"
                    />
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="bg-card p-4 min-h-[calc(100vh-150px)] grid max-xl:flex flex-col   xl:grid-cols-5 gap-4">
            <div className="col-span-2">
              <ProfileInfo handleUpdateUser={handleUpdateUser} />
            </div>
            <div className="col-span-1  lg:col-span-3">
              <Outlet />
            </div>
          </section>
          <EditUser isOpen={editUser} handleClose={handleUpdateUser} />
        </main>
      )}
    </>
  );
};

export default Settings;
