import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { addeventbg, close } from "../../images";
import SelectListBox from "../../components/listbox/listbox";
import { IoClose } from "react-icons/io5";

export default function FilterTask({ isOpen, handleClose }) {
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
          <div className="flex min-h-full items-end justify-end">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full h-screen max-w-md rounded-xl p-2 sm:p-6 backdrop-blur-2xl">
                <main className="bg-card w-full h-full p-4 rounded-[14px]">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-white"
                  >
                    <div className="flex items-end justify-between cursor-pointer">
                      <h1 className="text-text-primary font-[600] clamp3">
                        Need some Help?
                      </h1>
                      <div className="p-[10px] bg-background-secondary rounded-[12px]">
                        <IoClose
                          onClick={handleClose}
                          className="text-text-primary text-[24px]"
                          src={close}
                          alt="close"
                        />
                      </div>
                    </div>
                    <img src={addeventbg} alt="" />
                  </DialogTitle>
                  <p className="mt-2 clamp4 text-thin">
                    Describe your question and our specialists will answer you
                    within 24 hours.
                  </p>
                  <form className="mt-4 flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="text"
                        className="font-bold clamp4 text-thin"
                      >
                        Request Subject
                      </label>
                      <SelectListBox />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="text"
                        className="font-bold clamp4 text-thin"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id=""
                        placeholder="Add some description of the request "
                        className="border-[1px] border-border rounded-[14px] px-[18px] py-[11px] focus:border-primary outline-none bg-background-secondary"
                      ></textarea>
                    </div>
                    <div className="w-full flex justify-end items-center">
                      <button
                        onClick={handleSubmit}
                        className="px-[20px] py-[13px] rounded-[14px] bg-button-color clamp4 font-bold text-white"
                      >
                        Send Request
                      </button>
                    </div>
                  </form>
                </main>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
