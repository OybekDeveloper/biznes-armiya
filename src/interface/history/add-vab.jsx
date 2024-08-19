import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import SimpleLoading from "../../components/loader/simple-loading";
import { ApiService } from "../../components/api.server";
import toast from "react-hot-toast";
import { FaEquals } from "react-icons/fa";
import { LiaDollarSignSolid } from "react-icons/lia";
import { close } from "../../images";

export default function AddVabModal({ isOpen, handleClose }) {
  const register = JSON.parse(localStorage.getItem("register"));
  const date = new Date();
  const isoString = date.toISOString();
  const [vab, setVab] = useState([]);
  const [formData, setFormData] = useState({
    date: isoString,
    history: [{ vab: "", data: isoString }],
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCloseModal = () => {
    setVab([]);
    handleClose();
    setFormData({
      date: isoString,
      history: [{ vab: "", data: isoString }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.history.length || !formData.history[0].vab) {
      newErrors.vab = "VAB field is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage(newErrors);
      return;
    } else {
      setErrorMessage({});
    }

    setShowConfirmation(true);
  };

  const confirmSubmission = async () => {
    setShowConfirmation(false);
    try {
      setLoading(true);
      await ApiService.putData(
        "/vab/1",
        {
          ...formData,
          history: [...formData.history, ...vab],
        },
        register?.access
      );
      toast.success("Successfully added VAB!");
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add VAB!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const date = new Date();
    const isoString = date.toISOString();

    setFormData((prev) => ({
      ...prev,
      history: [
        {
          vab: value,
          data: isoString,
        },
      ],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiService.getData("/vab/1", register?.access);
        setVab(res?.history || []);
      } catch (error) {
        console.error(error);
      }
    };
    if (isOpen) fetchData();
  }, [isOpen]);

  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-[1300] focus:outline-none"
          onClose={handleCloseModal}
        >
          <div className="fixed inset-0 z-[1330] w-screen overflow-y-auto bg-black/50">
            {loading && (
              <div className="fixed inset-0 z-[1400] w-screen overflow-y-auto bg-transparent" />
            )}
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-11/12 max-sm:max-w-11/12 max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-base/7 font-medium">
                    <div className="flex items-end justify-between cursor-pointer">
                      <h1 className="font-[600] clamp3">Add VAB</h1>
                      <div
                        onClick={handleCloseModal}
                        className="p-[10px] bg-background-secondary rounded-[12px]"
                      >
                        <IoClose
                          className="text-text-primary text-[24px]"
                          src={close}
                          alt="close"
                        />
                      </div>
                    </div>
                  </DialogTitle>
                  <form
                    className="mt-4 flex flex-col gap-3"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-4">
                      <label
                        className="col-span-4 text-[14px] font-[700] text-thin"
                        htmlFor="vab"
                      >
                        VAB
                      </label>

                      <div className="col-span-1 flex justify-start items-center gap-3">
                        <div className="text-xl flex justify-end items-center">
                          <h1>1</h1>
                          <LiaDollarSignSolid />
                        </div>
                        <FaEquals />
                      </div>
                      <div className="col-span-3">
                        <input
                          onChange={handleChange}
                          value={
                            formData.history[formData.history.length - 1]
                              ?.vab || ""
                          }
                          className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary bg-card"
                          type="number"
                          id="vab"
                          name="vab"
                          placeholder="Enter the VAB"
                        />
                        {errorMessage.vab && (
                          <p className="text-red-500">{errorMessage.vab}</p>
                        )}
                      </div>
                    </div>
                    <div className="w-full flex justify-end items-center">
                      <button
                        onClick={handleSubmit}
                        className="px-[20px] py-[13px] rounded-[14px] bg-button-color text-white clamp4 font-bold"
                      >
                        {loading ? (
                          <div className="flex justify-start items-center gap-2 opacity-[0.8]">
                            <SimpleLoading />
                            <h1>Loading...</h1>
                          </div>
                        ) : (
                          <h1>Add VAB</h1>
                        )}
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={showConfirmation}>
        <Dialog
          as="div"
          className="relative z-[1500] focus:outline-none"
          onClose={() => setShowConfirmation(false)}
        >
          <div className="fixed inset-0 z-[1530] w-screen overflow-y-auto bg-black/50">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-sm:max-w-11/12 max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-base/7 font-medium">
                    <div className="flex items-end justify-between cursor-pointer">
                      <h1 className="font-[600] clamp3">Confirm Submission</h1>
                      <div className="p-[10px] bg-background-secondary rounded-[12px]">
                        <IoClose
                          onClick={() => setShowConfirmation(false)}
                          className="text-text-primary text-[24px]"
                          src={close}
                          alt="close"
                        />
                      </div>
                    </div>
                  </DialogTitle>
                  <div className="mt-4">
                    <p>Are you sure you want to submit this data?</p>
                    <div className="flex justify-end gap-4 mt-4">
                      <button
                        type="button"
                        onClick={() => setShowConfirmation(false)}
                        className="px-[20px] py-[13px] rounded-[14px] bg-background text-primary clamp4 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={confirmSubmission}
                        className="px-[20px] py-[13px] rounded-[14px] bg-button-color text-white clamp4 font-bold"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
