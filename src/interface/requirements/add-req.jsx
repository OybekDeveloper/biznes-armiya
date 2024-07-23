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
import ModalLoder from "../../components/loader/modal-loader";

export default function AddReq({ isOpen, handleClose }) {
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
  });

  const handleCloseModal = () => {
    handleClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
                        <ModalLoder />
                      </div>
                    )}
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
                </DialogTitle>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
