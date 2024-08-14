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
import { ApiService } from "../../components/api.server";
import toast from "react-hot-toast";
import { close } from "../../images";
import { FaPlus } from "react-icons/fa";
import AddListbox from "../tasks/add-listbox";
import AddListboxSetting from "../settings/combobox";
import SimpleLoading from "../../components/loader/simple-loading";

export default function AddTasks({ isOpen, handleClose, roles }) {
  const [errorMessage, setErrorMessage] = useState();
  const [status, setStatus] = useState([
    { id: 1, name: "Asked" },
    { id: 2, name: "Expected" },
  ]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    vab: "",
    definition: "",
    status: "",
    users: "",
    role_id: "",
  });
  const [newUsers, setNewUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};
    const register = JSON.parse(localStorage.getItem("register"));

    const groupFetch = async () => {
      setLoading(true);
      try {
        const { role_id, ...rest } = formData;
        const res = await ApiService.postData(
          "/tasksreq",
          rest,
          register?.access
        );
        if (res.id) {
          const req = await ApiService.postData(
            "/talablar",
            {
              task_id: res.id,
              role_id: role_id,
            },
            register?.access
          );
          if (req) {
            toast.success("Group added successfully");
            handleClose();
            setFormData({
              name: "",
              vab: "",
              definition: "",
              status: "",
              users: "",
            });
            setNewUsers([]);
          }
        }
      } catch (error) {
        console.log(error);
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
      setErrorMessage(null);
      groupFetch();
    }
  };

  const handleChangeData = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, role_id: value });
  };

  const handleCloseModal = () => {
    handleClose();
    setFormData({
      name: "",
      vab: "",
      definition: "",
      status: "",
      users: "",
      role_id: "",
    });
    setNewUsers([]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setNewUsers([
      ...newUsers,
      {
        user: "",
        vab: 0,
      },
    ]);
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = newUsers.filter((_, i) => i !== index);
    setNewUsers(updatedUsers);
  };

  const handleChangeNewUsers = (e, index) => {
    const { name, value } = e.target;

    const updateUser = [...newUsers];
    updateUser[index] = {
      ...updateUser[index],
      [name]: value,
    };
    setNewUsers(updateUser);
  };

  useEffect(() => {
    const register = JSON.parse(localStorage.getItem("register"));
    const usersFetch = async () => {
      try {
        const res = await ApiService.getData(`/users`, register?.access);
        if (res.length > 0) {
          setUsers(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    usersFetch();
  }, []);

  useEffect(() => {
    setFormData({ ...formData, users: newUsers });
  }, [newUsers]);

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
              <DialogPanel
                className="max-w-11/12 rounded-xl bg-card p-6 
              "
              >
                <DialogTitle as="h3" className="text-base/7 font-medium">
                  <div className="flex items-end justify-between cursor-pointer">
                    <h1 className="font-[600] clamp3">Add Task</h1>
                    <div
                      onClick={handleCloseModal}
                      className="p-[10px] bg-background-secondary rounded-[12px]"
                    >
                      <IoClose
                        className="border-border text-[24px]"
                        src={close}
                        alt="close"
                      />
                    </div>
                  </div>
                </DialogTitle>
                <form className="mt-4 flex flex-col gap-3">
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      onChange={handleChange}
                      value={formData?.name}
                      className="border-border px-[18px] py-[12px] w-full border-[1.5px] border-solid bg-card rounded-[14px] outline-none focus:border-primary"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Task name"
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
                      htmlFor="name"
                    >
                      VAB
                    </label>
                    <input
                      onChange={handleChange}
                      value={formData?.vab}
                      className="border-border px-[18px] py-[12px] w-full border-[1.5px] border-solid bg-card rounded-[14px] outline-none focus:border-primary"
                      type="number"
                      id="vab"
                      name="vab"
                      placeholder="Enter vab value"
                    />
                    {errorMessage?.vab && (
                      <p className="text-red-500">
                        The vab field is not filled
                      </p>
                    )}
                  </div>
                  {/* <div className="w-full flex justify-between items-center gap-4 max-sm:flex-col">
                    <div className="w-full">
                      <label
                        className="text-[14px] font-[700] text-thin"
                        htmlFor="start_time"
                      >
                        Starts
                      </label>
                      <input
                        value={formData?.start_time}
                        onChange={handleChange}
                        className="border-border px-[18px] py-[12px] w-full border-[1.5px] border-solid bg-card rounded-[14px] outline-none focus:border-primary"
                        type="datetime-local"
                        id="start_time"
                        name="start_time"
                        placeholder="Start time is in unity"
                      />
                      {errorMessage?.start_time && (
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
                        value={formData?.stop_time}
                        onChange={handleChange}
                        className="border-border px-[18px] py-[12px] w-full border-[1.5px] border-solid bg-card rounded-[14px] outline-none focus:border-primary"
                        type="datetime-local"
                        id="stop_time"
                        name="stop_time"
                        placeholder="Stop time is in unity"
                      />
                      {errorMessage?.stop_time && (
                        <p className="text-red-500">
                          The dead line field is not filled
                        </p>
                      )}
                    </div>
                  </div> */}
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="name"
                    >
                      Task status
                    </label>
                    <AddListbox
                      index={null}
                      data={status}
                      handleChange={handleChange}
                    />
                    {errorMessage?.status && (
                      <p className="text-red-500">
                        The status field is not selected
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-[14px] font-[700] text-thin"
                      htmlFor="definition"
                    >
                      Definition
                    </label>
                    <textarea
                      value={formData?.definition}
                      onChange={handleChange}
                      className="border-border min-h-[130px] px-[18px] py-[12px] w-full border-[1.5px] border-solid bg-card rounded-[14px] outline-none focus:border-primary"
                      type="datetime-local"
                      id="definition"
                      name="definition"
                      placeholder="Strength is in unity"
                    />
                    {errorMessage?.definition && (
                      <p className="text-red-500">
                        The definition field is not filled
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col gap-3 col-span-2">
                    <h1>Selected role</h1>
                    <AddListboxSetting
                      data={roles}
                      handleChange={handleChangeData}
                      status="role"
                    />
                    {errorMessage?.role_id && (
                      <p className="text-red-500">{errorMessage?.role_id}</p>
                    )}
                  </div>
                  {newUsers.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label
                          className="text-[14px] font-[700] text-thin"
                          htmlFor="role_id"
                        >
                          Add a soldier
                        </label>
                        <AddListbox
                          newUsers={newUsers}
                          index={idx}
                          data={users}
                          handleChange={handleChangeNewUsers}
                        />
                        {errorMessage?.role_id && (
                          <p className="text-red-500">
                            The solider field is not selected
                          </p>
                        )}
                      </div>
                      <div className="col-span-1">
                        <label
                          className="text-[14px] font-[700] text-thin"
                          htmlFor="vab"
                        >
                          VAB
                        </label>
                        <input
                          value={item?.vab}
                          onChange={(e) => handleChangeNewUsers(e, idx)}
                          className="border-border px-[18px] py-[12px] w-full border-[1.5px] border-solid bg-card rounded-[14px] outline-none focus:border-primary"
                          type="number"
                          id="vab"
                          name="vab"
                          placeholder="Strength is in unity"
                        />
                        {errorMessage?.ball && (
                          <p className="text-red-500">
                            The VAB field is not filled
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteUser(idx)}
                        className="col-span-3 flex justify-end items-center gap-2 text-red-500"
                      >
                        <FaPlus />
                        <h1>Delete Tab</h1>
                      </button>
                    </div>
                  ))}
                  <div className="flex justify-end items-center gap-3">
                    <button
                      onClick={handleAddUser}
                      className="w-full flex justify-start items-center gap-2 text-primary"
                    >
                      <FaPlus />
                      <h1>Add new user</h1>
                    </button>
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
                        <h1>Add Req</h1>
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
