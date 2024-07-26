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
import { useRef, useState } from "react";
import { ApiService } from "../../components/api.server";
import toast from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";
import ModalLoader from "../../components/loader/modal-loader";
import { MdOutlineContentCopy } from "react-icons/md";

export default function GenerateCode({ isOpen, handleClose, group }) {
  const [loading, setLoading] = useState(false);
  const [generate, setGenerate] = useState();

  const handleCloseModal = () => {
    handleClose();
  };

  const handleGenerateCode = () => {
    const fetchGenerateCode = async () => {
      const register = JSON.parse(localStorage.getItem("register"));
      setLoading(true);
      try {
        const res = await ApiService.postData(
          "/create-gr-code/",
          { group_id: group?.id },
          register?.access
        );
        setLoading(false);
        setGenerate(res.gr_code);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchGenerateCode();
  };

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(generate)
      .then(() => {
        toast.success("Code copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy code: ", error);
        toast.error("Failed to copy code");
      });
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
              <DialogPanel className="w-full max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl relative">
                <DialogTitle as="h3" className="text-base/7 font-medium">
                  <div className="flex items-end justify-between cursor-pointer">
                    {loading && (
                      <div className="absolute top-0 left-0 w-full h-full bg-black/55 rounded-xl z-[1002] flex justify-center items-center">
                        <ModalLoader />
                      </div>
                    )}
                    <h1 className="font-[600] clamp3">Generate code</h1>
                    <div className="p-[10px] bg-background-secondary rounded-[12px]">
                      <IoClose
                        onClick={handleCloseModal}
                        className="text-text-primary text-[24px]"
                        src={close}
                        alt="close"
                      />
                    </div>
                  </div>
                </DialogTitle>
                <div className="w-full">
                  {generate ? (
                    <button
                      className="w-full cursor-pointer flex justify-between items-center p-4 bg-background-secondary rounded-xl mt-2"
                      onClick={handleCopyCode}
                    >
                      {generate}
                      <MdOutlineContentCopy className="ml-2" />
                    </button>
                  ) : (
                    <button
                      className="w-full cursor-pointer flex justify-between items-center p-4 bg-background-secondary rounded-xl mt-2"
                      onClick={handleGenerateCode}
                    >
                      Generate <code></code>
                      <IoAddCircleOutline className="ml-2" />
                    </button>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
