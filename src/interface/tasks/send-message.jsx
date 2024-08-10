import React, { useEffect, useState, useRef } from "react";
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
    file: "",
    message: "",
    task_id: task_id,
    user_id: register.user_id,
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleOpenEmoji = () => {
    setIsOpenEmoji(!isOpenEmoji);
  };

  const handleClickEmoji = (e, emojiObject) => {
    setMessage((prev) => prev + e.emoji);
    setIsOpenEmoji(false);
  };

  const handleSendMessage = () => {
    if (formData.message === "" && !formData.file) {
      return;
    }
    const sendMessage = async () => {
      try {
        const newFormData = new FormData();
        if (formData.file) newFormData.append("file", formData.file);
        if (formData.message === "" && formData.file) {
          newFormData.append(
            "message",
            formData.file.name.length > 10
              ? formData.file.name.slice(0, 10) +
                  "..." +
                  formData.file.name.split(".")[1]
              : formData.file.name
          );
        } else {
          newFormData.append("message", formData.message);
        }
        newFormData.append("task_id", formData.task_id);
        newFormData.append("user_id", formData.user_id);

        setLoading(true);
        const res = await ApiService.postMediaData(
          "/chat/",
          newFormData,
          register.access
        );
        dispatch(eventSliceAction());
        console.log(res);
        setFormData({
          file: "",
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
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default Enter key behavior (e.g., form submission or newline in textarea)
      handleSendMessage();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 50 * 1024 * 1024) {
      alert("File size exceeds 50 MB");
    } else {
      setFormData({
        ...formData,
        file: file,
      });
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      message: message,
    });
  }, [message]);

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
        <div
          className="absolute top-0 left-0 cursor-pointer p-3 rounded-[14px]"
          onClick={() => fileInputRef.current.click()}
        >
          <GrAttachment className="text-[#6D5DD3]" />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        {formData.file && (
          <div className="absolute -top-5 left-0 bg-background p-2 rounded-md transform -translate-y-1/2 text-sm text-gray-600">
            {formData.file.name.length > 10
              ? formData.file.name.slice(0, 10) +
                "..." +
                formData.file.name.split(".")[1]
              : formData.file.name}
          </div>
        )}
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
        disabled={message === "" && !formData.file}
        onClick={handleSendMessage}
        className={`${
          message === "" && !formData.file
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100"
        } h-full w-[50px] bg-button-color rounded-r-[12px] flex justify-center items-center`}
      >
        {loading ? <SimpleLoading /> : <IoSend className="text-white" />}
      </button>
    </div>
  );
};

export default SendMessage;
