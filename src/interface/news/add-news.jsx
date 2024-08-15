import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import TextEditor from "./text-editor";
import { ApiService } from "../../components/api.server";
import { useState, useEffect } from "react";
import SimpleLoading from "../../components/loader/simple-loading";
import toast from "react-hot-toast";
import { close } from "../../images";

export default function AddNews({ isOpen, handleClose, updateItem }) {
  const register = JSON.parse(localStorage.getItem("register"));
  const [news, setNews] = useState({
    content: "",
    user_id: [register?.user_id],
    title: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (updateItem) {
      setNews({
        content: updateItem.content,
        user_id: updateItem.user_id,
        title: updateItem.title,
      });
    }
  }, [updateItem]);

  const handleCloseModal = () => {
    handleClose();
    setNews({
      content: "",
      user_id: [register?.user_id],
      title: "",
    });
  };

  const handleChangeNews = (data) => {
    setNews({
      ...news,
      content: data,
    });
  };

  const handleAddNews = (e) => {
    e.preventDefault();
    setLoading(true);
    const fetchNews = async () => {
      try {
        if (updateItem) {
          await ApiService.putData(
            `/yangiliklar/${updateItem?.id}`,
            news,
            register?.access
          );
          toast.success("Successfully updated news!");
        } else {
          await ApiService.postData("/yangiliklar", news, register?.access);
          toast.success("Successfully added news!");
        }
        handleCloseModal();
      } catch (error) {
        console.log(error);
        toast.error("An error occurred!");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  };

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-[998] focus:outline-none"
        onClose={handleCloseModal}
      >
        <div className="fixed inset-0 z-[999] w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="rounded-xl bg-card p-6">
                <DialogTitle as="h3" className="text-base/7 font-medium">
                  <div className="flex items-end justify-between cursor-pointer">
                    <h1 className="font-[600] clamp3">
                      {updateItem ? "Update News" : "Add News"}
                    </h1>
                    <div
                      onClick={handleCloseModal}
                      className="p-[10px] bg-background-secondary rounded-[12px]"
                    >
                      <IoClose
                        className="border-border text-[24px]"
                        src={close}
                        alt="close"
                      />
                    </div>
                  </div>
                </DialogTitle>
                <form className="mt-4 flex flex-col gap-3 h-full">
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="text"
                      id="title"
                      name="title"
                      value={news?.title}
                      placeholder="Strength is in unity"
                      onChange={(e) =>
                        setNews({ ...news, title: e.target.value })
                      }
                    />
                  </div>
                  <TextEditor
                    loading={loading}
                    news={news}
                    handleChangeNews={handleChangeNews}
                  />
                  <div className="relative w-full flex justify-end items-center">
                    <button
                      onClick={handleAddNews}
                      className="bottom-[16px] right-[16px] bg-button-color  flex justify-start items-center gap-2 rounded-md px-4 py-2 text-white shadow-btn_shadow"
                    >
                      {loading ? (
                        <div className="flex justify-start items-center gap-2 opacity-[0.8]">
                          <SimpleLoading />
                          <h1>Loading...</h1>
                        </div>
                      ) : (
                        <h1>{updateItem ? "Update News" : "Add New"}</h1>
                      )}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
