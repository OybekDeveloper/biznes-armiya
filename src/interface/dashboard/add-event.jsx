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

export default function AddEvent({ isOpen, handleClose }) {
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 z-30 w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-white"
                >
                  <div className="flex items-end justify-between cursor-pointer">
                    <h1 className="text-black font-[600] clamp3">
                      Need some Help?
                    </h1>
                    <img
                      onClick={handleClose}
                      className="p-[10px] bg-[#F4F9FD] rounded-[12px]"
                      src={close}
                      alt="close"
                    />
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
                      className="border-[1px] border-border rounded-[14px] px-[18px] py-[11px] focus:border-primary outline-none"
                    ></textarea>
                  </div>
                  <div className="w-full flex justify-end items-center">
                    <button onClick={handleSubmit} className="px-[20px] py-[13px] rounded-[14px] bg-primary text-white clamp4 font-bold">
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
