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

export default function AddGroup({ isOpen, handleClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-[998] focus:outline-none"
        onClose={handleClose}
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
                        onClick={handleClose}
                        className="text-text-primary text-[24px]"
                        src={close}
                        alt="close"
                      />
                    </div>
                  </div>
                  <img src={addGroupBg} alt="" />
                </DialogTitle>
                <form className="mt-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="text"
                      className="font-bold clamp4 text-thin-color"
                    >
                      Member’s Email
                    </label>
                    <input
                      name="description"
                      id="email"
                      type="email"
                      placeholder="memberemail@gmail.com "
                      className="bg-background-secondary border-[1px] border-border rounded-[14px] px-[18px] py-[11px] focus:border-primary outline-none"
                    ></input>
                  </div>
                  <button>
                    <FaPlus />
                    Add another Member
                  </button>
                  <div className="w-full flex justify-end items-center">
                    <button
                      onClick={handleSubmit}
                      className="px-[20px] py-[13px] rounded-[14px] bg-button-color text-white clamp4 font-bold"
                    >
                      Send Request
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
