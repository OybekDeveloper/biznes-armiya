import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
  } from "@headlessui/react";
  import { IoClose } from "react-icons/io5";
  import { useEffect, useState } from "react";
  import { ApiService } from "../../components/api.server";
  import toast from "react-hot-toast";
  import SimpleLoading from "../../components/loader/simple-loading";
  
  export default function AddTime({ isOpen, handleClose, taskId }) {
    const [errorMessage, setErrorMessage] = useState({});
    const [formData, setFormData] = useState({
      name: "",
      definition: "",
      start_time: "",
      stop_time: "",
      status: "",
    });
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newError = {};
      console.log(formData);
      const register = JSON.parse(localStorage.getItem("register"));
  
      const groupFetch = async () => {
        setLoading(true);
        try {
          const res = await ApiService.putData(
            `/tasksreq/${taskId?.id}`,
            formData,
            register?.access
          );
  
          toast.success("Attachment added successfully");
          console.log(res);
          handleClose();
          setFormData({
            name: "",
            definition: "",
            start_time: "",
            stop_time: "",
            status: "",
          });
        } catch (error) {
          console.log(error);
          toast.error("An error occurred while adding the attachment.");
        } finally {
          setLoading(false);
        }
      };
  
      Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
          newError[key] = `${key} field is required`;
        }
      });
      if (Object.keys(newError).length > 0) {
        setErrorMessage(newError);
        return;
      } else {
        setErrorMessage({});
        groupFetch();
      }
    };
  
    const handleCloseModal = () => {
      handleClose();
      setFormData({
        name: "",
        definition: "",
        start_time: "",
        stop_time: "",
        status: "",
      });
      setErrorMessage({});
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    useEffect(() => {
      if (taskId) {
        setFormData({
          name: taskId.name || "",
          definition: taskId.definition || "",
          start_time: "",
          stop_time: "",
          status: taskId.status || "",
        });
      }
    }, [taskId]);
  
    return (
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-[998] focus:outline-none"
          onClose={() => {}}
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
                <DialogPanel className="max-w-11/12 rounded-xl bg-card p-6">
                  <DialogTitle as="h3" className="text-base/7 font-medium">
                    <div className="flex items-end justify-between cursor-pointer">
                      <h1 className="font-[600] clamp3">Add Task</h1>
                      <div
                        onClick={handleCloseModal}
                        className="p-[10px] bg-background-secondary rounded-[12px]"
                      >
                        <IoClose className="border-border text-[24px]" />
                      </div>
                    </div>
                  </DialogTitle>
                  <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col justify-between items-center gap-4 max-sm:flex-col">
                      <div className="w-full">
                        <label
                          className="text-[14px] font-[700] text-thin"
                          htmlFor="start_time"
                        >
                          Starts
                        </label>
                        <input
                          value={formData.start_time}
                          onChange={handleChange}
                          className="border-border px-[18px] py-[12px] w-full border-[1.5px] border-solid bg-card rounded-[14px] outline-none focus:border-primary"
                          type="datetime-local"
                          id="start_time"
                          name="start_time"
                          placeholder="Start time is in unity"
                        />
                        {errorMessage.start_time && (
                          <p className="text-red-500">
                            The start time field is not filled
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <label
                          className="text-[14px] font-[700] text-thin"
                          htmlFor="stop_time"
                        >
                          Dead Line
                        </label>
                        <input
                          value={formData.stop_time}
                          onChange={handleChange}
                          className="border-border px-[18px] py-[12px] w-full border-[1.5px] border-solid bg-card rounded-[14px] outline-none focus:border-primary"
                          type="datetime-local"
                          id="stop_time"
                          name="stop_time"
                          placeholder="Stop time is in unity"
                        />
                        {errorMessage.stop_time && (
                          <p className="text-red-500">
                            The dead line field is not filled
                          </p>
                        )}
                      </div>
                      <div className="w-full flex justify-end items-center">
                        <button
                          type="submit"
                          className="px-[20px] py-[13px] rounded-[14px] bg-button-color text-white clamp4 font-bold"
                        >
                          {loading ? (
                            <div className="flex justify-start items-center gap-2 opacity-[0.8]">
                              <SimpleLoading />
                              <h1>Loading...</h1>
                            </div>
                          ) : (
                            <h1>Attachment</h1>
                          )}
                        </button>
                      </div>
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
  