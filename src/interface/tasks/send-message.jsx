import React, { useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { FaRegFaceSmile } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { ApiService } from "../../components/api.server";
import { useDispatch } from "react-redux";
import { eventSliceAction } from "../../reducer/event";
import SimpleLoading from "../../components/loader/simple-loading";

const SendMessage = ({ task_id }) => {
  const dispatch = useDispatch();
  const register = JSON.parse(localStorage.getItem("register"));
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    message: "",
    task_id: task_id,
    user_id: register.user_id,
  });
  const [loading, setLoading] = useState(false);

  const handleOpenEmoji = () => {
    setIsOpenEmoji(!isOpenEmoji);
  };

  const handleClickEmoji = (e, emojiObject) => {
    setMessage((prev) => prev + e.emoji);
    setIsOpenEmoji(false);
  };

  const handleSendMessage = () => {
    if (formData.message === "") {
      return;
    }
    const sendMessage = async () => {
      try {
        setLoading(true);
        const res = await ApiService.postData(
          "/chat/",
          formData,
          register.access
        );
        dispatch(eventSliceAction());
        console.log(res);
        setFormData({
          message: "",
          task_id: task_id,
          user_id: register.user_id,
        });
        setMessage("");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents the default Enter key behavior (e.g., form submission or newline in textarea)
      handleSendMessage();
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      message: message,
    });
  }, [message]);

  console.log(formData);
  return (
    <div className="relative flex start items-center h-[40px] shadow-btn_shadow rounded-[12px]">
      <div className="relative h-full w-full">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Add this line
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
      <button
        disabled={message === ""}
        onClick={handleSendMessage}
        className={`${
          message === "" ? "opacity-50 cursor-not-allowed" : "opacity-100"
        } h-full w-[50px] bg-button-color rounded-r-[12px] flex justify-center items-center`}
      >
        {loading ? <SimpleLoading /> : <IoSend className="text-white" />}
      </button>
    </div>
  );
};

export default SendMessage;
