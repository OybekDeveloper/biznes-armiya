import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDetailSlice } from "../reducer/event";

export default function ExitModal({ isOpen, handleClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("register");
    localStorage.removeItem("your-group");
    navigate("/login");
    handleClose();
    dispatch(userDetailSlice({}));
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-[998] focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 z-[999] w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <DialogTitle
                as="h3"
                className="text-clamp2 font-medium text-text-primary"
              >
                Log Out
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-thin-color">
                Are you sure you want to log out?
              </p>
              <div className="mt-4 flex justify-between items-center gap-3">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleClose}
                >
                  No
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleLogOut}
                >
                  Yes
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
