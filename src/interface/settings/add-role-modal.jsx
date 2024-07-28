import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { ApiService } from "../../components/api.server";
import { useEffect, useState } from "react";
import SimpleLoading from "../../components/loader/simple-loading";
import toast from "react-hot-toast";

export default function AddNews({ isOpen, handleClose, updateItem }) {
  const register = JSON.parse(localStorage.getItem("register"));
  const initialRoleState = {
    role: "",
    yang_views: false,
    yang_edit: false,
    yang_delete: false,
    talab_views: false,
    talab_edit: false,
    talab_delete: false,
    sh_rivoj_views: false,
    sh_rivoj_edit: false,
    sh_rivoj_delete: false,
    price_views: false,
    price_edit: false,
    price_delete: false,
    vab_views: false,
    vab_edit: false,
    vab_delete: false,
    tasks_views: false,
    tasks_edit: false,
    tasks_delete: false,
    tasks_users_views: false,
    tasks_users_edit: false,
    tasks_users_delete: false,
    balls_views: false,
    balls_edit: false,
    balls_delete: false,
    h_balls_views: false,
    h_balls_edit: false,
    h_balls_delete: false,
    buyum_views: false,
    buyum_edit: false,
    buyum_delete: false,
    auktsion_views: false,
    auktsion_edit: false,
    auktsion_delete: false,
    chat_views: false,
    chat_edit: false,
    chat_delete: false,
    role_views: false,
    role_edit: false,
    role_delete: false,
  };
  const [role, setRole] = useState(initialRoleState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (updateItem) {
      setRole(updateItem);
    } else {
      setRole(initialRoleState);
    }
  }, [updateItem]);

  const handleCloseModal = () => {
    handleClose();
    setRole(initialRoleState);
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (updateItem) {
        await ApiService.putData(
          `/role/${updateItem.id}`,
          role,
          register.access
        );
        toast.success("Successfully updated role!");
      } else {
        await ApiService.postData("/role", role, register.access);
        toast.success("Successfully added role!");
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRole({ ...role, [name]: checked });
  };

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-[998] focus:outline-none"
        onClose={handleCloseModal}
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
              <DialogPanel className="rounded-xl bg-card p-6">
                <DialogTitle as="h3" className="text-base/7 font-medium">
                  <div className="flex items-end justify-between cursor-pointer">
                    <h1 className="font-[600] clamp3">
                      {updateItem ? "Update Role" : "Add Role"}
                    </h1>
                    <div
                      onClick={handleCloseModal}
                      className="p-[10px] bg-background-secondary rounded-[12px]"
                    >
                      <IoClose className="border-border text-[24px]" />
                    </div>
                  </div>
                </DialogTitle>
                <form
                  className="mt-4 flex flex-col gap-3 h-full"
                  onSubmit={handleAddNews}
                >
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="title"
                    >
                      Role name
                    </label>
                    <input
                      className="px-[18px] py-[12px] bg-background-secondary w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      type="text"
                      id="title"
                      name="title"
                      value={role.role}
                      placeholder="Type role name"
                      onChange={(e) =>
                        setRole({ ...role, role: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.keys(initialRoleState).map(
                      (key) =>
                        key !== "role" && (
                          <div key={key} className="flex items-center">
                            <input
                              type="checkbox"
                              id={key}
                              name={key}
                              checked={role[key]}
                              onChange={handleCheckboxChange}
                            />
                            <label className="ml-2" htmlFor={key}>
                              {key.replace(/_/g, " ")}
                            </label>
                          </div>
                        )
                    )}
                  </div>
                  <div className="relative w-full flex justify-end items-center">
                    <button
                      type="submit"
                      className="bottom-[16px] right-[16px] bg-button-color flex justify-start items-center gap-2 rounded-md px-4 py-2 text-white shadow-btn_shadow"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex justify-start items-center gap-2 opacity-[0.8]">
                          <SimpleLoading />
                          <h1>Loading...</h1>
                        </div>
                      ) : (
                        <h1>{updateItem ? "Update Role" : "Add Role"}</h1>
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
