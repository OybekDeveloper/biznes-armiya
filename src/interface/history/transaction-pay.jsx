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
import ComboboxTransaction from "./combobox";
import { useDispatch, useSelector } from "react-redux";
import AddListboxSetting from "../settings/combobox";
import { eventSliceAction } from "../../reducer/event";

export default function TransactionPay({ isOpen, handleClose }) {
  const { userData } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const register = JSON.parse(localStorage.getItem("register"));
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [formData, setFormData] = useState({
    vab: "",
    from_user: register?.user_id,
    to_user: "",
  });

  const handleChangeData = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, to_user: value });
  };

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
      if (formData.vab <= 0) {
        toast.error("Vab must be a positive number!");
        return;
      }
      if (userData?.vab < formData?.vab) {
        toast.error(
          `You do not have enough VABs. You have ${
            userData?.vab ? userData?.vab : 0
          } VAB!`
        );
        return;
      }
      try {
        setLoading(true);
        await ApiService.postMediaData(
          "/tranzaksiya",
          formData,
          register?.access
        );
        const toUser = await ApiService.getData(
          `/users/${formData?.to_user}`,
          register?.access
        );
        if (toUser && userData) {
          console.log(toUser, "toUser");
          console.log(userData, "userData");
          const res1 = await ApiService.putData(
            `/update-user/${userData?.id}/`,
            {
              vab: userData?.vab - formData?.vab,
            },
            register?.access
          );
          const res2 = await ApiService.putData(
            `/update-user/${toUser?.id}/`,
            {
              vab: toUser?.vab ? toUser.vab : 0 + formData?.vab,
            },
            register?.access
          );

          console.log(res1, res2);
        }
        toast.success(
          `VAB sent successfully.Your VAB ${userData?.vab - formData?.vab}`
        );
        setFormData({
          vab: "",
          from_user: register?.user_id,
          to_user: "",
        });
        handleClose();
        dispatch(eventSliceAction());
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
      vab: "",
      from_user: register?.user_id,
      to_user: "",
    });
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (register) {
        try {
          const users = await ApiService.getData("/users", register?.access);
          setUsersData(users);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
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
            <div className="fixed inset-0 z-[1000] w-screen overflow-y-auto bg-transparent" />
          )}

          <div className="flex min-h-full items-center justify-center p-4">
            <Transition
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
                    <h1 className="font-[600] clamp3">VAB exchange</h1>
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
                      to whom you want to transfer VAB
                    </label>
                    <AddListboxSetting
                      data={usersData}
                      handleChange={handleChangeData}
                      status={"user"}
                    />
                    {errorMessage.to_user && (
                      <p className="text-red-500">{errorMessage.to_user}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="content"
                    >
                      VAB
                    </label>
                    <input
                      value={formData?.vab}
                      onChange={handleChange}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="number"
                      id="vab"
                      name="vab"
                      placeholder="vab type here..."
                    />
                    {errorMessage?.vab && (
                      <p className="text-red-500">{errorMessage.vab}</p>
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
                        <h1>Send</h1>
                      )}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </Transition>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
