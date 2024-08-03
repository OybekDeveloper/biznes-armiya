import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { ApiService } from "../../components/api.server";
import toast from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import SimpleLoading from "../../components/loader/simple-loading";
import { addGroupBg, close } from "../../images";
import { useSelector } from "react-redux";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function AddUser({ isOpen, handleClose }) {
  const { userData } = useSelector((state) => state.event);
  const [errorMessage, setErrorMessage] = useState({});
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [showPasswordModal, setShowPasswordModal] = useState(false);
  // const [showPassword, setShowPassword] = useState(true);

  // Initialize formData with default values
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    profile_photo: "",
    phone_number: "",
    password: "",
  });
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);

    setFormData({
      ...formData,
      profile_photo: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "profile_photo" && key !== "password" && !formData[key]) {
        newError[key] = `${key} field is required`;
      }
    });
    if (Object.keys(newError).length > 0) {
      setErrorMessage(newError);
      return;
    } else {
      setErrorMessage({});
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    const fetchData = async () => {
      const register = JSON.parse(localStorage.getItem("register"));
      console.log(formData);
      try {
        const formD = new FormData();
        formD.append("email", formData.email);
        formD.append("first_name", formData.first_name);
        formD.append("last_name", formData.last_name);
        formD.append("phone_number", formData.phone_number);
        if (uploadPhoto) {
          formD.append("profile_photo", uploadPhoto);
        }
        await ApiService.putMediaData(
          `/update-user/${userData?.id}/`,
          formD,
          register?.access
        ); // Adjust API endpoint as needed
        toast.success("Profile updated successfully");
        setUploadPhoto(null);
        handleClose();
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.email) {
          setErrorMessage({
            email: error?.response?.data?.email[0]
              ? error?.response?.data?.email
              : {},
          });
          setFormData({
            ...formData,
            password: "",
          });
        }
        toast.error("Failed to update profile");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  const handleCloseModal = () => {
    setUploadPhoto(null);
    setFormData({
      email: "",
      first_name: "",
      last_name: "",
      profile_photo: "",
      phone_number: "",
      password: "",
    });
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const togglePasswordVisibility = (e) => {
  //   e.preventDefault();
  //   setShowPassword(!showPassword);
  // };

  useEffect(() => {
    setFormData({
      email: userData?.email,
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      profile_photo: userData?.profile_photo,
      phone_number: userData?.phone_number,
      password: userData?.password,
    });
  }, [userData]);

  console.log(formData, "edit profile");
  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-[998]"
          onClose={handleCloseModal}
        >
          <div className="fixed inset-0 z-[999] w-screen overflow-y-auto bg-black/50">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="w-full max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl relative">
                <DialogTitle as="h3" className="text-base/7 font-medium">
                  <div className="flex items-end justify-between cursor-pointer">
                    <h1 className="font-[600] clamp3">Update Profile</h1>
                    <div className="p-[10px] bg-background-secondary rounded-[12px] cursor-pointer">
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
                      <h1>Add Photo</h1>
                    </div>
                    <img
                      className="w-full h-full object-cover"
                      src={
                        uploadPhoto
                          ? URL.createObjectURL(uploadPhoto)
                          : userData?.profile_photo
                          ? userData?.profile_photo
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
                <form
                  className="mt-4 flex flex-col gap-3"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      value={formData?.email}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Group email type"
                      required
                    />
                    {errorMessage?.email && (
                      <p className="text-red-500">{errorMessage.email}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="first_name"
                    >
                      First Name
                    </label>
                    <input
                      value={formData?.first_name}
                      onChange={handleChange}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="First name"
                    />
                    {errorMessage?.first_name && (
                      <p className="text-red-500">{errorMessage.first_name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="last_name"
                    >
                      Last Name
                    </label>
                    <input
                      value={formData?.last_name}
                      onChange={handleChange}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Last name"
                    />
                    {errorMessage?.last_name && (
                      <p className="text-red-500">{errorMessage.last_name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="phone_number"
                    >
                      Phone Number
                    </label>
                    <input
                      value={formData?.phone_number}
                      onChange={handleChange}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      placeholder="Phone number"
                    />
                    {errorMessage?.phone_number && (
                      <p className="text-red-500">
                        {errorMessage.phone_number}
                      </p>
                    )}
                  </div>
                  {/* <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="w-full relative flex items-center">
                      <input
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                        type={showPassword ? "password" : "text"}
                        placeholder="*******"
                        id="password"
                        value={formData?.password || ""}
                        name="password"
                      />

                      {formData?.password !== "" &&
                        (showPassword ? (
                          <button
                            className="absolute right-4"
                            onClick={togglePasswordVisibility}
                          >
                            <FaRegEye />
                          </button>
                        ) : (
                          <button
                            className="absolute right-4"
                            onClick={togglePasswordVisibility}
                          >
                            <FaRegEyeSlash />
                          </button>
                        ))}
                    </div>
                    {errorMessage?.password && (
                      <p className="text-red-500">{errorMessage.password}</p>
                    )}
                  </div> */}
                  <div className="w-full flex justify-end items-center">
                    <button
                      onClick={handleUpdateProfile}
                      className="px-[20px] py-[13px] rounded-[14px] bg-button-color text-white clamp4 font-bold"
                    >
                      {loading ? (
                        <div className="flex justify-start items-center gap-2 opacity-[0.8]">
                          <SimpleLoading />
                          <h1>Loading...</h1>
                        </div>
                      ) : (
                        <h1>Update profile</h1>
                      )}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
