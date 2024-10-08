import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {  addGroupBg, close } from "../../images";
import { IoAddCircleOutline, IoClose } from "react-icons/io5";
import {  useRef, useState } from "react";
import SimpleLoading from "../../components/loader/simple-loading";
import { ApiService } from "../../components/api.server";
import toast from "react-hot-toast";

export default function AddItemModal({ isOpen, handleClose, pendingAuction }) {
  const [formData, setFormData] = useState({
    name: "",
    start_time: "",
    end_time: "",
    boshlangich_narx: "",
    img: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const handleCloseModal = () => {
    handleClose();
    setFormData({
      name: "",
      start_time: "",
      end_time: "",
      boshlangich_narx: "",
      img: "",
    });
    setErrorMessage({});
    setUploadPhoto(null);
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

    const register = JSON.parse(localStorage.getItem("register"));
    const AddAuktsion = async () => {
      setLoading(true);
      try {
        const newFormData = new FormData();
        newFormData.append("name", formData.name);
        newFormData.append("start_time", formData.start_time);
        newFormData.append("end_time", formData.end_time);
        newFormData.append("boshlangich_narx", formData.boshlangich_narx);
        if (uploadPhoto) {
          newFormData.append("img", uploadPhoto);
        }

        const res = await ApiService.postMediaData(
          "/buyum",
          newFormData,
          register?.access
        );
        if (res.id) {
          const updatedBuyumlar = [...(pendingAuction?.buyumlar || []), res.id];

        await ApiService.putData(
            `/auktsion/${pendingAuction?.id}`,
            {
              name: pendingAuction?.name,
              kuni: pendingAuction?.kuni,
              buyumlar: updatedBuyumlar,
            },
            register?.access
          );
        }

        handleClose();
        toast.success("Successfully added item!");
        handleCloseModal();
      } catch (error) {
        toast.error("Something went wrong!");

        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    AddAuktsion();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);

    setFormData({
      ...formData,
      img: file,
    });
  };

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
                    <h1 className="font-[600] clamp3">Add Item</h1>
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
                  <div
                    className="w-full h-[200px] rounded-md overflow-hidden my-2 relative"
                    onClick={handleFileInputClick}
                  >
                    <div className="absolute top-0 left-0 w-full h-full text-white cursor-pointer bg-black/10 flex justify-center items-center gap-2 text-xl">
                      <IoAddCircleOutline className="text-2xl" />
                      <h1>Add Foto</h1>
                    </div>
                    <img
                      className="w-full h-full object-cover"
                      src={
                        uploadPhoto
                          ? URL.createObjectURL(uploadPhoto)
                          : addGroupBg
                      }
                      alt=""
                    />
                    <input
                      type="file"
                      name="file"
                      hidden
                      ref={fileInputRef}
                      onChange={handleUploadPhoto}
                    />
                  </div>
                  {errorMessage?.img && (
                    <p className="text-red-500">The img field is not filled</p>
                  )}
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="name"
                    >
                      Item name
                    </label>
                    <input
                      onChange={handleChange}
                      value={formData?.name}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary bg-card"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Item name type"
                    />
                    {errorMessage?.name && (
                      <p className="text-red-500">
                        The name field is not filled
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="boshlangich_narx"
                    >
                      Starting price
                    </label>
                    <input
                      onChange={handleChange}
                      value={formData?.boshlangich_narx}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary bg-card"
                      type="number"
                      id="boshlangich_narx"
                      name="boshlangich_narx"
                      placeholder="Starting price enter"
                    />
                    {errorMessage?.boshlangich_narx && (
                      <p className="text-red-500">
                        The Starting price field is not filled
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="start_time"
                    >
                      Start time
                    </label>
                    <input
                      value={formData?.start_time}
                      onChange={handleChange}
                      className="bg-card px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="datetime-local"
                      id="start_time"
                      name="start_time"
                      placeholder="Strength is in unity"
                    />
                    {errorMessage?.start_time && (
                      <p className="text-red-500">
                        The start time field is not filled
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="end_time"
                    >
                      End time
                    </label>
                    <input
                      value={formData?.end_time}
                      onChange={handleChange}
                      className="bg-card px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="datetime-local"
                      id="end_time"
                      name="end_time"
                      placeholder="Strength is in unity"
                    />
                    {errorMessage?.end_time && (
                      <p className="text-red-500">
                        The end time field is not filled
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
