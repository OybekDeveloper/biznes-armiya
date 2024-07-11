import React from "react";
import { FaArrowDown, FaCalendar } from "react-icons/fa";

const Projects = () => {
  return (
    <div className="grid grid-cols-1 gap-[15px]">
      {[1, 2, 3].map((item, idx) => (
        <div
          className="bg-card shadow-btn_shadow w-full h-full rounded-[24px] grid xl:grid-cols-11 md:grid-cols-5 grid-cols-1"
          key={idx}
        >
          <div className="max-md:col-span-1 col-span-5 p-[18px] flex flex-col gap-[24px]">
            <div className="flex justify-start items-center gap-[18px]">
              <img
                className="w-[40px] h-[40px]"
                src="https://s3-alpha-sig.figma.com/img/e699/08ec/4d1a06f005fea30771b61b3a4f903dd3?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hDp9zObNSJ2BfAdlkuLzg3man5qr~dTPNzqqOEBgQKt-Gf0LJYrAIOCbSbKTzk3A-9AVBGxQ4LA4KMGBYqlQqys~BNHwqOtsOi7sC1YCBs-h5yUnaLm0UfMntV2bRvWlSGN5WnsaHeQBXJdOWJGmIGTk0eamelE0XPrUh7isz7vo5kZykeVjj0uAGt8azfItg0A6jGT-tkr~I0ygXneGM3B8u8ik3tXhQeryDSmp7JJlI-VM-aZVeupxpIPERxAadw4gnAYiyKb2Dei0Hf2YETiHgetO1WoD9VeL17r2fEvbrOqzXLbnHq4hHBm8bKqglrLX8RUx0y32kNZalXYFLA__"
                alt=""
              />
              <div>
                <p className="text-thin-color clamp4">PN0001265</p>
                <h1 className="text-text-primary clamp3 font-bold">
                  Medical App (iOS native)
                </h1>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex justify-start items-center gap-1 text-thin-color">
                <FaCalendar />
                <h1>Created Sep 10, 2020</h1>
              </div>
              <div className="flex justify-start items-center gap-1 text-green-400">
                <FaArrowDown />
                <h1>Medium</h1>
              </div>
            </div>
          </div>
          <div className="col-span-1  max-xl:col-span-5 flex justify-center items-center w-full">
            <div className="h-[1px] w-full xl:h-full xl:w-[1px] bg-hr-color"></div>
          </div>
          <div className="max-md:col-span-1 col-span-5 p-[18px] flex flex-col gap-[24px]">
            <div>
              <h1 className="text-text-primary font-bold clamp3">
                Project Data
              </h1>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col justify-start gap-2">
                <p className="text-thin-color clamp-4">All tasks</p>
                <h1 className="text-text-primary font-bold clamp4">50</h1>
              </div>
              <div className="flex flex-col justify-start gap-2">
                <p className="text-thin-color clamp-4">Active tasks</p>
                <h1 className="text-text-primary font-bold clamp4">50</h1>
              </div>
              <div className="flex flex-col justify-start gap-2">
                <p className="text-thin-color clamp-4">Assignees</p>
                <div className="flex -space-x-1">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="inline-flex h-6 w-6 rounded-full ring-2 ring-white bg-blue-300 text-white text-sm text-center font-bold justify-center items-center">
                    <h1>2+</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
