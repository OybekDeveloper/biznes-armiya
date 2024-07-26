import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import AddReq from "./add-req";
import { ApiService } from "../../components/api.server";
import Loader1 from "../../components/loader/loader1";
import { useSelector } from "react-redux";
const Requirements = () => {
  const { permissionStatus } = useSelector((state) => state.event);

  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requirement, setRequirement] = useState([]);
  const handleAvtive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const fetchReq = async () => {
      try {
        const register = JSON.parse(localStorage.getItem("register"));
        const res = await ApiService.getData("/talablar", register?.access);
        setRequirement(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReq();
  }, [isActive]);

  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main className="sm:px-4 relative col-span-3 max-lg:grid-cols-1 flex flex-col gap-2 ">
          <section className="flex justify-between items-center">
            <h1 className="text-text-primary font-bold clamp3">
              Tekshirish Ro’yxati
            </h1>
            <button
              onClick={handleAvtive}
              className="max-md:hidden bg-button-color  flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow"
            >
              <FaPlus />
              <h1>Add Request</h1>
            </button>
            <button className="md:hidden fixed bottom-[16px] right-[16px] bg-button-color  flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow">
              <FaPlus />
            </button>
          </section>
          <div className="grid xl:grid-cols-4 lg:grid-cols-2 max-sm:grid-cols-1 sm:grid-cols-2 flex-1 gap-2">
            {requirement?.map((item, idx) => (
              <NavLink
                to={`/requirements/${idx}`}
                className="w-full h-full bg-card rounded-[24px] p-[16px] flex flex-col justify-start items-center gap-1"
                key={idx}
              >
                <img
                  src="https://s3-alpha-sig.figma.com/img/e699/08ec/4d1a06f005fea30771b61b3a4f903dd3?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hDp9zObNSJ2BfAdlkuLzg3man5qr~dTPNzqqOEBgQKt-Gf0LJYrAIOCbSbKTzk3A-9AVBGxQ4LA4KMGBYqlQqys~BNHwqOtsOi7sC1YCBs-h5yUnaLm0UfMntV2bRvWlSGN5WnsaHeQBXJdOWJGmIGTk0eamelE0XPrUh7isz7vo5kZykeVjj0uAGt8azfItg0A6jGT-tkr~I0ygXneGM3B8u8ik3tXhQeryDSmp7JJlI-VM-aZVeupxpIPERxAadw4gnAYiyKb2Dei0Hf2YETiHgetO1WoD9VeL17r2fEvbrOqzXLbnHq4hHBm8bKqglrLX8RUx0y32kNZalXYFLA__"
                  alt="logo"
                  className="mb-[10px] w-16 h-16 rounded-full"
                />
                <h1 className="text-text-primary font-medium">Shawn Stone</h1>
                <p className="text-gray-500 font-bold">UI/UX Designer</p>
                <p className="text-gray-500">9/10</p>
                <p className="text-gray-500 py-1 px-2 border-border border-[1px] rounded-[4px] text-[12px]">
                  9 Soldiers
                </p>
              </NavLink>
            ))}
          </div>
          <AddReq isOpen={isActive} handleClose={handleAvtive} />
        </main>
      )}
    </>
  );
};

export default Requirements;
