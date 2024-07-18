import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { addeventbg, addGroupBg, close } from "../../images";
import SelectListBox from "../../components/listbox/listbox";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { ApiService } from "../../components/api.server";
import toast from "react-hot-toast";

export default function AddGroup({ isOpen, handleClose }) {
  const [errorMessage, setErrorMessage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    admin: "Captain",
    rate: 10,
    shiori: "",
  });

  const handleSubmit = (e) => {
    const newError = {};
    e.preventDefault();
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newError[key] = `${key} field is required`;
      }
    });
    if (Object.keys(newError).length > 0) {
      setErrorMessage(newError);
      return;
    } else {
      setErrorMessage(null);
    }

    const register = JSON.parse(localStorage.getItem("register"));
    const groupFetch = async () => {
      try {
        const res = await ApiService.postData(
          "/group",
          formData,
          register?.access
        );
        toast.success("Group added successfully");
        console.log(res);
        handleClose();
        setFormData({
          name: "",
          admin: "Captain",
          rate: 10,
          shiori: "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    groupFetch();
  };

  const handleCloseModal = () => {
    handleClose();
    setFormData({
      name: "",
      admin: "Captain",
      rate: 10,
      shiori: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(errorMessage);
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
              <DialogPanel className="w-full max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl">
                <DialogTitle as="h3" className="text-base/7 font-medium">
                  <div className="flex items-end justify-between cursor-pointer">
                    <h1 className="font-[600] clamp3">Add Group</h1>
                    <div className="p-[10px] bg-background-secondary rounded-[12px]">
                      <IoClose
                        onClick={handleCloseModal}
                        className="text-text-primary text-[24px]"
                        src={close}
                        alt="close"
                      />
                    </div>
                  </div>
                  <img src={addGroupBg} alt="" />
                </DialogTitle>
                <form className="mt-4 flex flex-col gap-3">
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="name"
                    >
                      Group name
                    </label>
                    <input
                      onChange={handleChange}
                      value={formData?.name}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Group name type"
                    />
                    {errorMessage?.name && (
                      <p className="text-red-500">
                        The name field is not filled
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="shiori"
                    >
                      Slogan
                    </label>
                    <input
                      value={formData?.shiori}
                      onChange={handleChange}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="text"
                      id="shiori"
                      name="shiori"
                      placeholder="Strength is in unity"
                    />
                    {errorMessage?.shiori && (
                      <p className="text-red-500">
                        The tagline field is not filled
                      </p>
                    )}
                  </div>
                  <div className="w-full flex justify-end items-center">
                    <button
                      onClick={handleSubmit}
                      className="px-[20px] py-[13px] rounded-[14px] bg-button-color text-white clamp4 font-bold"
                    >
                      Send Group
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
