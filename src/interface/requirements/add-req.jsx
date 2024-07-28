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
import SimpleLoading from "../../components/loader/simple-loading";

export default function AddGroup({ isOpen, handleClose, updateItem }) {
  const register = JSON.parse(localStorage.getItem("register"));
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mavzu: "",
    content: "",
    user_id: register?.user_id || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};
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
    }

    const groupFetch = async () => {
      setLoading(true);
      try {
        if (updateItem) {
          await ApiService.putData(
            `/talablar/${updateItem.id}`,
            formData,
            register?.access
          );
          toast.success("Requirement updated successfully");
          updateItem.mavzu = formData.mavzu;
          updateItem.content = formData.content;
          handleClose();
        } else {
          await ApiService.postMediaData(
            "/talablar",
            formData,
            register?.access
          );
          toast.success("Requirement added successfully");
          setFormData({
            mavzu: "",
            content: "",
            user_id: register?.user_id || "",
          });
          handleClose();
        }
      } catch (error) {
        console.log(error);
      } finally {
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
      mavzu: "",
      content: "",
      user_id: register?.user_id || "",
    });
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (updateItem) {
      setFormData(updateItem);
    }
  }, [updateItem]);

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-[998] focus:outline-none"
        onClose={handleCloseModal}
      >
        <div className="fixed inset-0 z-[999] w-screen overflow-y-auto bg-black/50">
          {loading && (
            <div className="fixed inset-0 z-[1000] w-screen overflow-y-auto bg-transparent" />
          )}

          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl relative">
                <DialogTitle as="h3" className="text-base/7 font-medium">
                  <div className="flex items-end justify-between">
                    <h1 className="font-[600] clamp3">
                      {updateItem ? "Update Requirement" : "Add Requirement"}
                    </h1>
                    <button
                      className="p-[10px] bg-background-secondary rounded-[12px]"
                      onClick={handleCloseModal}
                    >
                      <IoClose className="text-text-primary text-[24px]" />
                    </button>
                  </div>
                </DialogTitle>
                <form
                  className="mt-4 flex flex-col gap-3"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="mavzu"
                    >
                      Topic
                    </label>
                    <input
                      onChange={handleChange}
                      value={formData.mavzu}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="text"
                      id="mavzu"
                      name="mavzu"
                      placeholder="Topic type..."
                    />
                    {errorMessage.mavzu && (
                      <p className="text-red-500">{errorMessage.mavzu}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="content"
                    >
                      Content
                    </label>
                    <input
                      value={formData.content}
                      onChange={handleChange}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="text"
                      id="content"
                      name="content"
                      placeholder="Content type here..."
                    />
                    {errorMessage.content && (
                      <p className="text-red-500">{errorMessage.content}</p>
                    )}
                  </div>
                  <div className="w-full flex justify-end items-center">
                    <button
                      type="submit"
                      className="px-[20px] py-[13px] rounded-[14px] bg-button-color text-white clamp4 font-bold"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex justify-start items-center gap-2 opacity-[0.8]">
                          <SimpleLoading />
                          <h1>Loading...</h1>
                        </div>
                      ) : (
                        <h1>
                          {updateItem ? "Save" : "Submit"}
                        </h1>
                      )}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
