import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { useRef, useState } from "react";
import { ApiService } from "../../components/api.server";
import toast from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import SimpleLoading from "../../components/loader/simple-loading";
import { addGroupBg, close } from "../../images";

export default function AddGroup({ isOpen, handleClose }) {
  const [errorMessage, setErrorMessage] = useState();
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    admin: "Captain",
    rate: 10,
    shiori: "",
  });
  const fileInputRef = useRef(null);

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
      group_photo: file,
    });
  };

  const handleSubmit = (e) => {
    const newError = {};
    e.preventDefault();
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newError[key] = `${key} field is required`;
      }
    });
    if (Object.keys(newError).length > 0) {
      setErrorMessage(newError);
      return;
    } else {
      setErrorMessage(null);
    }

    const register = JSON.parse(localStorage.getItem("register"));
    const groupFetch = async () => {
      setLoading(true);
      try {
        const formD = new FormData();
        formD.append("name", formData.name);
        formD.append("admin", "Captain");
        formD.append("rate", 10);
        formD.append("shiori", formData.shiori);
        formD.append("group_photo", formData.group_photo);

        await ApiService.postMediaData("/group", formD, register?.access);
        setLoading(false);
        toast.success("Group added successfully");
        setFormData({
          name: "",
          admin: "Captain",
          rate: 10,
          shiori: "",
          group_photo: "",
        });
        setUploadPhoto(null);
        handleClose();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    groupFetch();
  };

  const handleCloseModal = () => {
    if (loading) {
      return;
    }
    setFormData({
      name: "",
      admin: "Captain",
      rate: 10,
      shiori: "",
      group_photo: "",
    });
    setUploadPhoto(null);
    handleClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            <div className="fixed inset-0 z-[1000] w-screen overflow-y-auto bg-black/50" />
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
              <DialogPanel className="w-full max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl relative">
                <DialogTitle as="h3" className="text-base/7 font-medium">
                  <div className="flex items-end justify-between cursor-pointer">
                    <h1 className="font-[600] clamp3">Add Group</h1>
                    <div className="p-[10px] bg-background-secondary rounded-[12px]">
                      <IoClose
                        onClick={handleCloseModal}
                        className="text-text-primary text-[24px]"
                        src={close}
                        alt="close"
                      />
                    </div>
                  </div>
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
                </DialogTitle>
                <form className="mt-4 flex flex-col gap-3">
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="name"
                    >
                      Group name
                    </label>
                    <input
                      onChange={handleChange}
                      value={formData?.name}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Group name type"
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
                      htmlFor="shiori"
                    >
                      Slogan
                    </label>
                    <input
                      value={formData?.shiori}
                      onChange={handleChange}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="text"
                      id="shiori"
                      name="shiori"
                      placeholder="Strength is in unity"
                    />
                    {errorMessage?.shiori && (
                      <p className="text-red-500">
                        The tagline field is not filled
                      </p>
                    )}
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
