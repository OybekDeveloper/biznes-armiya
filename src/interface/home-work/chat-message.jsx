import React from "react";
const ChatMessage = () => {
  return (
    <main className="flex flex-col gap-4 max-h-[400px] overflow-y-scroll px-1">
      {[1, 2, 3, 4,5,6,7,8,9,10].map((message, idx) => (
        <div
          key={idx}
          className={`w-full flex gap-3 ${
            idx === 1 ? "justify-start flex-row-reverse" : "justify-start "
          }`}
        >
          <img
            className="inline-block h-6 w-6 rounded-full ring-2 ring-background-secondary"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <div className={`${idx === 1 ? "text-end rounded-tr-none" : "text-start rounded-tl-none"} p-2  rounded-[12px] bg-background-secondary`}>
            <div
              className={`flex ${
                idx === 1 ? "justify-end" : "justify-start"
              } items-center gap-2`}
            >
              <h1 className="text-text-primary font-bold">You</h1>
              <p className="text-thin-color">12:15 AM</p>
            </div>
            <p className="text-thin-color">
              Hi, Oscar! Nice to meet you. We will work with new project
              together.
            </p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default ChatMessage;
