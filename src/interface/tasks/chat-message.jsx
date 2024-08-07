import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ApiService } from "../../components/api.server";
import { photoUrl } from "../../images";
import OpenFile from "../../components/open-file";

const ChatMessage = ({ chatMessageData, task_id }) => {
  const register = JSON.parse(localStorage.getItem("register"));
  const lastMessageRef = useRef();
  const { userData } = useSelector((state) => state.event);
  const [usersData, setUsersData] = useState({});

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessageData]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const users = {};
      const promises = chatMessageData.map(async (message) => {
        if (!users[message.user_id]) {
          try {
            const user = await ApiService.getData(
              `/users/${message.user_id}`,
              register.access
            );
            users[message.user_id] = user;
          } catch (error) {
            console.error(error);
          }
        }
      });
      await Promise.all(promises);
      setUsersData(users);
    };

    if (chatMessageData?.length) {
      fetchUsersData();
    }
  }, [chatMessageData, register.access]);

  const addHours = (date, hours) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
  };

  const formatTime = (date) => {
    return date.toISOString().split("T")[1].slice(0, 5);
  };

  return (
    <main className="flex flex-col gap-4 max-h-[400px] overflow-y-scroll px-1">
      {chatMessageData.filter((c) => +c.task_id === +task_id).length > 0 ? (
        <>
          {chatMessageData?.map((message, idx) => {
            const userData1 = usersData[message.user_id] || {};
            const messageTime = message?.time ? new Date(message.time) : null;
            const updatedTime = messageTime ? addHours(messageTime, 5) : null;

            if (+message.task_id !== +task_id) {
              return null;
            }
            return (
              <div
                ref={lastMessageRef}
                key={idx}
                className={`w-full flex gap-3 ${
                  +message.user_id === +userData?.id
                    ? "justify-start flex-row-reverse"
                    : "justify-start"
                }`}
              >
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-background-secondary"
                  src={userData1.profile_photo || photoUrl}
                  alt=""
                />
                <div
                  className={`${
                    +message.user_id === +userData?.id
                      ? "text-end rounded-tr-none"
                      : "text-start rounded-tl-none"
                  } p-2  rounded-[12px] bg-background-secondary`}
                >
                  <div
                    className={`flex ${
                      +message.user_id === +userData?.id
                        ? "justify-end"
                        : "justify-start"
                    } items-center gap-2`}
                  >
                    <h1 className="text-text-primary font-bold">
                      {userData1.first_name || userData1.last_name ? (
                        <>
                          {userData1.first_name +
                            "." +
                            userData1.last_name.slice(0, 1)}
                        </>
                      ) : (
                        "No name"
                      )}
                    </h1>
                  </div>
                  {message.file && (
                    <div className="my-2">
                      <OpenFile fileUrl={message.file} />
                    </div>
                  )}
                  <p className="text-thin-color">{message.message}</p>
                  <p className="text-thin-color">
                    {updatedTime ? formatTime(updatedTime) : "No time"}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="h-[100px] text-text-primary font-bold text-center">
          No messages found.
        </div>
      )}
    </main>
  );
};

export default ChatMessage;
