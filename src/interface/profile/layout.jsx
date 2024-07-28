import React, { useState } from "react";
import ProfileInfo from "./profile-info";
import { FaArrowDown, FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";
import Projects from "./projects";
import Team from "./team";
import Myvacations from "./my-vacations";
import { useSelector } from "react-redux";
import Loader1 from "../../components/loader/loader1";
const filterProject = [
  {
    id: 1,
    title: "Projects",
  },
  {
    id: 2,
    title: "Team",
  },
  {
    id: 3,
    title: "My vacations",
  },
];

const Profile = () => {
  const { userData } = useSelector((state) => state.event);
  const [activeTab, setActiveTab] = useState(1);
  const activeProfileDetails = (id) => {
    switch (id) {
      case 1:
        return <Projects />;
      case 2:
        return <Team />;
      case 3:
        return <Myvacations />;
      default:
        return;
    }
  };
  return (
    <div>
      {!userData?.role ? (
        <Loader1 />
      ) : (
        <main className="grid xl:grid-cols-4 lg:grid-cols-5 grid-cols-1 gap-4 md:px-[16px]">
          <section className="xl:col-span-1 lg:col-span-2 col-span-1 ">
            <ProfileInfo />
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
        </main>
      )}
    </div>
  );
};

export default Profile;
