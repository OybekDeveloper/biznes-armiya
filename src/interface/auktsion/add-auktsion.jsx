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
import { useEffect, useState } from "react";
import SimpleLoading from "../../components/loader/simple-loading";
import { Select } from "./select-items";
import { ApiService } from "../../components/api.server";
import toast from "react-hot-toast";

export default function AddAuktsion({ isOpen, handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
    kuni: "",
    vab_id: 1,
    yutganlar: "1",
    buyumlar: [],
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectOption, setSelectOption] = useState([]);

  const handleCloseModal = () => {
    handleClose();
    setFormData({ name: "", kuni: "", yutganlar: "1", buyumlar: [] });
    setSelectOption([]);
    setErrorMessage({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `This field is required`;
      }
      if (!formData["buyumlar"].length > 0) {
        newErrors[key] = `This field is required`;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrorMessage(newErrors);
      return;
    } else {
      setErrorMessage({});
    }

    setLoading(true);
    const register = JSON.parse(localStorage.getItem("register"));
    const AddAuktsion = async () => {
      try {
        await ApiService.postData("/auktsion", formData, register?.access);
        handleClose();
        toast.success("Successfully added auktsion!");
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectOption(selectedOptions);
    const filterId = selectedOptions.map((item) => item.id);
    setFormData({ ...formData, buyumlar: filterId });
  };

  useEffect(() => {
    const fetchItems = async () => {
      const register = JSON.parse(localStorage.getItem("register"));
      try {
        const res = await ApiService.getData("/buyum", register?.access);
        setItems(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

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
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="name"
                    >
                      Auktsion name
                    </label>
                    <input
                      onChange={handleChange}
                      value={formData?.name}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary bg-card"
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
                      htmlFor="kuni"
                    >
                      Start time
                    </label>
                    <input
                      value={formData?.kuni}
                      onChange={handleChange}
                      className="bg-card px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="datetime-local"
                      id="kuni"
                      name="kuni"
                      placeholder="Strength is in unity"
                    />
                    {errorMessage?.kuni && (
                      <p className="text-red-500">
                        The start time field is not filled
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="buyumlar"
                    >
                      Auktsion products
                    </label>
                    <Select
                      multiple
                      options={items}
                      value={selectOption}
                      onChange={handleSelectChange}
                    />
                    {errorMessage?.buyumlar && (
                      <p className="text-red-500">
                        The products field is not filled
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
