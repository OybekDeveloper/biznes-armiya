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
import AddListbox from "./add-listbox";
import { close } from "../../images";
import { FaPlus } from "react-icons/fa";
import SimpleLoading from "../../components/loader/simple-loading";
import { useSelector } from "react-redux";

export default function AddUser({ groupId, isOpen, handleClose }) {
  const { groupEvent } = useSelector((state) => state.event);
  const [errorMessage, setErrorMessage] = useState();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    users: [],
  });
  const [newUsers, setNewUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};
    const register = JSON.parse(localStorage.getItem("register"));
    const groupFetch = async () => {
      setLoading(true);
      try {
        const groups = await ApiService.getData(
          `/group/${groupId}`,
          register?.access
        );
        if (groups) {
          // Extract user IDs from the existing group users and new form data users
          const groupUserIds = groups.users.map((user) => user);
          const newUserIds = formData.users.map((user) => user.user);

          // Merge the existing user IDs with the new user IDs
          const updateUsers = [...groupUserIds, ...newUserIds];
          const addUser = await ApiService.putData(
            `/group/${groupId}`,
            { users: updateUsers },
            register?.access
          );
          if (addUser?.users) {
            toast.success("Group added successfully");
            handleClose();
            setFormData({
              users: [],
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
    if (formData.users.length === 0) {
      toast.error("Please select at least one user!");
      return;
    }

    Object.keys(formData.users).forEach((key) => {
      if (!formData.users[key]) {
        newError["name"] = `Please select a another user!`;
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

  const handleCloseModal = () => {
    handleClose();
    setFormData({
      users: [],
    });
    setNewUsers([]);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setNewUsers([
      ...newUsers,
      {
        user: "",
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
        const groupData = await ApiService.getData(
          `/group/${groupId}`,
          register?.access
        );
        const allUsers = await ApiService.getData(`/users`, register?.access);

        if (allUsers.length > 0) {
          const groupUserIds = groupData.users.map((user) => user);
          const filteredUsers = allUsers.filter(
            (user) => !groupUserIds.includes(user.id)
          );
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    usersFetch();
  }, [groupId, groupEvent]); // Add `groupId` as a dependency to re-run the effect if it changes

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
                className="w-2/4 max-sm:w-11/12 max-w-11/12 rounded-xl bg-card p-6 
              "
              >
                <DialogTitle as="h3" className="text-base/7 font-medium">
                  <div className="flex items-end justify-between cursor-pointer">
                    <h1 className="font-[600] clamp3">Add User</h1>
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
                  {newUsers.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-3">
                      <div className="col-span-3">
                        <AddListbox
                          newUsers={newUsers}
                          index={idx}
                          data={users}
                          handleChange={handleChangeNewUsers}
                        />
                        {errorMessage?.name && (
                          <p className="text-red-500">
                            The solider field is not selected
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
                  {errorMessage?.select && (
                    <p className="text-red-500">The VAB field is not filled</p>
                  )}
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
                          <h1>Add Group</h1>
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
