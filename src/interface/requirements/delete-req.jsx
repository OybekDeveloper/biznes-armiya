import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
  } from "@headlessui/react";
  import { useState } from "react";
  import { ApiService } from "../../components/api.server";
  import SimpleLoading from "../../components/loader/simple-loading";
  import toast from "react-hot-toast";
  
  export default function DeleteModal({ isOpen, handleClose, id }) {
    const [loading, setLoading] = useState(false);
    const handleDelete = () => {
      const deleteFetch = async () => {
        setLoading(true);
        try {
          const register = JSON.parse(localStorage.getItem("register"));
          await ApiService.delData(`/talablar/${id}`, register?.access);
          toast.success("Successfully deleted requirement.", {
            style: {
              backgroundColor: "red",
              border: "1px solid red",
              padding: "16px",
              color: "#fff",
            },
            position: "right-top",
            iconTheme: {
              primary: "#fff",
              secondary: "red",
            },
          });
        } catch (error) {
          console.error("Error deleting news:", error);
        } finally {
          setLoading(false);
        }
      };
      deleteFetch();
      handleClose();
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
                  <DialogTitle
                    as="h3"
                    className="text-clamp2 font-medium text-text-primary"
                  >
                    Delete Requirement
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-thin-color">
                    Are you sure you want to delete this requirement?
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
                      onClick={handleDelete}
                    >
                      {loading ? (
                        <div className="flex justify-start items-center gap-2 opacity-[0.8]">
                          <SimpleLoading />
                          <h1>Loading...</h1>
                        </div>
                      ) : (
                        <h1>Yes</h1>
                      )}
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }
  