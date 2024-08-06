import {
  Button,
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
import { close } from "../../images";
import { FaEquals } from "react-icons/fa";
import { LiaDollarSignSolid } from "react-icons/lia";

export default function AddVabModal({ isOpen, handleClose }) {
  const register = JSON.parse(localStorage.getItem("register"));
  const date = new Date();
  const isoString = date.toISOString();
  const [vab, setVab] = useState();
  const [formData, setFormData] = useState({
    date: isoString,
    history: [],
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    setVab()
    handleClose();
    setFormData({
      date: isoString,
      history: [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `This field is required`;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrorMessage(newErrors);
      return;
    } else {
      setErrorMessage({});
    }

    const AddAuktsion = async () => {
      setLoading(true);
      try {
        const res = await ApiService.putData(
          "/vab/9",
          {
            ...formData,
            history: [...formData.history, ...vab],
          },
          register?.access
        );
        toast.success("Successfully added vab!");
        handleCloseModal();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    AddAuktsion();
  };

  const handleChange = (e) => {
    const date = new Date();
    const isoString = date.toISOString();
    const { value } = e.target;
    setFormData({
      ...formData,
      history: [
        {
          vab: value,
          data: isoString,
        },
      ],
    });
  };

  useEffect(() => {
    const fetcData = async () => {
      try {
        const res = await ApiService.getData("/vab/9", register?.access);
        setVab(res?.history);
      } catch (error) {}
    };
    fetcData();
  }, [isOpen]);
  console.log(formData);
  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-[998] focus:outline-none"
        onClose={handleCloseModal}
      >
        <div className="fixed inset-0 z-[999] w-screen overflow-y-auto bg-black/50">
          {loading && (
            <div className="fixed inset-0 z-[1009] w-screen overflow-y-auto bg-transparent" />
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
              <DialogPanel className="w-full max-sm:max-w-11/12 max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl">
                <DialogTitle as="h3" className="text-base/7 font-medium">
                  <div className="flex items-end justify-between cursor-pointer">
                    <h1 className="font-[600] clamp3">Add Auktsion</h1>
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
                        value={formData?.vab?.slice(0, 10)}
                        className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary bg-card"
                        type="number"
                        id="vab"
                        name="vab"
                        placeholder="Enter the vab"
                      />
                      {errorMessage?.vab && (
                        <p className="text-red-500">
                          The vab field is not filled
                        </p>
                      )}
                    </div>
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
                        <h1>Add Group</h1>
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
  );
}
