import React, { Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Saidbar from "./components/saidbar/saidbar";
import Navbar from "./components/navbar/navbar";
import { useEffect } from "react";
import Loader1 from "./components/loader/loader1";
//dashboard
const Dashboard = React.lazy(() => import("./interface/dashboard/layout"));
const NearestOvents = React.lazy(() =>
  import("./interface/dashboard/nearest-ovents")
);
//history
const History = React.lazy(() => import("./interface/history/layout"));
//auktion
const Auktion = React.lazy(() => import("./interface/auktsion/auktsion"));
const AuktionItem = React.lazy(() =>
  import("./interface/auktsion/auktsion-item")
);
const AuktionHistory = React.lazy(() =>
  import("./interface/auktsion/auktsion-history")
);
//checklist
const CheckList = React.lazy(() => import("./interface/checklist/layout"));
//home work
const Homework = React.lazy(() => import("./interface/tasks/layout"));
const Project = React.lazy(() => import("./interface/tasks/project"));
//requirements
const Requirements = React.lazy(() =>
  import("./interface/requirements/layout")
);
const RequirementItem = React.lazy(() =>
  import("./interface/requirements/requirement-item")
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
const NotFound = React.lazy(() => import("./components/not-found/not-found"));

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
  useEffect(() => {
    if (!selectedTheme) {
      document.body.classList.add("ligth");
    }
  }, []);

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
                <Suspense fallback={<Loader1 />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="nearest"
              element={
                <Suspense fallback={<Loader1 />}>
                  <NearestOvents />
                </Suspense>
              }
            />
            {/* history */}
            <Route
              path="/history"
              element={
                <Suspense fallback={<Loader1 />}>
                  <History />
                </Suspense>
              }
            />
            {/* homework */}
            <Route
              path="/homework"
              element={
                <Suspense fallback={<Loader1 />}>
                  <Homework />
                </Suspense>
              }
            />
            <Route
              path="/project/:id"
              element={
                <Suspense fallback={<Loader1 />}>
                  <Project />
                </Suspense>
              }
            />
            {/* auktion */}
            <Route
              path="/auktsion"
              element={
                <Suspense fallback={<Loader1 />}>
                  <Auktion />
                </Suspense>
              }
            />
            <Route
              path="/auktsion/:id"
              element={
                <Suspense fallback={<Loader1 />}>
                  <AuktionItem />
                </Suspense>
              }
            />
            <Route
              path="/auktsion-history"
              element={
                <Suspense fallback={<Loader1 />}>
                  <AuktionHistory />
                </Suspense>
              }
            />
            {/* requirements */}
            <Route
              path="/requirements"
              element={
                <Suspense fallback={<Loader1 />}>
                  <Requirements />
                </Suspense>
              }
            />
            <Route
              path="/requirements/:id"
              element={
                <Suspense fallback={<Loader1 />}>
                  <RequirementItem />
                </Suspense>
              }
            />
            {/* checklist */}
            <Route
              path="/checklist"
              element={
                <Suspense fallback={<Loader1 />}>
                  <CheckList />
                </Suspense>
              }
            />
            {/* news */}
            <Route
              path="/news"
              element={
                <Suspense fallback={<Loader1 />}>
                  <News />
                </Suspense>
              }
            />
            {/* groups */}
            <Route
              path="/groups"
              element={
                <Suspense fallback={<Loader1 />}>
                  <Groups />
                </Suspense>
              }
            />
            <Route
              path="/groups/:id"
              element={
                <Suspense fallback={<Loader1 />}>
                  <GroupItem />
                </Suspense>
              }
            />
            {/* profile */}
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loader1 />}>
                  <Profile />
                </Suspense>
              }
            />
            {/* login */}
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loader1 />}>
                  <Login />
                </Suspense>
              }
            />
            {/* register */}
            <Route
              path="/register"
              element={
                <Suspense fallback={<Loader1 />}>
                  <Register />
                </Suspense>
              }
            />
            <Route
              path="/not-found"
              element={
                <Suspense fallback={<Loader1 />}>
                  <NotFound />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<Loader1 />}>
                  <NotFound />
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
