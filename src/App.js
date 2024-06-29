import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Saidbar from "./components/saidbar/saidbar";
import Navbar from "./components/navbar/navbar";

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
const Homework = React.lazy(() => import("./interface/home-work/layout"));
//requirements
const Requirements = React.lazy(() =>
  import("./interface/requirements/layout")
);
//news
const News = React.lazy(() => import("./interface/news/layout"));
//login
const Login = React.lazy(() => import("./components/login/login"));
//register
const Register = React.lazy(() => import("./components/register/register"));

const App = () => {
  const { pathname } = useLocation();

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
            : "app mx-auto max-md:w-11/12 md:w-[calc(100vw - 300px)] md:pl-[310px] min-h-screen pb-[20px] lg:pr-[40px]"
        } `}
      >
        <Navbar />
        <div id="routes" className="">
          <Routes>
            {/* dashboard */}
            <Route
              path="/"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="nearest"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <NearestOvents />
                </Suspense>
              }
            />
            {/* history */}
            <Route
              path="/history"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <History />
                </Suspense>
              }
            />
            {/* homework */}
            <Route
              path="/homework"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Homework />
                </Suspense>
              }
            />
            {/* auktion */}
            <Route
              path="/auktsion"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Auktion />
                </Suspense>
              }
            />
            {/* requirements */}
            <Route
              path="/requirements"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Requirements />
                </Suspense>
              }
            />
            {/* checklist */}
            <Route
              path="/checklist"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <CheckList />
                </Suspense>
              }
            />
            {/* news */}
            <Route
              path="/news"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <News />
                </Suspense>
              }
            />
            {/* login */}
            <Route
              path="/login"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Login />
                </Suspense>
              }
            />
            {/* register */}
            <Route
              path="/register"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
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
