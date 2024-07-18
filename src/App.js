import React, { Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Saidbar from "./components/saidbar/saidbar";
import Navbar from "./components/navbar/navbar";
import { useEffect } from "react";
import Loader1 from "./components/loader/loader1";
import { userDetailSlice } from "./reducer/event";
import { ApiService } from "./components/api.server";
import { useDispatch } from "react-redux";
//dashboard
const Dashboard = React.lazy(() => import("./interface/dashboard/layout"));
const NearestOvents = React.lazy(() =>
  import("./interface/dashboard/nearest-ovents")
);
//history
const History = React.lazy(() => import("./interface/history/layout"));
//auktion
const Auktion = React.lazy(() => import("./interface/auktsion/layout"));
//checklist
const CheckList = React.lazy(() => import("./interface/checklist/layout"));
//home work
const Homework = React.lazy(() => import("./interface/tasks/layout"));
const Project = React.lazy(() => import("./interface/tasks/project"));
//requirements
const Requirements = React.lazy(() =>
  import("./interface/requirements/layout")
);
//news
const News = React.lazy(() => import("./interface/news/layout"));
//groups
const Groups = React.lazy(() => import("./interface/groups/layout"));
const GroupItem = React.lazy(() => import("./interface/groups/group-item"));
//Profile
const Profile = React.lazy(() => import("./interface/profile/layout"));
//login
const Login = React.lazy(() => import("./components/login/login"));
//register
const Register = React.lazy(() => import("./components/register/register"));

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const selectedTheme = localStorage.getItem("theme");
  const register = JSON.parse(localStorage.getItem("register"));

  useEffect(() => {
    if (selectedTheme) {
      document.body.classList.add(selectedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.add("light");
    }
  }, [selectedTheme]);
  useEffect(() => {
    if (!register && pathname !== "/login" && pathname !== "/register") {
      navigate("/login");
    }
  }, [register, pathname]);

  return (
    <>
      <div
        className={`${
          (pathname === "/login" || pathname === "/register") && "hidden"
        } p-[20px] saidbar fixed top-0 left-0 h-screen max-md:hidden w-[300px]`}
      >
        <Saidbar />
      </div>
      <div
        className={`${
          pathname === "/login" || pathname === "/register"
            ? "w-screen h-screen"
            : "app mx-auto max-md:w-11/12 md:w-[calc(100vw - 300px)] md:pl-[310px] min-h-screen pb-[20px] lg:pr-[20px]"
        } `}
      >
        <Navbar />
        <div id="routes" className="">
          <Routes>
            {/* dashboard */}
            <Route
              path="/"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="nearest"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <NearestOvents />
                </Suspense>
              }
            />
            {/* history */}
            <Route
              path="/history"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <History />
                </Suspense>
              }
            />
            {/* homework */}
            <Route
              path="/homework"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <Homework />
                </Suspense>
              }
            />
            <Route
              path="/project/:id"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <Project />
                </Suspense>
              }
            />
            {/* auktion */}
            <Route
              path="/auktsion"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <Auktion />
                </Suspense>
              }
            />
            {/* requirements */}
            <Route
              path="/requirements"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <Requirements />
                </Suspense>
              }
            />
            {/* checklist */}
            <Route
              path="/checklist"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <CheckList />
                </Suspense>
              }
            />
            {/* news */}
            <Route
              path="/news"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <News />
                </Suspense>
              }
            />
            {/* groups */}
            <Route
              path="/groups"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <Groups />
                </Suspense>
              }
            />
            <Route
              path="/groups/:id"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <GroupItem />
                </Suspense>
              }
            />
            {/* profile */}
            <Route
              path="/profile"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <Profile />
                </Suspense>
              }
            />
            {/* login */}
            <Route
              path="/login"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <Login />
                </Suspense>
              }
            />
            {/* register */}
            <Route
              path="/register"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex justify-center items-center ">
                      <Loader1 />
                    </div>
                  }
                >
                  <Register />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
