import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { FaRegFaceSmile } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";

const SendMessage = () => {
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const handleOpenEmoji = () => {
    setIsOpenEmoji(!isOpenEmoji);
  };
  const handleClickEmoji = (e, emojiObject) => {
    setMessage((prev) => prev + e.emoji);
    setIsOpenEmoji(false);
  };
  return (
    <div className="relative flex start items-center h-[40px] shadow-btn_shadow rounded-[12px]">
      <div className="relative h-full w-full">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-full bg-background-secondary outline-none rounded-l-[12px] pl-[40px] pr-[40px]"
          type="text"
        />
        <div className="absolute top-0 left-0 cursor-pointer p-3 rounded-[14px]">
          <GrAttachment className="text-[#6D5DD3]" />
        </div>
      </div>
      <div className="md:relative cursor-pointer p-3 bg-background-secondary">
        <FaRegFaceSmile
          onClick={handleOpenEmoji}
          className="text-yellow-500 text-[18px]"
        />
        <div className="absolute right-0 bottom-[50px]">
          <EmojiPicker
            onEmojiClick={handleClickEmoji}
            open={isOpenEmoji}
            width={250}
          />
        </div>
      </div>
      <button className="h-full w-[50px] bg-button-color rounded-r-[12px] flex justify-center items-center">
        <IoSend className="text-white" />
      </button>
    </div>
  );
};

export default SendMessage;
