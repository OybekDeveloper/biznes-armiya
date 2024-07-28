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

export default function NotificationModal({ isOpen, handleClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Transition 
    appear show={isOpen}>
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
              <DialogPanel className="w-full h-screen max-w-md rounded-xl sm:p-6 p-2 backdrop-blur-2xl">
                <main className="bg-card w-full h-full rounded-[14px]">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-white p-4"
                  >
                    <div className="flex items-end justify-between cursor-pointer">
                      <h1 className="text-text-primary font-[600] clamp3">
                        Notifications
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
                  </DialogTitle>
                  <div className="overflow-y-scroll max-h-[calc(100vh-135px)]">
                    {[1, 2, 3, 4, 5, 62, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].map(
                      (item, idx) => (
                        <div key={idx}>
                          <div className="w-full h-[2px] bg-hr-color" />
                          <div
                                className="px-4 flex justify-start items-start gap-3 py-2 my-2 cursor-pointer hover:bg-hover-card"
                          >
                            <div>
                              <img
                                className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div>
                              <h1 className="text-text-primary font-[500] clamp4">
                                Emily Tyler sent you a comment in Research task
                              </h1>
                              <p className="text-thin-color">2h ago</p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </main>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
